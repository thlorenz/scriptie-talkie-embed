'use strict';
var hypernal = require('hypernal');

module.exports = function createTerminal(container, id) {
  var terminalContainer = document.createElement('div');
  terminalContainer.setAttribute('id', id);
  terminalContainer.setAttribute('class', 'scriptie-talkie-terminal');
  container.appendChild(terminalContainer);

  var testFontWidth =  20 //document.getElementById('test-font-width').clientWidth + 1
    , fontSize      =  14 //parseInt(getStyle(terminalContainer, 'font-size'), 10)
    , fontWidth     =  Math.round(testFontWidth / (26 * 2))
    ;

  var terminal = hypernal(60, 40);
  terminal.appendTo(terminalContainer);

  return { container: terminalContainer, terminal: terminal };
};

/*, rows          =  Math.round(height / (fontSize + 6))
, cols          =  Math.round(width / fontWidth)*/
