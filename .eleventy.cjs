// CJS wrapper for backwards compatibility
// For new projects, use ESM: import plugin from 'eleventy-plugin-phosphoricons'

const fs = require('fs');
const path = require('path');
const { parseHTML } = require('linkedom');

const phosphorIcons = JSON.parse(fs.readFileSync(path.join(__dirname, 'icons.json'), 'utf8'));

const phosphorCorePath = path.join(
    path.dirname(require.resolve("@phosphor-icons/core")),
    "../assets"
);

module.exports = (eleventyConfig, attributes = {}) => {

    const defaultAttributes = {
        class: `phicon`,
        render: `svg`,
        loading: `lazy`,
        decoding: `async`,
        altPrefix: `icon`,
        eleventyIgnore: true,
        transformClass: false,
        transformFill: undefined
    }

    const globalAttributes = { ...defaultAttributes, ...attributes };

    const shortcodeHandler = (iconName, iconType = 'regular', attributesOrClasses = {}) => {
        if (!iconName) {
            throw new Error(
                "[eleventy-plugin-phosphoricons] the iconName must be specified"
            );
        }

        // Handle 3rd arg: string = extra classes, object = attributes
        let attributes = {};
        if (typeof attributesOrClasses === 'string' && attributesOrClasses.trim()) {
            const defaultClass = globalAttributes.class || '';
            attributes.class = defaultClass ? `${defaultClass} ${attributesOrClasses}` : attributesOrClasses;
        } else if (typeof attributesOrClasses === 'object' && attributesOrClasses !== null) {
            attributes = attributesOrClasses;
        }

        attributes = { ...globalAttributes, ...attributes };

        attributes.render = attributes.render.toLowerCase();

        if (!['regular', 'thin', 'light', 'bold', 'fill', 'duotone'].includes(iconType)) {
            iconType = 'regular';
        }

        const fileName = iconType === 'regular' ? iconName : `${iconName}-${iconType}`;

        if (!phosphorIcons[iconType].includes(fileName)) {
            throw new Error(
                `[eleventy-plugin-phosphoricons] the iconName "${iconName}" does not exist in the ${iconType} type`
            );
        }

        if (!['svg', 'image', 'img'].includes(attributes.render)) {
            attributes.render = 'svg';
            console.warn(`[eleventy-plugin-phosphoricons] the render attribute must be one of the following: svg, image, img. Defaulting to svg.`);
        }

        if (typeof attributes.transformFill === 'function' && attributes.transformClass) {
            try {
                attributes.fill = attributes.transformFill(attributes.transformClass);
            } catch (error) {
                console.warn(`[eleventy-plugin-phosphoricons] the transformFill function failed: ${error}`);
                console.warn(`[eleventy-plugin-phosphoricons] the attributes.transformClass will be ignored`);
            }
        }

        const svgContent = fs.readFileSync(
            path.join(phosphorCorePath, `./${iconType}/${fileName}.svg`),
            "utf8"
        );

        const { document } = parseHTML(svgContent);
        const svgIcon = document.querySelector('svg');

        if (attributes.render === 'svg') {
            if (attributes.class) {
                svgIcon.setAttribute('class', attributes.class);
            }
            svgIcon.setAttribute('aria-hidden', 'true');
        }

        if (attributes.style) {
            svgIcon.setAttribute('style', attributes.style);
        }

        if (attributes.size) {
            svgIcon.setAttribute('width', attributes.size);
            svgIcon.setAttribute('height', attributes.size);
        }

        if (attributes.fill) {
            svgIcon.setAttribute('fill', attributes.fill);
        }

        let iconString = svgIcon.outerHTML;

        if (['image', 'img'].includes(attributes.render)) {
            let defaultAltText = attributes.altPrefix ? [attributes.altPrefix, iconName] : [iconName];

            let imageAttributes = {
                src: `data:image/svg+xml,${encodeURIComponent(iconString)}`,
                width: attributes.size,
                height: attributes.size,
                loading: attributes.loading,
                decoding: attributes.decoding,
                alt: attributes.alt || defaultAltText.join(' '),
                "aria-hidden": true,
            };

            if (attributes.eleventyIgnore) {
                imageAttributes["eleventy:ignore"] = true;
            }

            if (attributes.style) {
                imageAttributes.style = attributes.style;
            }

            if (attributes.class) {
                imageAttributes.class = attributes.class;
            }

            iconString = `<img ${Object.keys(imageAttributes).map(key => `${key}="${imageAttributes[key]}"`).join(' ')} />`;
        }

        return iconString.trim();
    };

    eleventyConfig.addShortcode("phosphor", shortcodeHandler);
    eleventyConfig.addShortcode("phicon", shortcodeHandler);

};