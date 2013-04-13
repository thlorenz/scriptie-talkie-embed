'use strict';
var scriptieTalkie = require('scriptie-talkie');

module.exports = function evaluateScript(script, writeln) {
  if (!script.trim().length) return;
  try {
    scriptieTalkie(script).forEach(function (line) { writeln(line); });
  } catch (e) {
    console.log(e.stack);
    console.error(e.toString());
    if (e instanceof ReferenceError && /Trying to access object from destroyed plug-in/.test(e.message)) {
      var msg = 'Looks like your iPad Safari browser doesn\'t like what scriptie talkie is doing.\n'
              + 'Please try another device and/or browser, i.e. chrome works everywhere, even on iPad.';
      writeln(msg);
    }
    else if (e.inner) {
      writeln('unable to parse the current code, looks like you have an error on: ');
      writeln('line: ' + e.inner.lineNumber + ' column: ' + e.inner.column);
    } else {
      writeln(e.toString());
      writeln(e.stack);
    }

  }
};
