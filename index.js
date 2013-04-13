'use strict';
/*jshint browser: true*/
/*global ace */

var loadAce = require('./lib/load-ace');

function harvest(scripties) {
  var res = []
    , len = scripties.length
    , el;
  for (var i = 0; i < len; i++) {
    el = scripties.item(i);
    res.push({ el: el, src: el.textContent });
  }
  return res;
}

function createEditor(replaceElement, id) {

  var container = document.createElement('div');
  container.setAttribute('id', id);
  replaceElement.parentNode.replaceChild(container, replaceElement);

  var editor = ace.edit(id);
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");
  editor.$highlightActiveLine = false;
  return editor;
}

function talkify(scripties) {
  console.log('talkifying');
  scripties.forEach(function(scriptie, idx) {
    var editor = createEditor(scriptie.el, 'scriptie-talkie-ace-editor-' + idx);
    editor.setValue(scriptie.src);
  });
}

module.exports = function () {
  var wantScripties = document.getElementsByClassName('scriptie-talkie');
  var scripties = harvest(wantScripties);
  if (!scripties.length) return;

  // only load ace editor if we found elements in the page that want to talk
  loadAce(talkify.bind(null, scripties));
};
