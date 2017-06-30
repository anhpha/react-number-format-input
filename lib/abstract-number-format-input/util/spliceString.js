'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = spliceString;
/**
 * String equivalent of Array::splice.
 * Deletes characters from a string and inserts a second string where those
 * characters were deleted.
 * @param {string} str The string to splice into.
 * @param {number} start The position of the deletion and insertion in the above string.
 * @param {number} deleteCount The number of characters to delete.
 * @param {string} insertString The string to insert.
 * @returns {string} The spliced string.
 */
function spliceString(str, start, deleteCount) {
  var insertString = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  return str.slice(0, start) + insertString + str.slice(start + deleteCount);
}