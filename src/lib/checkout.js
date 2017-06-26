const CheckoutItem = require('./checkout-item');

class Checkout {

  constructor(productRepository) {
    this._productRepository = productRepository;
    this._items = {};
  }

  add(productId) {
    return Promise.resolve(this._items[productId])
      .then(item => item ? item : this._addItem(productId))
      .then(item => item.increaseQty());
  }

  _addItem(productId) {
    return this._productRepository.fetchById(productId).then(
      product => {
        const checkoutItem = new CheckoutItem(product);
        this._items[productId] = checkoutItem;
        return checkoutItem;
      }
    );
  }

  total() {
    return Object.values(this._items).reduce(
      (sum, item) => sum + item.total(), 0
    );
  }
}

module.exports = Checkout;
