const phosphorIcons = require('./icons.json');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

module.exports = (eleventyConfig, attributes = {}) => {

    const defaultAttributes = {
        class: `phicon`
    }

    const globalAttributes = { ...defaultAttributes, ...attributes };

    const shortcodeHandler = (iconName, iconType = 'regular', attributes = {}) => {
        if (!iconName) {
            throw new Error(
                "[eleventy-plugin-phosphoricons] the iconName must be specified"
            );
        }

        attributes = { ...globalAttributes, ...attributes };

        if (!['regular', 'thin', 'light', 'bold', 'fill', 'duotone'].includes(iconType)) {
            iconType = 'regular';
        }

        const fileName = iconType === 'regular' ? iconName : `${iconName}-${iconType}`;

        if (!phosphorIcons[iconType].includes(fileName)) {
            throw new Error(
                `[eleventy-plugin-phosphoricons] the iconName "${iconName}" does not exist in the ${iconType} type`
            );
        }

        // safetly get SVG content
        const svgContent = fs.readFileSync(path.join(__dirname, `./node_modules/@phosphor-icons/core/assets/${iconType}/${fileName}.svg`), 'utf8');

        const $ = cheerio.load(svgContent, {
            xmlMode: true
        });

        if (attributes.class) {
            $(`svg`).addClass(attributes.class);
        }

        if (attributes.size) {
            $(`svg`).attr(`width`, attributes.size);
            $(`svg`).attr(`height`, attributes.size);
        }

        if (attributes.style) {
            $(`svg`).attr(`style`, attributes.style);
        }

        if (attributes.fill) {
            $(`svg`).attr(`fill`, attributes.fill);
        }

        return $.html().trim();
    };

    eleventyConfig.addShortcode("phosphor", shortcodeHandler);
    eleventyConfig.addShortcode("phicon", shortcodeHandler);

};
