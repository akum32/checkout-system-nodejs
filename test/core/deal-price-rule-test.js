const CheckoutItem = require('../../src/core/checkout-item');
const PricingContext = require('../../src/core/pricing-context');
const DealPriceRule = require('../../src/core/deal-price-rule');

describe('deal price rule', () => {

  it('gives 1 product free if deal is 3 for 2 and product qty is 3', async () => {
    const adjustments = await applyRule({
      productId: 'B',
      requiredQty: 3,
      freeQty: 1,
      
      pricingContext: new PricingContext({
        'A': new CheckoutItem({product: {id: 'A', price: 100}, qty: 2}),
        'B': new CheckoutItem({product: {id: 'B', price: 250}, qty: 3})
      })
    });
    expect(adjustments).to.eql([{productId: 'B', amount: -250}]);
  });

  it('gives 1 product free if deal is 3 for 2 and product qty is 4', async () => {
    const adjustments = await applyRule({
      productId: 'B',
      requiredQty: 3,
      freeQty: 1,
      
      pricingContext: new PricingContext({
        'A': new CheckoutItem({product: {id: 'A', price: 100}, qty: 2}),
        'B': new CheckoutItem({product: {id: 'B', price: 250}, qty: 4})
      })
    });
    expect(adjustments).to.eql([{productId: 'B', amount: -250}]);
  });


  it('gives 2 products free if deal is 3 for 2 and product qty is 6', async () => {
    const adjustments = await applyRule({
      productId: 'B',
      requiredQty: 3,
      freeQty: 1,
      
      pricingContext: new PricingContext({
        'A': new CheckoutItem({product: {id: 'A', price: 100}, qty: 2}),
        'B': new CheckoutItem({product: {id: 'B', price: 250}, qty: 6})
      })
    });
    expect(adjustments).to.eql([{productId: 'B', amount: -500}]);
  });

  it('gives 0 products free if deal is 3 for 2 and product qty is 2', async () => {
    const adjustments = await applyRule({
      productId: 'B',
      requiredQty: 3,
      freeQty: 1,
      
      pricingContext: new PricingContext({
        'A': new CheckoutItem({product: {id: 'A', price: 100}, qty: 2}),
        'B': new CheckoutItem({product: {id: 'B', price: 250}, qty: 2})
      })
    });
    expect(adjustments).to.eql([]);
  });

  it('gives 0 products free if required product not found', async () => {
    const adjustments = await applyRule({
      productId: 'B',
      requiredQty: 3,
      freeQty: 1,
      
      pricingContext: new PricingContext({
        'A': new CheckoutItem({product: {id: 'A', price: 100}, qty: 2}),
      })
    });
    expect(adjustments).to.eql([]);
  });

  async function applyRule({productId, requiredQty, freeQty, pricingContext}) {
    const rule = new DealPriceRule({productId, requiredQty, freeQty});
    await rule.apply(pricingContext);
    return pricingContext.adjustments;
  }

});
