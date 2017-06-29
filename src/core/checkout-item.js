class CheckoutItem {

  constructor({product, qty = 1}) {
    this._product = product;
    this._qty = qty;
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
