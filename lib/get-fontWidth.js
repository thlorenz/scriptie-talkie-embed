'use strict';

// TODO: separate module

module.exports = function (target) {
  var tester = document.createElement('div');
  tester.textContent = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  target.appendChild(tester);

  var fontwidth = (tester.clientWidth / 52) + 1;
  target.removeChild(tester);

  return fontwidth;
};
