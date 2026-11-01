import { RESTAURANT_MENU, CUSTOMER_PROFILES } from "./data/menu.js";
import { readProgress, writeProgress } from "./core/storage.js";

export class RestaurantManager {
  constructor(onChange = () => {}) {
    this.onChange = onChange;
    this.progress = readProgress();
    this.order = null;
    this.served = 0;
    this.shiftTarget = 5 + (this.progress.barLevel - 1) * 2;
    this.message = "Bem-vindo ao Nexus Sushi Bar.";
    this.closed = true;
    this.queue = [];
    this.preparation = null;
    this.clock = 0;
    this.customerSerial = 0;
    this.patienceMax = 1;
  }

  beginShift(caughtFish = []) {
    this.progress = readProgress();
    this.shiftTarget = 5 + (this.progress.barLevel - 1) * 2;
    caughtFish.forEach(fish => {
      const id = fish.id;
      this.progress.fishStock[id] = (this.progress.fishStock[id] || 0) + 1;
    });
    this.served = 0;
    this.closed = false;
    this.queue = [];
    this.preparation = null;
    for (let i = 0; i < Math.min(3, this.shiftTarget); i++) this.queue.push(this.createCustomer());
    this.nextOrder();
    this.save();
    this.emit();
  }

  createCustomer() {
    const profile = CUSTOMER_PROFILES[Math.floor(Math.random() * CUSTOMER_PROFILES.length)];
    this.customerSerial += 1;
    return { name: profile.name, favorites: [...profile.favorites], patience: profile.patience + Math.max(0, this.progress.barLevel - 1) * 3 };
  }

  availableItems() {
    return RESTAURANT_MENU.filter(item => item.category === "tea"
      ? (this.progress.teaStock[item.teaId] || 0) > 0
      : (this.progress.fishStock[item.fishId] || 0) > 0);
  }

  nextOrder() {
    if (this.served >= this.shiftTarget) {
      this.order = null; this.closed = true; this.preparation = null;
      this.message = "Turno encerrado. O Nexus agradece sua presença."; this.emit(); return;
    }
    if (!this.queue.length) this.queue.push(this.createCustomer());
    const customer = this.queue.shift();
    this.queue.push(this.createCustomer());
    const available = this.availableItems();
    if (!available.length) {
      this.order = null; this.closed = true; this.message = "Estoque esgotado. A próxima expedição trará novos ingredientes."; this.emit(); return;
    }
    const preferred = available.filter(item => customer.favorites.includes(item.id));
    const pool = preferred.length ? preferred : available;
    const item = pool[Math.floor(Math.random() * pool.length)];
    this.order = { itemId: item.id, customer: customer.name, itemName: item.name, favorites: customer.favorites };
    this.patienceMax = customer.patience;
    this.patience = customer.patience;
    this.message = `${customer.name} chegou ao balcão. Preferências: ${customer.favorites.map(id => RESTAURANT_MENU.find(item => item.id === id)?.name).filter(Boolean).join(" ou ")}.`;
    this.emit();
  }

  prepare(itemId) {
    if (this.closed || !this.order || this.preparation) return false;
    const item = RESTAURANT_MENU.find(entry => entry.id === itemId);
    if (!item) return false;
    if (item.id !== this.order.itemId) {
      this.message = "Esse preparo não corresponde ao pedido. Confira as preferências do cliente.";
      this.emit(); return false;
    }
    const stock = item.category === "tea" ? this.progress.teaStock : this.progress.fishStock;
    const stockKey = item.category === "tea" ? item.teaId : item.fishId;
    if (!(stock[stockKey] > 0)) {
      this.message = "Ingrediente em falta. Faça uma nova expedição."; this.emit(); return false;
    }
    this.preparation = { itemId, itemName: item.name, remaining: item.prepSeconds || 3, duration: item.prepSeconds || 3 };
    this.message = `Preparando ${item.name} com atenção...`;
    this.emit(); return true;
  }

  tick(dt = 0) {
    if (this.closed || !this.order || dt <= 0) return;
    this.clock += dt;
    this.patience = Math.max(0, this.patience - dt);
    if (this.preparation) {
      this.preparation.remaining = Math.max(0, this.preparation.remaining - dt);
      if (this.preparation.remaining <= 0) {
        const itemId = this.preparation.itemId;
        this.preparation = null;
        this.completeService(itemId);
        return;
      }
    }
    if (this.patience <= 0) {
      const departed = this.order.customer;
      this.progress.reputation = Math.max(0, this.progress.reputation - 1);
      this.message = `${departed} perdeu a paciência e foi embora. Reputação -1.`;
      this.preparation = null;
      this.save();
      this.nextOrder();
      return;
    }
    if (this.clock >= 1) { this.clock = 0; this.emit(); }
  }

  completeService(itemId) {
    if (this.closed || !this.order) return false;
    const item = RESTAURANT_MENU.find(entry => entry.id === itemId);
    if (!item || item.id !== this.order.itemId) return false;
    const stock = item.category === "tea" ? this.progress.teaStock : this.progress.fishStock;
    const stockKey = item.category === "tea" ? item.teaId : item.fishId;
    if (!(stock[stockKey] > 0)) { this.message = "Ingrediente em falta."; this.emit(); return false; }
    stock[stockKey] -= 1;
    const patienceRatio = this.patience / this.patienceMax;
    const tip = patienceRatio > .65 ? 3 : patienceRatio > .3 ? 1 : 0;
    this.progress.coins += item.price + tip;
    this.progress.reputation += 1;
    this.served += 1;
    this.progress.customersServed += 1;
    this.message = `Pedido servido! +${item.price} moedas${tip ? ` + ${tip} gorjeta` : ""} · ${item.name}`;
    this.save();
    this.nextOrder();
    return true;
  }

  serve(itemId) {
    if (this.closed || !this.order) return false;
    if (itemId !== this.order.itemId) {
      this.message = "Esse não é o pedido do cliente. Confira o balcão!";
      this.emit(); return false;
    }
    return this.completeService(itemId);
  }

  barUpgradeCost() { return 100 * this.progress.barLevel; }
  gearUpgradeCost() { return 80 * this.progress.equipmentLevel; }

  upgradeBar() {
    const cost = this.barUpgradeCost();
    if (this.progress.barLevel >= 5 || this.progress.coins < cost) return false;
    this.progress.coins -= cost; this.progress.barLevel += 1;
    this.shiftTarget = 5 + (this.progress.barLevel - 1) * 2;
    this.message = `O bar subiu para o nível ${this.progress.barLevel}! Mais clientes chegarão à casa.`;
    this.save(); this.emit(); return true;
  }

  upgradeGear() {
    const cost = this.gearUpgradeCost();
    if (this.progress.equipmentLevel >= 5 || this.progress.coins < cost) return false;
    this.progress.coins -= cost; this.progress.equipmentLevel += 1;
    this.message = `Equipamento de pesca nível ${this.progress.equipmentLevel}! Mais autonomia e capacidade.`;
    this.save(); this.emit(); return true;
  }

  restockTea() {
    const cost = 30;
    if (this.progress.coins < cost) { this.message = `São necessárias ${cost} moedas para reabastecer os chás.`; this.emit(); return false; }
    this.progress.coins -= cost;
    this.progress.teaStock.matcha = (this.progress.teaStock.matcha || 0) + 3;
    this.progress.teaStock.hojicha = (this.progress.teaStock.hojicha || 0) + 3;
    this.progress.teaStock.lotus = (this.progress.teaStock.lotus || 0) + 2;
    this.message = "Chás reabastecidos. A casa está pronta para receber.";
    this.save();
    if (this.closed && this.served < this.shiftTarget && !this.order) {
      this.closed = false; this.served = 0; this.queue = [this.createCustomer(), this.createCustomer(), this.createCustomer()]; this.nextOrder();
    }
    this.emit(); return true;
  }

  save() { this.progress = writeProgress(this.progress); }

  getState() {
    return {
      coins: this.progress.coins, canRestockTea: this.progress.coins >= 30,
      canUpgradeBar: this.progress.barLevel < 5 && this.progress.coins >= this.barUpgradeCost(),
      canUpgradeGear: this.progress.equipmentLevel < 5 && this.progress.coins >= this.gearUpgradeCost(),
      barUpgradeCost: this.barUpgradeCost(), gearUpgradeCost: this.gearUpgradeCost(),
      barLevel: this.progress.barLevel, equipmentLevel: this.progress.equipmentLevel,
      reputation: this.progress.reputation, day: this.progress.day,
      fishStock: { ...this.progress.fishStock }, teaStock: { ...this.progress.teaStock },
      order: this.order ? { ...this.order } : null, served: this.served,
      shiftTarget: this.shiftTarget, message: this.message, closed: this.closed,
      menu: RESTAURANT_MENU, queue: this.queue.map(customer => customer.name),
      patience: this.patience || 0, patienceMax: this.patienceMax || 1,
      preparation: this.preparation ? { ...this.preparation } : null
    };
  }

  emit() { this.onChange(this.getState()); }
}
