const Checkout = require('../src/lib/checkout');

describe('Checkout', () => {

  it('calculates total as 0 when no products added', () => {
    const checkout = new Checkout();
    expect(checkout.total()).to.equal(0);
  });

  it('calculates total as the sum of products when no price rules given', async function() {
    const productStore = { fetchById: sinon.stub() };
    productStore.fetchById.withArgs('A').returns(Promise.resolve({id: 'A', price: 100}));
    productStore.fetchById.withArgs('B').returns(Promise.resolve({id: 'B', price: 200}));
    productStore.fetchById.withArgs('C').returns(Promise.resolve({id: 'C', price: 300}));

    const checkout = new Checkout(productStore);
    await checkout.add('A');
    await checkout.add('C');
    await checkout.add('A');
    
    expect(checkout.total()).to.equal(500);
  });


});