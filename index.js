const postcss = require('postcss');
const fs = require('fs');
const promisify = require('util').promisify;
const path = require('path');

const access = promisify(fs.access);
const readFile = promisify(fs.readFile);

function transformpath(pathstr) {
  if (path.isAbsolute(pathstr)) {
    return path;
  }
  if (!/^\./i.test(pathstr)) {
    return `./${pathstr}`;
  }
  throw new Error(`${pathstr} format not correct`);
}

const convertFileToBase64 = function (f, basedir, mime) {
  const file = path.resolve(basedir, transformpath(f));
  return access(file, fs.constants.F_OK)
    .then(() => readFile(file))
    .then((data) => {
      const ext = path.extname(file);
      let mimeType = 'image/png';
      const matchKey = Object.keys(mime).filter((key) => {
        return (new RegExp(`\\.?${key}`)).test(ext);
      })[0];
      const b64Str = data.toString('base64');
      if (matchKey) {
        mimeType = mime[matchKey];
      }
      return `data:${mimeType};base64,${b64Str}`;
    });
};


module.exports = postcss.plugin('postcss-base64', function (options) {
  // Work with options here
  const defaultOpts = {
    b64Regex: /b64-{3}\s*([^-\--]+)\s*-{3}/g,
    basedir: __dirname,
    mime: {
      png: 'image/png',
    }
  };
  const opts = Object.assign({}, defaultOpts, options);
  const {
    b64Regex,
  } = opts;

  return function (root) {

    const promises = [];
    // Transform CSS AST here
    root.walkRules(function (rule) {
      rule.walkDecls(/^background(?:-image)?$/, (decl) => {
        const p = (async function () {
          const match = b64Regex.exec(decl.value);
          try {
            const base64 = await convertFileToBase64(match[1].trim(), opts.basedir, opts.mime);
            decl.value = decl.value.replace(opts.b64Regex, base64);
          } catch (e) {
            console.error(e);
          }
        })();
        promises.push(p);
      });
    });
    return Promise.all(promises);
  };
});
