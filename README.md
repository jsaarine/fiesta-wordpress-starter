# fiesta-wordpress-starter

Fiesta is a lightweight, modern, Gutenberg-friendly WordPress starter theme for lightning-fast development.

## Features

* Sass compilation with Gulp
* Babel compilation, JavaScript concatenation, minification and source maps with Gulp
* Gutenberg editor shares styles with the front-end
* Responsive multi-level navigation

## Usage

1. Extract the starter package into your theme folder (e.g. themes/mytheme)
2. Run `pnpm install --global gulp-cli` to install the Gulp CLI globally
3. Run `pnpm install` to install dependencies
4. Set your development url in `config.js`
5. Run `gulp` to start watch
6. Run `gulp build` to build for production

## Structure

* `dist`: Compiled css and js files
* `js`: JavaScript source files
  * `App.js`: JavaScript entry point
  * `Header.js`: Site header
  * `Navigation.js`: Site navigation
  * `editor`: Gutenberg scripts
  * `vendor`: Vendor scripts
* `scss`: Sass sources files
  * `abstracts`: Functions, mixins and variables
  * `base`: Base styles (e.g. typography)
  * `components`: Components (e.g. button)
  * `layout`: Layout components (e.g. footer)
  * `pages`: Page-specific styles (e.g. home)
  * `themes`: Theme styles (e.g. dark theme)
  * `vendor`: Vendor styles
* `parts`: WordPress block template parts (e.g. header)
* `template-parts`: WordPress template partials (e.g. hero)

## Compatibility

Compatible with the latest version of WordPress.
