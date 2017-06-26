class CheckoutItem {

  constructor(product) {
    this._product = product;
    this._qty = 0;
  }

  increaseQty() {
    this._qty ++;
  }

  total() {
    return this._qty * this._product.price;
  }
}

module.exports = CheckoutItem;
