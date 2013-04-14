'use strict';

var debounce          =  require('debounce')
  , loadAce           =  require('./lib/load-ace')
  , getTextareaConfig =  require('./lib/get-textarea-config')
  , prepareTextarea   =  require('./lib/prepare-textarea')
  , createContainer   =  require('./lib/create-container')
  , createEditor      =  require('./lib/create-editor')
  , createTerminal    =  require('./lib/create-terminal')
  , evaluateScript    =  require('./lib/evaluate-script')
  , loadStyles        =  require('./lib/load-styles')
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

function sizeTerminalToRowsAndAdjust(container, lines) {
  var evaluatedLines = evaluateScript(lines.join('\n'));

  // tweaking a bit since for larger row numbers terminal wasn't big enough
  // TODO: this tweak isn't working perfectly at all times
  var rows = Math.round(evaluatedLines.length * 1.25 + 2);
  var term = createTerminal(container, { rows: rows });
  console.log('evaluatedLines.length: ', evaluatedLines.length);
  
  console.log('rows: ', rows);
  
  container.style.height = term.height + 'px';
  return term;
}

function talkify(textareas) {
  loadStyles();

  textareas.forEach(function(textarea, idx) {
    var lines     =  prepareTextarea(textarea, -3)
      , config    =  getTextareaConfig(textarea)
      , container =  createContainer(textarea)
      , term;

    //  FUTURE: extra config
    //  readonly  :  true|false
    //  width     :  override
    //  height    :  override
    //  maxheight :  override

    if (!config.sizeToEditor) {
      term = sizeTerminalToRowsAndAdjust(container, lines);
    } else {
      term = createTerminal(container);
    }

    var edit     =  createEditor(container, textarea.textContent, config)
      , terminal =  term.terminal
      , editor   =  edit.editor;

    function evaluate() {
      terminal.reset();
      evaluateScript(editor.getValue(), terminal.writeln.bind(terminal));
    }
    
    editor.on('change', debounce(evaluate, 400, false));
    editor.clearSelection();
    evaluate();

    // scroll to top
    terminal.term.scrollDisp(-9999);
  });
}

module.exports = function () {
  var wantScripties = document.getElementsByClassName('scriptie-talkie');
  var textareas = harvest(wantScripties);
  if (!textareas.length) return;

  // only load ace editor if we found elements in the page that want to talk
  loadAce(talkify.bind(null, textareas));
};
