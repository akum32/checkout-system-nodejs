const CheckoutItem = require('./checkout-item');
const PricingContext = require('./pricing-context');

class Checkout {

  constructor({productsStore, priceRules}) {
    this._productsStore = productsStore;
    this._priceRules = priceRules || [];
    this._items = {};
  }

  async add(productId) {
    const existingItem = this._items[productId];
    existingItem ? existingItem.addQty() : await this._addNewItem(productId);
  }

  async total() {
    const pricing = await this._calculatePricing();
    return pricing.totalPrice;
  }

  async _calculatePricing() {
    const pricingContext = new PricingContext(this._items);
    for (const rule of this._priceRules) await rule.apply(pricingContext);
    return {totalPrice: pricingContext.totalPrice()};
  }

  async _addNewItem(productId) {
    const product = await this._productsStore.fetchById(productId);
    
    this._items[productId] = new CheckoutItem({product});
    return this._items[productId];
  }
}

module.exports = Checkout;
