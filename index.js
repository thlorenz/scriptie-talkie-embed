'use strict';
/*jshint browser: true*/
/*global ace */

var loadAce = require('./lib/load-ace')
  , normalizeIndent = require('./lib/normalize-indent')
  , hypernal = require('hypernal')
  ;

function harvest(scripties) {
  var res = []
    , len = scripties.length
    , el;
  for (var i = 0; i < len; i++) {
    el = scripties.item(i);
    res.push({ el: el, src: normalizeIndent(el.textContent) });
  }
  return res;
}

/*function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}*/

function replaceElement(replaceEl, withEl) {
  replaceEl.parentNode.replaceChild(withEl, replaceEl);
}

function createEditor(container, src, id) {
  var editorContainer = document.createElement('div');
  editorContainer.setAttribute('id', id);
  editorContainer.setAttribute('class', 'scriptie-talkie-editor');
  container.appendChild(editorContainer);

  var editor = ace.edit(id);
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");
  editor.$highlightActiveLine = false;
  editor.setValue(src);
}

function createTerminal(container, opts, id) {
  var terminal = document.createElement('div');
  terminal.setAttribute('id', id);
  terminal.setAttribute('class', 'scriptie-talkie-terminal');
  container.appendChild(terminal);

  var testFontWidth =  20 //document.getElementById('test-font-width').clientWidth + 1
    , fontSize      =  14 //parseInt(getStyle(terminal, 'font-size'), 10)
    , fontWidth     =  Math.round(testFontWidth / (26 * 2))
    , height        =  opts.height
    , width         =  opts.width 
    , rows          =  Math.round(height / (fontSize + 6))
    , cols          =  Math.round(width / fontWidth)
    ;

  //var term = hypernal(cols, rows);
  var term = hypernal(60, 40);
  term.appendTo(terminal);
  term.writeln('hello');
  return term;
}

function talkify(scripties) {
  scripties.forEach(function(scriptie, idx) {
    var container = document.createElement('div');
    replaceElement(scriptie.el, container);

    var editor = createEditor(container, scriptie.src, 'scriptie-talkie-ace-editor-' + idx);
    var terminal = createTerminal(container, { height: 500, width: 500 }, 'scriptie-talkie-terminal-' + idx);
  });
}

module.exports = function () {
  var wantScripties = document.getElementsByClassName('scriptie-talkie');
  var scripties = harvest(wantScripties);
  if (!scripties.length) return;

  // only load ace editor if we found elements in the page that want to talk
  loadAce(talkify.bind(null, scripties));
};
