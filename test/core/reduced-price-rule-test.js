const CheckoutItem = require('../../src/core/checkout-item');
const PricingContext = require('../../src/core/pricing-context');
const ReducedPriceRule = require('../../src/core/reduced-price-rule');

describe('reduced price rule', () => {

  it('reduces price if the product qty is equal to the required qty', async () => {
    const adjustments = await applyRule({
      productId: 'B',
      reducedPrice: 200,
      requiredQty: 3,
      
      pricingContext: new PricingContext({
        'A': new CheckoutItem({product: {id: 'A', price: 100}, qty: 2}),
        'B': new CheckoutItem({product: {id: 'B', price: 250}, qty: 3})
      })
    });
    expect(adjustments).to.eql([{productId: 'B', amount: -150}]);
  });

  it('reduces price if the product qty is more than the required qty', async () => {
    const adjustments = await applyRule({
      productId: 'B',
      reducedPrice: 200,
      requiredQty: 3,
      
      pricingContext: new PricingContext({
        'A': new CheckoutItem({product: {id: 'A', price: 100}, qty: 2}),
        'B': new CheckoutItem({product: {id: 'B', price: 250}, qty: 4})
      })
    });
    expect(adjustments).to.eql([{productId: 'B', amount: -200}]);
  });

  it('does not reduce price if the product qty is less than the required qty', async () => {
    const adjustments = await applyRule({
      productId: 'B',
      reducedPrice: 200,
      requiredQty: 3,
      
      pricingContext: new PricingContext({
        'A': new CheckoutItem({product: {id: 'A', price: 100}, qty: 2}),
        'B': new CheckoutItem({product: {id: 'B', price: 250}, qty: 2})
      })
    });
    expect(adjustments).to.eql([]);
  });

  it('does not reduce price if the required product not found', async () => {
    const adjustments = await applyRule({
      productId: 'B',
      reducedPrice: 200,
      requiredQty: 1,
      
      pricingContext: new PricingContext({
        'A': new CheckoutItem({product: {id: 'A', price: 100}, qty: 2})
      })
    });
    expect(adjustments).to.eql([]);
  });

  async function applyRule({productId, reducedPrice, requiredQty, pricingContext}) {
    const rule = new ReducedPriceRule({productId, reducedPrice, requiredQty});
    await rule.apply(pricingContext);
    return pricingContext.adjustments;
  }

});
