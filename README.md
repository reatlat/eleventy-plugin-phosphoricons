# eleventy-plugin-phosphoricons
[![npm](https://img.shields.io/npm/v/eleventy-plugin-phosphoricons.svg)](https://npmjs.com/package/eleventy-plugin-phosphoricons)
[![npm](https://img.shields.io/npm/dt/eleventy-plugin-phosphoricons.svg)](https://npmjs.com/package/eleventy-plugin-phosphoricons)
[![license](https://img.shields.io/npm/l/eleventy-plugin-phosphoricons.svg)](https://npmjs.com/package/eleventy-plugin-phosphoricons)

An Eleventy [shortcode](https://www.11ty.dev/docs/shortcodes/), allows [Phosphor icons](https://phosphoricons.com/) to be embedded as inline svg into templates.

## Installation
Install the plugin from [npm](https://www.npmjs.com/package/eleventy-plugin-phosphoricons):

```
npm install eleventy-plugin-phosphoricons --save-dev
```


Add it to your [Eleventy Config](https://www.11ty.dev/docs/config/) file:

```js
const eleventyPluginPhosphoricons = require('eleventy-plugin-phosphoricons');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyPluginPhosphoricons);
};
```


Advanced usage:

```js
const eleventyPluginPhosphoricons = require('eleventy-plugin-phosphoricons');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyPluginPhosphoricons, {
        class: "phicon",
        style: "vertical-align: middle;",
        size: 32,
        fill: "currentColor"
    });
};
```


## What does it do?
The plugin turns [11ty shortcodes](https://www.11ty.dev/docs/shortcodes/) like this:

```nunjucks
{% phosphor "phosphor-logo" %}
```

or 

```nunjucks
{% phicon "phosphor-logo" %}
```

into HTML code like this:

```html
<svg xmlns="http://www.w3.org/2000/svg" 
     viewBox="0 0 256 256" 
     fill="currentColor" 
     class="phicon"
     style="vertical-align: middle;"
     width="32" height="32">
    <path d="M144,24H64a8,8,0,0,0-8,8V160a80.09,80.09,0,0,0,80,80,8,8,0,0,0,8-8V168a72,72,0,0,0,0-144ZM72,62.54,122.32,152H72Zm56,66.92L77.68,40H128ZM72.51,168H128v55.5A64.14,64.14,0,0,1,72.51,168ZM144,152V40a56,56,0,0,1,0,112Z"></path>
</svg>
```


## Custom Usage

```nunjucks
{% phicon "phosphor-logo", "duotone", { 
    style: "color:red" 
    size: 64,
    class: "phicon bg-blue",
} %}
```


## Contributing
If you notice an issue, feel free to [open an issue](https://github.com/reatlat/eleventy-plugin-phosphoricons/issues).

1. Fork this repo
2. Clone `git clone git@github.com:reatlat/eleventy-plugin-phosphoricons.git`
3. Install dependencies `npm install`
4. Build `npm run build`
5. Serve locally `npm run dev`


## License
The code is available under the [MIT license](LICENSE).
