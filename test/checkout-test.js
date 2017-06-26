const Checkout = require('../src/lib/checkout');

describe('Checkout', () => {

  it('calculates total as 0 when no products added', () => {
    const checkout = new Checkout();
    expect(checkout.total()).to.equal(0);
  });

});