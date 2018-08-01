# PostCSS Base64 [![Build Status][ci-img]][ci]

[PostCSS] plugin convert background imgs to inline base64 string..

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/AndreGeng/postcss-base64.svg
[ci]:      https://travis-ci.org/AndreGeng/postcss-base64

```css
.foo {
  background: 'b64--- img/test.png ---';
}
```

```css
.foo {
  background: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB/HNKOAAAAGFBMVEXMzMyWlpajo6O3t7fFxcWcnJyxsbG+vr50Rsl6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAJklEQVQImWNgwADKDAwsAQyuDAzMAgyMbOYMAgyuLApAUhnMRgIANvcCBwsFJwYAAAAASUVORK5CYII=';
}
```

## Usage

```js
postcss([ require('postcss-base64') ])
```

See [PostCSS] docs for examples for your environment.
