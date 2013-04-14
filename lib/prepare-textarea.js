'use strict';

function trimEmpty(lines) {
  while(lines.length && !lines[0].trim().length) 
    lines.shift();
  while(lines.length && !lines[lines.length - 1].trim().length) 
    lines.length--;
}

function leftAlign(lines) {
  var indent = -1;
  // find smallest indent
  lines
    .filter(function (line) { 
      return line.trim().length; 
    })
    .forEach(function (line) {
      var lineIndent = 0, col = 0;
      
      while(line.charAt(col++) === ' ') lineIndent++;
      indent = indent === -1 ? lineIndent : Math.min(indent, lineIndent);
    });

  if (!indent) return lines;

  for (var i = 0; i < lines.length; i++) 
    lines[i] = lines[i].slice(indent);
}

module.exports = function (textarea, addRows) {
  addRows = addRows || 0;
  var lines = textarea.textContent.split('\n');

  trimEmpty(lines);
  leftAlign(lines);
  textarea.rows = Math.max(lines.length + addRows, 1);
  textarea.textContent = lines.join('\n');
};
