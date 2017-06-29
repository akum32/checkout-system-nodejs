const Checkout = require('./core/checkout');
const ProductsStore = require('./products-store');
const PriceRulesStore = require('./price-rules-store');

class CheckoutSystem {

  constructor() {
    this._productsStore = new ProductsStore();
    this._priceRulesStore = new PriceRulesStore();
  }

  async createCheckout(customerId) {
    const productsStore = this._productsStore;
    const priceRules = await this._fetchPriceRules(customerId);
    return new Checkout({productsStore, priceRules});
  }

  async _fetchPriceRules(customerId) {
    return await this._priceRulesStore.fetchByCustomerId(customerId);
  }
}

module.exports = CheckoutSystem;
