"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nextPosition;
function nextPosition(_ref, value, nextValue) {
  var start = _ref.start,
      end = _ref.end;

  var expectedShrinkage = end - start;
  var actualShrinkage = value.length - nextValue.length;
  return Math.max(0, start + (expectedShrinkage - actualShrinkage));
}