'use strict';

var ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/monokai');

module.exports = function createEditor(container, src, opts) {
  var editorContainer = document.createElement('div');
  editorContainer.setAttribute('class', 'scriptie-talkie-editor');
  container.appendChild(editorContainer);

  var editor = ace.edit(editorContainer)
    , session = editor.getSession();

  editor.setTheme("ace/theme/monokai");
  session.setMode("ace/mode/javascript");
  session.$tabSize = 2;
  editor.$highlightActiveLine = false;
  editor.setValue(src);
  return { container: editorContainer, editor: editor };
};
