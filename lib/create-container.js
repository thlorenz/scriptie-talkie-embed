'use strict';
var format = require('util').format;

function replaceElement(replaceEl, withEl) {
  replaceEl.parentNode.replaceChild(withEl, replaceEl);
}

module.exports = function createContainer(el, opts) {
  opts = opts || {};
  var minHeight = opts.minHeight || 150; 
  var maxHeight = opts.maxHeight || 600; 
  var container = document.createElement('div');

  var elWidth =  el.clientWidth;
  var height = el.clientHeight + 50;
  height = Math.max(minHeight, height);
  height = Math.min(maxHeight, height);

  container.setAttribute('style', format('position: relative; width: %spx; height: %spx', elWidth, height));

  replaceElement(el, container);
  return container;
};
