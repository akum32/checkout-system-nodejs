class Checkout {

  constructor(productRepository) {
    this._productRepository = productRepository;
    this._items = {};
  }

  add(productId) {
    return Promise.resolve(this._items[productId])
      .then(item => item ? item : this._addItem(productId))
      .then(item => item.qty += 1);
  }

  _addItem(productId) {
    return this._productRepository.fetchById(productId).then(
      product => {
        this._items[productId] = {product, qty: 0};
        return this._items[productId];
      }
    );
  }

  total() {
    return Object.entries(this._items).reduce((sum, [_id, item]) => {
        return sum + (item.qty * item.product.price);
    }, 0);
  }
}

module.exports = Checkout;
