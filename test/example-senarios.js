const CheckoutSystem = require('../src/checkout-system');

describe('example scenarios', () => {

  const checkoutSystem = new CheckoutSystem();

  it('calculates total for default customer', async () => {
    const checkout = await checkoutSystem.createCheckout('default');
    await checkout.add('classic');
    await checkout.add('standout');
    await checkout.add('premium');
    const total = await checkout.total();
    expect(total).to.equal(98797);
  });

  it('calculates total for UNILEVER customer', async () => {
    const checkout = await checkoutSystem.createCheckout('UNILEVER');
    await checkout.add('classic');
    await checkout.add('classic');
    await checkout.add('classic');
    await checkout.add('premium');
    const total = await checkout.total();
    expect(total).to.equal(93497);
  });

  it('calculates total for APPLE customer', async () => {
    const checkout = await checkoutSystem.createCheckout('APPLE');
    await checkout.add('standout');
    await checkout.add('standout');
    await checkout.add('standout');
    await checkout.add('premium');
    const total = await checkout.total();
    expect(total).to.equal(129496);
  });
  
  it('calculates total for NIKE customer', async () => {
    const checkout = await checkoutSystem.createCheckout('NIKE');
    await checkout.add('premium');
    await checkout.add('premium');
    await checkout.add('premium');
    await checkout.add('premium');
    const total = await checkout.total();
    expect(total).to.equal(151996);
  });

  it('calculates total for FORD customer', async () => {
    const checkout = await checkoutSystem.createCheckout('FORD');
    await checkout.add('classic');
    await checkout.add('classic');
    await checkout.add('classic');
    await checkout.add('classic');
    await checkout.add('classic');
    await checkout.add('standout');
    await checkout.add('standout');
    await checkout.add('premium');
    await checkout.add('premium');
    await checkout.add('premium');
    const total = await checkout.total();
    expect(total).to.equal(286991);
  });
});