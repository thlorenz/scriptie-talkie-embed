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

function appendTerminal(terminalContainer, cols, rows, lines) {
  var terminal = hypernal(cols, rows);
  if (lines) lines.forEach(function (line) { terminal.writeln(line); });
  terminal.appendTo(terminalContainer);

  return terminal;
}

function appendTerminalAndGetHeight(terminalContainer, cols, lines) {
  // not sure why 15 seems to be the magic number to tweak number of rows
  var rows = lines.length + 15;

  var terminal = appendTerminal(terminalContainer, cols, rows, lines);
  var height = terminal.element.clientHeight;

  return { terminal: terminal, height: height };
}

module.exports = function createTerminal(container, opts) {
  opts = opts || {};
  var rows, height, terminal;

  var terminalContainer = document.createElement('div');
  terminalContainer.setAttribute('class', 'scriptie-talkie-terminal');
  container.appendChild(terminalContainer);

  var cols = getColumns(container, terminalContainer);
  if (opts.lines) {
    var appended = appendTerminalAndGetHeight(terminalContainer, cols, opts.lines);
    terminal = appended.terminal;
    height = appended.height;
  } else {
    // calculate rows from container height
    rows = getRows(terminalContainer);
    terminal = appendTerminal(terminalContainer, cols, rows);
  }

  return { container: terminalContainer, terminal: terminal, height: height };
};

