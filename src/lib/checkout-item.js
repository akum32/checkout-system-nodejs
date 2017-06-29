class CheckoutItem {

  constructor(product, options = {}) {
    this._product = product;
    this._qty = options.qty || 1;
  }

  get id() {
    return this._product.id;
  }

  get price() {
    return this._product.price;
  }

  get qty() {
    return this._qty;
  }

  addQty() {
    this._qty ++;
  }

  total() {
    return this.qty * this.price;
  }
}

module.exports = CheckoutItem;
