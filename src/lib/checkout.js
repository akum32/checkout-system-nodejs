const CheckoutItem = require('./checkout-item');
const PricingContext = require('./pricing-context');

class Checkout {

  constructor(productStore, priceRules) {
    this._productStore = productStore;
    this._priceRules = priceRules || [];
    this._items = {};
  }

  async add(productId) {
    const existingItem = this._items[productId];
    existingItem ? existingItem.addQty() : await this._addNewItem(productId);
  }

  async total() {
    return this._calculatePricing().totalPrice;
  }

  _calculatePricing() {
    const pricingContext = new PricingContext(this._items);
    this._priceRules.forEach(rule => rule.apply(pricingContext))
    return {totalPrice: pricingContext.totalPrice()};
  }

  async _addNewItem(productId) {
    const product = await this._productStore.fetchById(productId);
    this._items[productId] = new CheckoutItem(product);
    return this._items[productId];
  }
}

module.exports = Checkout;
