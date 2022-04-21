## hexo-filter-katex
[![npm-image]][npm-url]
[![license-image]](LICENSE)  
Server side Math Expression Renderer for Hexo, powered by [KaTeX](https://katex.org/).

## Examples
```markdown
## Inline
$ \frac{b^2+c^2-a^2} $
## Block
$$
\cos A = \frac{b^2+c^2-a^2}{2bc} = \frac{(b+c)^2-a^2-2bc}{2bc}
$$
```

## Config
The plugin works perfectly out of the box.  
Though, you can config it to adapt to your preferences.
```yaml
katex:
  render_options:
    # See https://katex.org/docs/options.html for more details
    # Note that `displayMode` is implicitly enabled for Math Block but disabled for Inline Math.

    # output: htmlAndMathml
    # strict: false
    # trust: true
  
  stylesheet_fragment: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css" integrity="sha256-TThEtR+XalhWKkfF383YLOrI50NGNeIqrzS+q08afrY=" crossorigin="anonymous">' # A HTML fragment injected right before </head> for stylesheet
```

## Compatibility
Even when you are using a math-unaware Markdown Renderer (eg. marked), additional escaping is not necessary.  
The plugin ensures that all math expressions are not interpreted as Markdown syntax.  

Note that the tag `_internal_math_placeholder` will be used internally, and you need to ensure that it is not used elsewhere.  

[npm-image]: https://img.shields.io/npm/v/hexo-filter-katex?style=flat-square
[license-image]: https://img.shields.io/npm/l/hexo-filter-katex?style=flat-square
[npm-url]: https://www.npmjs.com/package/hexo-filter-katex