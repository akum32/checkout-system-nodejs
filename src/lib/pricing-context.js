const utils = require('./utils');

class PricingContext {

  constructor(checkoutItems) {
    this._checkoutItems = checkoutItems;
    this._adjustments = [];
  }

  get checkoutItems() {
    return this._checkoutItems;
  }

  addProductAdjustment(productId, amount) {
    this._adjustments.push({productId, amount});
  }

  totalPrice() {
    return this._totalOriginalPrice() + this._totalAdjustments();
  }

  _totalAdjustments() {
    return utils.sum(
      this._adjustments.map(adjustment => adjustment.amount)
    );
  }

  _totalOriginalPrice() {
    return utils.sum(
      Object.values(this.checkoutItems).map(item => item.total())
    );
  }
}

module.exports = PricingContext;
