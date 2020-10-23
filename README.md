# fiesta-wordpress-starter

Fiesta is a lightweight, modern, Gutenberg-friendly WordPress starter theme for lightning-fast development.

See also: [fiesta-blocks](https://github.com/jsaarine/fiesta-blocks) WordPress container plugin for dynamic blocks.

## Features

* Sass compilation with Gulp
* Modern CSS support with PostCSS
* Babel compilation, JavaScript concatenation, minification and source maps with Gulp
* Gutenberg editor shares styles with the front-end
* Responsive multi-level navigation 
* Front-end component library

## Usage

1. Extract the starter package into your theme folder (e.g. themes/mytheme)
2. Run `npm install --global gulp-cli` to install the Gulp CLI globally
3. Run `npm install` to install dependencies
4. Set your development url in `gulpfile.js`
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
* `lib`: Front end component library
  * `js`: JavaScript source files
  * `scss`: Sass source files
* `scss`: Sass sources files
  * `abstracts`: Functions, mixins and variables
  * `base`: Base styles (e.g. typography)
  * `components`: Components (e.g. button)
  * `layout`: Layout components (e.g. footer)
  * `pages`: Page-specific styles (e.g. home)
  * `themes`: Theme styles (e.g. dark theme)
  * `vendor`: Vendor styles
* `template-parts`: WordPress template partials (e.g. hero)
