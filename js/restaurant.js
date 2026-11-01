import { RESTAURANT_MENU, TEA_STOCK_START, CUSTOMER_NAMES } from "./data/menu.js";
import { readProgress, writeProgress } from "./core/storage.js";

export class RestaurantManager {
  constructor(onChange = () => {}) {
    this.onChange = onChange;
    this.progress = readProgress();
    this.order = null;
    this.served = 0;
    this.shiftTarget = 5;
    this.message = "Bem-vindo ao Nexus Sushi Bar.";
    this.closed = true;
  }

  beginShift(caughtFish = []) {
    caughtFish.forEach(fish => {
      const id = fish.id;
      this.progress.fishStock[id] = (this.progress.fishStock[id] || 0) + 1;
    });
    if (!Object.values(this.progress.teaStock).some(Boolean)) {
      this.progress.teaStock = { ...TEA_STOCK_START };
    }
    this.served = 0;
    this.closed = false;
    this.nextOrder();
    this.save();
    this.emit();
  }

  availableItems() {
    return RESTAURANT_MENU.filter(item => item.category === "tea"
      ? (this.progress.teaStock[item.teaId] || 0) > 0
      : (this.progress.fishStock[item.fishId] || 0) > 0);
  }

  nextOrder() {
    const available = this.availableItems();
    if (!available.length) {
      this.order = null;
      this.closed = true;
      this.message = "Estoque esgotado. A próxima expedição trará novos ingredientes.";
      this.emit();
      return;
    }
    const item = available[Math.floor(Math.random() * available.length)];
    const customer = CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)];
    this.order = { itemId: item.id, customer, itemName: item.name };
    this.message = `${customer} chegou ao balcão. Um pedido, por favor!`;
    this.emit();
  }

  serve(itemId) {
    if (this.closed || !this.order) return false;
    const item = RESTAURANT_MENU.find(entry => entry.id === itemId);
    if (!item) return false;
    if (item.id !== this.order.itemId) {
      this.message = "Esse não é o pedido do cliente. Confira o balcão!";
      this.emit();
      return false;
    }
    const stock = item.category === "tea" ? this.progress.teaStock : this.progress.fishStock;
    const stockKey = item.category === "tea" ? item.teaId : item.fishId;
    if (!(stock[stockKey] > 0)) {
      this.message = "Ingrediente em falta. Faça uma nova expedição.";
      this.emit();
      return false;
    }
    stock[stockKey] -= 1;
    this.progress.coins += item.price;
    this.progress.reputation += 1;
    this.served += 1;
    this.message = `Pedido servido! +${item.price} moedas · ${item.name}`;
    this.save();
    if (this.served >= this.shiftTarget) {
      this.closed = true;
      this.order = null;
      this.message = "Turno encerrado. O Nexus agradece sua presença.";
    } else {
      this.nextOrder();
    }
    this.emit();
    return true;
  }

  save() {
    this.progress = writeProgress(this.progress);
  }

  getState() {
    return {
      coins: this.progress.coins,
      reputation: this.progress.reputation,
      day: this.progress.day,
      fishStock: { ...this.progress.fishStock },
      teaStock: { ...this.progress.teaStock },
      order: this.order ? { ...this.order } : null,
      served: this.served,
      shiftTarget: this.shiftTarget,
      message: this.message,
      closed: this.closed,
      menu: RESTAURANT_MENU
    };
  }

  emit() {
    this.onChange(this.getState());
  }
}
