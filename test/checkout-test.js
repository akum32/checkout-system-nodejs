const Checkout = require('../src/lib/checkout');

describe('Checkout', () => {

  it('calculates total as 0 when no products added', async () => {
    const checkout = new Checkout();
    const total = await checkout.total();
    expect(total).to.equal(0);
  });

  it('calculates total when no price rules given', async () => {
    const productStore = { fetchById: sinon.stub() };
    productStore.fetchById.withArgs('A').returns(Promise.resolve({id: 'A', price: 100}));
    productStore.fetchById.withArgs('B').returns(Promise.resolve({id: 'B', price: 200}));
    productStore.fetchById.withArgs('C').returns(Promise.resolve({id: 'C', price: 300}));

    const checkout = new Checkout(productStore);
    await checkout.add('A');
    await checkout.add('C');
    await checkout.add('A');
    const total = await checkout.total();
    
    expect(total).to.equal(500);
  });

  it('calculates total by applying price rules', async () => {
    const productStore = { fetchById: sinon.stub() };
    productStore.fetchById.withArgs('A').returns(Promise.resolve({id: 'A', price: 100}));
    productStore.fetchById.withArgs('B').returns(Promise.resolve({id: 'B', price: 200}));
    productStore.fetchById.withArgs('C').returns(Promise.resolve({id: 'C', price: 300}));

    const priceRules = [
      createFixedPriceRule('A', 50),
      createFixedPriceRule('C', 100)
    ]
    const checkout = new Checkout(productStore, priceRules);
    await checkout.add('A');
    await checkout.add('C');
    await checkout.add('A');
    const total = await checkout.total();

    expect(total).to.equal(200);
  });

  function createFixedPriceRule(productId, price) {
    return {
      apply: (pricingContext) => {
        const item = pricingContext.checkoutItems[productId];
        if (!item) return;
        const adjustAmount = (item.qty * price) - item.total();
        pricingContext.addProductAdjustment(productId, adjustAmount)
      }
    }
  }

});
