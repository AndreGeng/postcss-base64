var postcss = require('postcss');
var fs = require('fs');
var path = require('path');

var plugin = require('../');

function run(input, output, opts) {
  return postcss([ plugin(opts) ]).process(input)
    .then(result => {
      expect(result.css).toEqual(output);
      expect(result.warnings().length).toBe(0);
    });
}

test('postcss-base64 should replace any background imgs to inline base64 string', () => {
  var cssStr = fs.readFileSync(path.resolve(__dirname, './test.css'), {
    encoding: 'utf-8',
  });
  return run(cssStr, `a {
  background: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB/HNKOAAAAGFBMVEXMzMyWlpajo6O3t7fFxcWcnJyxsbG+vr50Rsl6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJklEQVQImWNgwADKDAwsAQyuDAzMAgyMbOYMAgyuLApAUhnMRgIANvcCBwsFJwYAAAAASUVORK5CYII=';
}
`, {
    basedir: __dirname,
  });
});
