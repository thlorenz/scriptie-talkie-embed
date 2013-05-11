'use strict';
var hypernal = require('hypernal');

function appendTerminal(terminalContainer, lines) {
  var terminal = hypernal(); 
  if (lines) lines.forEach(function (line) { terminal.writeln(line); });
  terminal.appendTo(terminalContainer);

  return terminal;
}

function appendTerminalAndGetHeight(terminalContainer, lines) {
  var terminal = appendTerminal(terminalContainer, lines);
  var height = terminal.element.clientHeight;

  return { terminal: terminal, height: height };
}

module.exports = function createTerminal(container, opts) {
  opts = opts || {};
  var height, terminal;

  var terminalContainer = document.createElement('div');
  terminalContainer.setAttribute('class', 'scriptie-talkie-terminal');
  container.appendChild(terminalContainer);

  if (opts.lines) {
    var appended = appendTerminalAndGetHeight(terminalContainer, opts.lines);
    terminal = appended.terminal;
    height = appended.height;
  } else {
    terminal = appendTerminal(terminalContainer);
  }

  return { container: terminalContainer, terminal: terminal, height: height };
};

