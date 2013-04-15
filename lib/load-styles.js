'use script';

module.exports = function loadStyles() {
  var head   =  document.getElementsByTagName('head')[0];
  var style =  document.createElement('style');

  head.appendChild(style);
  style.innerText = css;
};

var css = [ 
  'textarea.scriptie-talkie {'
, '  visibility: hidden;'
, '  display :  block;'
, '}'

, '.scriptie-talkie-container {'
, '  position: relative; '
, '  margin: 10px 0px;'
, '}'

, '.scriptie-talkie-editor,'
, '.scriptie-talkie-terminal {'
, '  position: absolute;'
, '  top: 0;'
, '  bottom: 0;'
, '  height: 100%;'
, '  width: 50%;'
, '}'

, '.scriptie-talkie-editor {'
, '  left: 0;'
, '  right: 50%;'
, '}'

, '.scriptie-talkie-link {'
, '  position  :  absolute;'
, '  bottom    :  1px;'
, '  right     :  4px;'
, '  font-size :  14px;'
, '  color     :  yellowgreen;'
, '  z-index   :  1;'
, '}'

, 'textarea.scriptie-talkie, '
, '.scriptie-talkie-terminal,'
, '.scriptie-talkie-editor {'
, '  /* text area needs same font to determine editor size correctly */'
, '  font-size     :  12px;'
, '  font-family   :  Terminus,Consolas,Profont,Monaco,Inconsolata,Inconsolata-g,'
, '      Unifont,Lime,"ClearlyU PUA",Clean,"DejaVu Sans Mono","Lucida Console",'
, '      "Bitstream Vera Sans Mono",Freemono,"Liberation Mono",Dina,Anka,Droid Sans Mono,'
, '      Anonymous Pro,Proggy fonts,Envy Code R,Gamow,Courier,"Courier New",Terminal,monospace;'
, '}'

, '.scriptie-talkie-terminal {'
, '  background    :  black;'
, '  right: 0;'
, '  left: 50%;'
, '  overflow: hidden'
, '}'

, '/* tweak the ace editor a bit since we willll never have >99 lines and need to save space */'
, '.scriptie-talkie-editor .ace_gutter-cell ,'
, '.scriptie-talkie-editor .ace_folding-enabled > .ace_gutter-cell { '
, '  padding-left: 5px;'
, '  padding-right: 5px;'
, '}'

].join('\n');
