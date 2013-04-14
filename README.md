# scriptie-talkie-embed

Embeds [scriptie-talkie](http://thlorenz.github.io/scriptie-talkie/) in any html page, for instance blog posts, to provide interactive code samples.

## How does this work

A good idea is to look at the [example
implementation](https://github.com/thlorenz/scriptie-talkie-embed/tree/master/example/blog) and to [see the resulting
page](http://thlorenz.github.io/scriptie-talkie-embed/).

All the work is done client side. All you need to do is to follow the simple steps below to properly include
your code samples and the scriptie talkie JavaScript file itself.

### Include code inside html

Any `textarea` with class `scriptie-talkie` will be converted into a scriptie-talkie, so this is the minimum you need:

```html
<textarea class="scriptie-talkie">
  var o = Object.create({a : 1})
  o.a = 2;
  Object.freeze(o)
  o.a = 1; 
  o
</textarea>
```

### Activate scriptie-talkie

### browserify

It is recommended to use [browserify](https://github.com/substack/node-browserify) in order to include scriptie-talkie in
your bundle.

So lets assume you have a build script that specifies `main.js` as an entry, all you'd need to do there is:

```js
var scriptieTalkieEmbed = require('scriptie-talkie-embed');
scriptieTalkieEmbed();
```

Make sure to execute the last line only once the page has loaded or just include the bundle at the bottom of your script
as in the example I mentioned above.

It will then go and convert all your customized `textarea`s into scriptie-talkies.

#### script tag

Alternatively you can include the following script tag in the body of your html file followed by an inline script that activates
scriptie-talkie:

```html
<script type="text/javascript" src="https://github.com/thlorenz/scriptie-talkie-embed/raw/gh-pages/gh-pages/bundle.js"></script>
<script type="text/javascript">
  window.scriptieTalkieEmbed();
</script>
```

### Customize each scriptie-talkie

Customization is done via a `data-scriptie-talkie` property that may be added to each `textarea`.

So far only the following is supported: `{ sizeToEditor: true|false }`, the default being false. Lets look at the above
example again and this time add this customization:

```html
<textarea class="scriptie-talkie" data-scriptie-talkie='{ sizeToEditor: true }'>
  var o = Object.create({a : 1})
  o.a = 2;
  Object.freeze(o)
  o.a = 1; 
  o
</textarea>
```

As you can see the config gets passed as a plain JavasScript object literal.

## Future Features

More config options, particularly related to the sizing of the embedded scriptie-talkie.

```js
{ readonly  :  true|false
, width     :  override
, height    :  override
, maxheight :  override
}
```

