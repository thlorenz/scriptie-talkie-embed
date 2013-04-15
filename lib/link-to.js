'use strict';

var qs                =  require('querystring')
  , scriptieTalkieUrl =  'http://thlorenz.github.io/scriptie-talkie';

module.exports = function linkTo(code) {
  return scriptieTalkieUrl + '?' + qs.stringify({ code: code });
};
