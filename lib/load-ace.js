'use script';

module.exports = function loadAce(cb) {
  var head   =  document.getElementsByTagName('head')[0];
  var script =  document.createElement('script');

  script.type =  'text/javascript';
  script.src  =  'http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js';
  head.appendChild(script);

  script.onreadystatechange = function () {
    if (this.readyState === 'complete') cb();
  };
  script.onload = cb;
};
