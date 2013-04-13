'use strict';
var hypernal         =  require('hypernal')
  , getStyleProperty =  require('./get-styleProperty')
  , getFontWidth     =  require('./get-fontWidth')
  ;

module.exports = function createTerminal(container, id) {
  var terminalContainer = document.createElement('div');
  terminalContainer.setAttribute('id', id);
  terminalContainer.setAttribute('class', 'scriptie-talkie-terminal');
  container.appendChild(terminalContainer);

  var fontSizeProp  =  getStyleProperty(terminalContainer, 'font-size') 
    , fontSize      =  parseFloat(fontSizeProp)
    , fontWidth     =  Math.round(getFontWidth(container))
    , height        =  terminalContainer.clientHeight
    , width         =  terminalContainer.clientWidth
    , rows          =  Math.round(height / fontSize) - 4
    , cols          =  Math.round(width / fontWidth * 2.6) 
    ;

  var terminal = hypernal(cols, rows);
  terminal.appendTo(terminalContainer);

  return { container: terminalContainer, terminal: terminal };
};

