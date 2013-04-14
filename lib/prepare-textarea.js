'use strict';

function trimEmpty(lines) {
  while(lines.length && !lines[0].trim().length) 
    lines.shift();
  while(lines.length && !lines[lines.length - 1].trim().length) 
    lines.length--;
}

function normalizeIndent(lines) {
  // TODO:
}

module.exports = function (textarea, addRows) {
  addRows = addRows || 0;
  var lines = textarea.textContent.split('\n');

  trimEmpty(lines);
  normalizeIndent(lines);
  textarea.rows = Math.max(lines.length + addRows, 1);
  textarea.textContent = lines.join('\n');
};
