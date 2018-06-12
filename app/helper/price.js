/**
 * Takes a price represented as an integer and returns a string where the two last digits is decimals.
 * If the two last digits is 00 it returns only the whole number as a string
 * @param value
 * @returns {string}
 * @private
 */
export const formatIntegerPrice = value => {
  const tmp = value.toString();
  const label = `${tmp.substring(0, tmp.length - 2)}.${tmp.substring(tmp.length - 2)}`;
  return label.endsWith('00') ? label.substring(0, label.length - 3) : label;
};

export const formatPriceByPriceLabel = (label, price, currency) =>
  label.replace('P', formatIntegerPrice(price)).replace('C', currency);
