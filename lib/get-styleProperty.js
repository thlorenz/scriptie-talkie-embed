'use strict';

// TODO: separate module
module.exports = function getStyle(el, prop) {
  return el.currentStyle
    ? el.currentStyle[prop]
    : window.getComputedStyle 
      ? document.defaultView.getComputedStyle(el, null).getPropertyValue(prop)
      : null;
};
