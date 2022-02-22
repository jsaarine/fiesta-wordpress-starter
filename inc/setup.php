<?php

namespace Fiesta;

/* Theme setup */

add_action('after_setup_theme', function() {
	// Enable Gutenberg styles
	add_theme_support('editor-styles');

	// Enqueue editor styles.
	add_editor_style('dist/css/style-editor.css');

	// Let WordPress manage the title tag
	add_theme_support('title-tag');

	// Enable featured image
	add_theme_support('post-thumbnails');

	// Add html5 support
	add_theme_support('html5', array('search-form', 'gallery', 'caption', 'script', 'style'));

	// Make embeds responsive
	add_theme_support('responsive-embeds');

	// Remove default block patterns
	remove_theme_support('core-block-patterns');

	// Disable block template editing
	remove_theme_support('block-templates');
});
