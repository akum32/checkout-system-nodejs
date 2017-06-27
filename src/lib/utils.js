function sum(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

module.exports = {sum};
