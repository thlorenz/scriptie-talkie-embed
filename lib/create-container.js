'use strict';
var format = require('util').format;

function replaceElement(replaceEl, withEl) {
  replaceEl.parentNode.replaceChild(withEl, replaceEl);
}

module.exports = function createContainer(textarea, opts) {
  opts = opts || {};
  var minHeight =  opts.minHeight || 150;
  var maxHeight =  opts.maxHeight || 600;
  var minWidth  =  opts.minWidth  || 600;

  var textareaWidth = textarea.clientWidth;
  var width = Math.max(minWidth, textareaWidth);

  var height = textarea.clientHeight + 50;
  height = Math.max(minHeight, height);
  height = Math.min(maxHeight, height);

  var container =  document.createElement('div');
  container.setAttribute('class', 'scriptie-talkie-container');
  container.setAttribute('style', format('width: %spx; height: %spx', width, height));

  replaceElement(textarea, container);

  return container;
};
