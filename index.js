'use strict';

var debounce        =  require('debounce')
  , loadAce         =  require('./lib/load-ace')
  , prepareTextarea =  require('./lib/prepare-textarea')
  , createContainer =  require('./lib/create-container')
  , createEditor    =  require('./lib/create-editor')
  , createTerminal  =  require('./lib/create-terminal')
  , evaluateScript  =  require('./lib/evaluate-script')
  ;

function harvest(scripties) {
  var res = []
    , len = scripties.length
    , textarea
    , src;
  for (var i = 0; i < len; i++) {
    textarea = scripties.item(i);
    res.push(textarea);
  }
  return res;
}


function talkify(textareas) {
  textareas.forEach(function(textarea, idx) {

    prepareTextarea(textarea, -3);

    var container         =  createContainer(textarea);
    var term              =  createTerminal(container, 'scriptie-talkie-terminal-' + idx)
      , terminal          =  term.terminal
      , terminalContainer =  term.container;
    var edit              =  createEditor(container, textarea.textContent, 'scriptie-talkie-ace-editor-' + idx)
      , editor            =  edit.editor
      , editorContainer   =  edit.container;

    function evaluate() {
      terminal.reset();
      evaluateScript(editor.getValue(), terminal.writeln.bind(terminal));
    }

    editor.on('change', debounce(evaluate, 400, false));
    evaluate();
  });
}

module.exports = function () {
  var wantScripties = document.getElementsByClassName('scriptie-talkie');
  var textareas = harvest(wantScripties);
  if (!textareas.length) return;

  // only load ace editor if we found elements in the page that want to talk
  loadAce(talkify.bind(null, textareas));
};
