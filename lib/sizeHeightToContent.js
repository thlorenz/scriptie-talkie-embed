'use strict';

function newlinesIn(src) {
  if (!src) return 0;
  var newlines = src.match(/\n/g);

  return newlines ? newlines.length : 0;
}

module.exports = function (textarea, addRows) {
  var content = textarea.value;
  textarea.rows = Math.max(newlinesIn(content) + addRows, 1);
};

