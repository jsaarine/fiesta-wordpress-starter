# fiesta-wordpress-starter

Fiesta is a lightweight, modern, Gutenberg-friendly WordPress starter theme

## Features

* Sass compilation with Gulp
* Custom properties support with PostCSS
* Babel compilation, JavaScript concatenation, minification and source maps with Gulp
* Basic styles for WordPress blocks
* Gutenberg editor shares styles with the front-end

## Usage

1. Extract into your theme folder
2. Run `npm install`
3. Run `gulp` to start watch

## Structure

* `dist`: Compiled css and js files
* `js`: JavaScript source files
  * `App.js`: JavaScript entry point
  * `Header.js`: Header component
  * `Navigation.js`: Navigation component
  * `fiesta`: Fiesta component library
  * `vendor`: Vendor files
* `scss`: Sass sources files
  * `abstracts`: Mixins and variables
  * `base`: Base styles
  * `components`: Components (e.g. button). Component classes have `c-`prefix
  * `layout`: Layout components (e.g. footer). Layout classes have `c-`prefix
* `template-parts`: WordPress template partials (e.g. hero)
