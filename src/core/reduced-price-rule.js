class ReducedPriceRule {

  constructor({productId, reducedPrice, requiredQty = 1}) {
    this._productId = productId;
    this._reducedPrice = reducedPrice;
    this._requiredQty = requiredQty;
  }

  async apply(pricingContext) {
    const targetItem = pricingContext.checkoutItems[this._productId];
    const qualifies = (targetItem && targetItem.qty >= this._requiredQty);

    if (qualifies) {
      const adjustAmount = this._calculateAdjustment(targetItem);
      pricingContext.addProductAdjustment(this._productId, adjustAmount);
    }
  }

  _calculateAdjustment(targetItem) {
    const totalReducedPrice = (targetItem.qty * this._reducedPrice);
    return totalReducedPrice - targetItem.total();
  }
}

module.exports = ReducedPriceRule;
