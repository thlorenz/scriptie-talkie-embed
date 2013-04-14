'use strict';
var hypernal         =  require('hypernal')
  , getStyleProperty =  require('./get-styleProperty')
  , getFontWidth     =  require('./get-fontWidth')
  ;

function getColumns(container, terminalContainer) {

  var fontWidth =  Math.round(getFontWidth(container))
    , width     =  terminalContainer.clientWidth;

  return Math.round(width / fontWidth * 2.6) ;
}

function getRows(terminalContainer) {

  var fontSizeProp  =  getStyleProperty(terminalContainer, 'font-size') 
    , fontSize      =  parseFloat(fontSizeProp)
    , height        =  terminalContainer.clientHeight;

  return Math.round(height / fontSize) - Math.round(height / 80);
}

function getHeight(terminalContainer, rows) {
  var fontSizeProp  =  getStyleProperty(terminalContainer, 'font-size') 
    , fontSize      =  parseFloat(fontSizeProp);

    return fontSize * (rows * 1.1);
}

module.exports = function createTerminal(container, opts) {
  opts = opts || {};
  var rows, height;

  var terminalContainer = document.createElement('div');
  terminalContainer.setAttribute('class', 'scriptie-talkie-terminal');
  container.appendChild(terminalContainer);

  var cols = getColumns(container, terminalContainer);
  if (opts.rows) {
    // calculate height from rows and return it so we can resize container accordingly
    rows = opts.rows;
    height = getHeight(terminalContainer, rows);
  } else {
    // calculate rows from container height
    rows = getRows(terminalContainer);
  }

  var terminal = hypernal(cols, rows);
  terminal.appendTo(terminalContainer);

  return { container: terminalContainer, terminal: terminal, height: height };
};

