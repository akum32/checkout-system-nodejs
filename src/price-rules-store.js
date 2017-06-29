const ReducedPriceRule = require('./core/reduced-price-rule');
const DealPriceRule = require('./core/deal-price-rule');

class PriceRulesStore {

  async fetchByCustomerId(customerId) {
    return this._getRules()[customerId] || [];
  }

  _getRules() {
    return {
      'UNILEVER': [
        new DealPriceRule({productId: 'classic', requiredQty: 3, freeQty: 1})
      ],
      'APPLE': [
        new ReducedPriceRule({productId: 'standout', reducedPrice: 29999})
      ],
      'NIKE': [
        new ReducedPriceRule({productId: 'premium', reducedPrice: 37999, requiredQty: 4})
      ],
      'FORD': [
        new DealPriceRule({productId: 'classic', requiredQty: 5, freeQty: 1}),
        new ReducedPriceRule({productId: 'standout', reducedPrice: 30999}),
        new ReducedPriceRule({productId: 'premium', reducedPrice: 38999, requiredQty: 3})
      ]
    }
  }
}

module.exports = PriceRulesStore;
