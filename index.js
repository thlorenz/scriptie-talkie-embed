'use strict';

var debounce        =  require('debounce')
  , loadAce         =  require('./lib/load-ace')
  , normalizeIndent =  require('./lib/normalize-indent')
  , createContainer =  require('./lib/create-container')
  , createEditor    =  require('./lib/create-editor')
  , createTerminal  =  require('./lib/create-terminal')
  , evaluateScript  =  require('./lib/evaluate-script')
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


function talkify(scripties) {
  scripties.forEach(function(scriptie, idx) {

    var container         =  createContainer(scriptie.el);
    var term              =  createTerminal(container, 'scriptie-talkie-terminal-' + idx)
      , terminal          =  term.terminal
      , terminalContainer =  term.container;
    var edit              =  createEditor(container, scriptie.src, 'scriptie-talkie-ace-editor-' + idx)
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
  var scripties = harvest(wantScripties);
  if (!scripties.length) return;

  // only load ace editor if we found elements in the page that want to talk
  loadAce(talkify.bind(null, scripties));
};
