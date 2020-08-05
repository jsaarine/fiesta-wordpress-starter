# fiesta-wordpress-starter

Fiesta is a lightweight, modern, Gutenberg-friendly WordPress starter theme for lightning-fast development.

See also: [fiesta-blocks](https://github.com/jsaarine/fiesta-blocks) WordPress container plugin for dynamic blocks.

## Features

* Sass compilation with Gulp
* Modern CSS support with PostCSS
* Babel compilation, JavaScript concatenation, minification and source maps with Gulp
* Gutenberg editor shares styles with the front-end
* Responsive multi-level navigation 
* Front-end accessible component library

## Usage

1. Extract into your theme folder
2. Run `npm install`
3. Run `gulp` to start watch
4. Run `gulp build` to build for production

## Structure

* `dist`: Compiled css and js files
* `js`: JavaScript source files
  * `App.js`: JavaScript entry point
  * `Header.js`: Header component
  * `Navigation.js`: Navigation component
  * `vendor`: Vendor files
* `lib`: Front end component library (JavaScript and Sass)
* `scss`: Sass sources files
  * `abstracts`: Mixins and variables
  * `base`: Base styles
  * `components`: Components (e.g. button). Component classes have `c-`prefix
  * `layout`: Layout components (e.g. footer). Layout classes have `c-`prefix
* `template-parts`: WordPress template partials (e.g. hero)
