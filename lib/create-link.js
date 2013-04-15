'use strict';

module.exports = function (container) {
  var link = document.createElement('a');
  link.setAttribute('class', 'scriptie-talkie-link');
 
  window.link = link;
  container.appendChild(link);
  link.textContent = 'full view';

  return link;
};
