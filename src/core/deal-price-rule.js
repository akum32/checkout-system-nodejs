class DealPriceRule {

  constructor(productId, requiredQty, freeQty) {
    this._productId = productId;
    this._requiredQty = requiredQty;
    this._freeQty = freeQty;
  }

  async apply(pricingContext) {
    const targetItem = pricingContext.checkoutItems[this._productId];
    const qualifies = (targetItem && targetItem.qty >= this._requiredQty); 

    if (qualifies) {
      const adjustAmount = -(this._calculateTotalFreebies(targetItem));
      pricingContext.addProductAdjustment(this._productId, adjustAmount);
    }
  }

  _calculateTotalFreebies(targetItem) {
    const freebieCount = Math.floor(targetItem.qty / this._requiredQty) * this._freeQty;
    return freebieCount * targetItem.price;
  }
}

module.exports = DealPriceRule;
