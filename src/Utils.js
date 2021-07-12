/**
 * Formats a number to n digits preprending zeros
 * @param {Number} n number to format
 * @param {Number} length length of the returned string
 * @returns string of length n, starting with zeros and ending with n
 */
const formatNumberLength = (n, length) => {
  var r = "" + n;
  while (r.length < length) {
    r = "0" + r;
  }
  return r;
};

export { formatNumberLength };
