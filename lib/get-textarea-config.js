'use strict';
/*jshint evil: true */

module.exports = function (textarea) {
  var opts = {};
  var data = textarea.getAttribute('data-scriptie-talkie');
  if (!data) return opts;

  try {
    opts = eval('(' + data + ')');
  } catch (e) {
    console.error(e);
  } finally {
    return opts;
  }
};
