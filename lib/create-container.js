'use strict';
var format = require('util').format;

function replaceElement(replaceEl, withEl) {
  replaceEl.parentNode.replaceChild(withEl, replaceEl);
}

module.exports = function createContainer(textarea, opts) {
  // TODO: height, width overrrides to be added as style to textarea
  
  opts = opts || {};
  var minHeight = opts.minHeight || 150; 
  var maxHeight = opts.maxHeight || 600; 
  var container = document.createElement('div');

  var textareaWidth = textarea.clientWidth;
  var height = textarea.clientHeight + 50;
  height = Math.max(minHeight, height);
  height = Math.min(maxHeight, height);

  container.setAttribute('style', format('position: relative; width: %spx; height: %spx', textareaWidth, height));

  replaceElement(textarea, container);
  return container;
};
