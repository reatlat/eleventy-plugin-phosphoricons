# eleventy-plugin-phosphoricons
[![npm](https://img.shields.io/npm/v/eleventy-plugin-phosphoricons.svg)](https://npmjs.com/package/eleventy-plugin-phosphoricons)
[![npm](https://img.shields.io/npm/dt/eleventy-plugin-phosphoricons.svg)](https://npmjs.com/package/eleventy-plugin-phosphoricons)
[![license](https://img.shields.io/npm/l/eleventy-plugin-phosphoricons.svg)](https://npmjs.com/package/eleventy-plugin-phosphoricons)

An Eleventy [shortcode](https://www.11ty.dev/docs/shortcodes/), allows [Phosphor icons](https://phosphoricons.com/) to be embedded as inline svg or render as an image in your Eleventy project.

Demo: [https://eleventy-plugin-phosphoricons.netlify.app/](https://eleventy-plugin-phosphoricons.netlify.app/)

## Installation
Install the plugin from [npm](https://www.npmjs.com/package/eleventy-plugin-phosphoricons):

```
npm install eleventy-plugin-phosphoricons --save-dev
```

## Configuration

- `class` - The class attribute to be added to the svg element. Default: `phicon`
- `style` - The style attribute to be added to the svg element. Default: `undefined`
- `size` - The width and height attribute to be added to the svg element. Default: `256`
- `fill` - The fill attribute to be added to the svg element. Default: `currentColor`
- `width` - The width attribute to be added to the img element. Default: taken from the `size` attribute
- `height` - The height attribute to be added to the img element. Default: taken from the `size` attribute
- `render` - The render method allows you to render icon as inline svg or image. Default: `svg`, other options: `image` or `img`
- `transformClass` - A CSS class that you want to map using a callback function `transformFill`. Default: `false`
- `transformFill` - A callback function to transform the fill attribute, based on `transformClass` attribute. Default: `undefined`

If `render` is set to `image` or `img`, the following attributes can be used:
- `alt` - The alt attribute to be added to the img element. Default: `altPrefix + iconName`
- `altPrefix` - The alt attribute prefix to be added to the img element. Default: `icon`
- `loading` - The loading attribute to be added to the img element. Default: `lazy`
- `decoding` - The decoding attribute to be added to the img element. Default: `async`
- `eleventyIgnore` - The eleventyIgnore attribute to be added to the img element to prevent `@11ty/eleventy-img` plugin from processing the image. Default: `true`

## Usage

Add it to your [Eleventy Config](https://www.11ty.dev/docs/config/) file:

```js
const eleventyPluginPhosphoricons = require('eleventy-plugin-phosphoricons');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyPluginPhosphoricons);
};
```


### Advanced usage:

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

#### Using `transformFill` callback function

May be useful if you using a CSS framework like Tailwind CSS, Bootstrap, etc. and you want to map the fill attribute to the text color classes.

TailwindCSS usage example:

```js
const eleventyPluginPhosphoricons = require('eleventy-plugin-phosphoricons');
const resolveConfig = require('tailwindcss/resolveConfig.js')
const tailwindConfig = require('tailwind.config.js')

const fullConfig = resolveConfig(tailwindConfig)
module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyPluginPhosphoricons, {
        class: "phicon",
        style: "vertical-align: middle;",
        size: 32,
        fill: "currentColor",
        transformFill: (color) => {
            const [baseColor, shade] = color.replace('text-', '').split('-');
            return shade ? fullConfig.theme.colors[baseColor][shade] : fullConfig.theme.colors[baseColor]['DEFAULT'];
        }
    });
};
```

## What does it do?
The plugin turns [11ty shortcodes](https://www.11ty.dev/docs/shortcodes/) like this:

```liquid
{% phosphor "phosphor-logo" %}
```

or 

```liquid
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

or 

```liquid
{% phicon "phosphor-logo", { render: 'image' } %}
```

into HTML code like this:

```html
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' fill='currentColor' style='vertical-align: middle;' width='32' height='32'%3E%3Cpath d='M144,24H64a8,8,0,0,0-8,8V160a80.09,80.09,0,0,0,80,80,8,8,0,0,0,8-8V168a72,72,0,0,0,0-144ZM72,62.54,122.32,152H72Zm56,66.92L77.68,40H128ZM72.51,168H128v55.5A64.14,64.14,0,0,1,72.51,168ZM144,152V40a56,56,0,0,1,0,112Z'%3E%3C/path%3E%3C/svg%3E" 
     alt="phosphor-logo" 
     class="phicon" 
     style="vertical-align: middle;" 
     width="32" 
     height="32"
     alt="icon ">
```

## Custom Usage

```liquid
{% phicon "phosphor-logo", "duotone", { 
    style: "color:red" 
    size: 64,
    class: "phicon bg-blue"
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
