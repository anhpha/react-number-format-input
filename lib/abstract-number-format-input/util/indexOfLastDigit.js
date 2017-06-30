"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = indexOfLastDigit;
function indexOfLastDigit(str) {
  var match = /\d\D*$/.exec(str);
  return match ? match.index : -1;
}