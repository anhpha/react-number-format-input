"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelection = getSelection;
exports.setSelection = setSelection;
function getSelection(elem) {
  return { start: elem.selectionStart, end: elem.selectionEnd };
}

function setSelection(elem, _ref) {
  var start = _ref.start,
      _ref$end = _ref.end,
      end = _ref$end === undefined ? start : _ref$end;

  elem.setSelectionRange(start, end);
}