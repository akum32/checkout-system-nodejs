const Checkout = require('../../src/core/checkout');

describe('checkout', () => {

  it('calculates total as 0 when no products added', async () => {
    const checkout = new Checkout({});
    const total = await checkout.total();
    expect(total).to.equal(0);
  });

  it('calculates total when no price rules given', async () => {
    const productsStore = { fetchById: sinon.stub() };
    productsStore.fetchById.withArgs('A').returns(Promise.resolve({id: 'A', price: 100}));
    productsStore.fetchById.withArgs('B').returns(Promise.resolve({id: 'B', price: 200}));
    productsStore.fetchById.withArgs('C').returns(Promise.resolve({id: 'C', price: 300}));

    const checkout = new Checkout({productsStore});
    await checkout.add('A');
    await checkout.add('C');
    await checkout.add('A');
    const total = await checkout.total();
    
    expect(total).to.equal(500);
  });

  it('calculates total by applying price rules', async () => {
    const productsStore = { fetchById: sinon.stub() };
    productsStore.fetchById.withArgs('A').returns(Promise.resolve({id: 'A', price: 100}));
    productsStore.fetchById.withArgs('B').returns(Promise.resolve({id: 'B', price: 200}));
    productsStore.fetchById.withArgs('C').returns(Promise.resolve({id: 'C', price: 300}));

    const priceRules = [
      createFixedPriceRule('A', 50),
      createFixedPriceRule('C', 100)
    ]
    const checkout = new Checkout({productsStore, priceRules});
    await checkout.add('A');
    await checkout.add('C');
    await checkout.add('A');
    const total = await checkout.total();

    expect(total).to.equal(200);
  });

  function createFixedPriceRule(productId, price) {
    return {
      apply: async (pricingContext) => {
        const item = pricingContext.checkoutItems[productId];
        if (!item) return;
        const adjustAmount = (item.qty * price) - item.total();
        pricingContext.addProductAdjustment(productId, adjustAmount)
      }
    }
  }

});
