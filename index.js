/* global hexo */

'use strict';

const katex = require('katex');
require('katex/contrib/mhchem');
const fragment = [];
const putPlaceholder = (html) => {
    const i = fragment.push(html) - 1;
    return `{% _internal_math_placeholder ${i} %}`
}
const convertMath = (content) => {
    const mathEnv = {
        env: {},
        renderMath: function (display, math) {
            return katex.renderToString(math, {
                displayMode: display,
                macros: this.env,
                ...hexo.config.katex?.render_options
            });
        }
    };
    var newContent = "";
    var rawStart = 0;
    for (let i = 0; i < content.length; i++) {
        switch (content[i]) {
            case '\\':
                i++;
                break;
            case '`':
                if (content[i + 1] === '`' && content[i + 2] === '`') {
                    i += 3;
                    do {
                        i++;
                    }
                    while (content[i] !== '`' || content[i + 1] !== '`' || content[i + 2] !== '`');
                    i += 2;
                } else {
                    i++;
                    do {
                        i++;
                    } while (content[i] && !/\r|\n|`/.test(content[i]));
                }
                break;
            case '$':
                newContent = newContent + content.substring(rawStart, i);
                if (content[i + 1] === '$') {
                    i += 2;
                    const mathStart = i;
                    do {
                        i++;
                    }
                    while (content[i] !== '$' || content[i + 1] !== '$');
                    const math = content.substring(mathStart, i);
                    i++;

                    newContent = newContent + putPlaceholder(mathEnv.renderMath(true, math));
                } else {
                    i++;
                    const mathStart = i;
                    do {
                        i++;
                    } while (content[i] && !/\r|\n|\$/.test(content[i]));
                    const math = content.substring(mathStart, i);

                    newContent = newContent + putPlaceholder(mathEnv.renderMath(false, math));
                }
                rawStart = i + 1;
            default:
                break;
        }
    }
    newContent = newContent + content.substr(rawStart);
    return newContent;
}
hexo.extend.filter.register('before_post_render', function (data) {
    data.content = convertMath(data.content);
}, 9);
hexo.extend.tag.register('_internal_math_placeholder', function (args) {
    const id = Number.parseInt(args[0], 10);
    return fragment[id];
})
hexo.extend.injector.register('head_end', () => {
    return hexo.config.katex?.stylesheet_fragment
        || '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css" integrity="sha256-TThEtR+XalhWKkfF383YLOrI50NGNeIqrzS+q08afrY=" crossorigin="anonymous">'
}, 'default');