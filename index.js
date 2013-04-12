'use strict';

/*jshint browser: true*/

function harvest(scripties) {
  var res = []
    , len = scripties.length
    , el;
  for (var i = 0; i < len; i++) {
    el = scripties.item(i);
    res.push({ el: el, src: el.textContent });
  }
  return res;
}

module.exports = function () {
  var scripties = document.getElementsByClassName('scriptie-talkie');
  window.res = harvest(scripties);
};
