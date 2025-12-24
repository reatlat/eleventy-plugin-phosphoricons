# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2025-12-24

### Changed
- Replaced `cheerio` with `linkedom` for lighter dependency footprint
- Migrated all source files to ESM syntax
- Updated all documentation examples to ESM

### Added
- Dual package support (ESM + CJS) via exports field
- Liquid template support with string classes: `{% phicon "icon" "type" "extra-classes" %}`
- Liquid test page in demo

### Fixed
- Third argument now accepts both object (Nunjucks) and string (Liquid/classes)

## [1.3.0] - 2024-08-01

### Added
- `transformFill` callback function for CSS framework integration
- `transformClass` attribute for fill transformation

## [1.2.0] - 2024-04-28

### Added
- Image render mode (`render: 'image'`)
- `eleventyIgnore` attribute for @11ty/eleventy-img compatibility

## [1.1.0] - 2023-09-20

### Added
- Initial release with basic shortcode functionality
- Support for all six icon types (regular, thin, light, bold, fill, duotone)