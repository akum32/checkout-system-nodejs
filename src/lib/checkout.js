const CheckoutItem = require('./checkout-item');

class Checkout {

  constructor(productRepository) {
    this._productRepository = productRepository;
    this._items = {};
  }

  async add(productId) {
    const exists = this._items[productId];
    const item = exists ? this._items[productId] : await this._addItem(productId);
    item.increaseQty();
  }

  async _addItem(productId) {
    const product = await this._productRepository.fetchById(productId);
    this._items[productId] = new CheckoutItem(product);
    return this._items[productId];
  }

  total() {
    return Object.values(this._items).reduce(
      (sum, item) => sum + item.total(), 0
    );
  }
}

module.exports = Checkout;
