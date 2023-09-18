const eleventyPluginPhosphoricons = require("../.eleventy.js");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyPluginPhosphoricons, {
        size: 40
    });
};