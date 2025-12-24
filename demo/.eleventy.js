import eleventyPluginPhosphoricons from "../.eleventy.js";

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyPluginPhosphoricons, {
        size: 40,
        transformFill: (fill) => {
            return fill.replace("text-", "") || 'currentColor';
        }
    });
};