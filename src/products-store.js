class ProductsStore {

  async fetchById(productId) {
    return this._getProducts().find(p => p.id === productId);
  }

  _getProducts() {
    return [
      {id: 'classic', price: 26999},
      {id: 'standout', price: 32299},
      {id: 'premium', price: 39499}
    ]
  }
}

module.exports = ProductsStore;
