<?php

namespace Fiesta;

/* Assets */

// Front-end
add_action('wp_enqueue_scripts', function() {
	$theme_version = wp_get_theme()->get('Version');

	wp_enqueue_style(PREFIX, get_stylesheet_directory_uri().'/dist/css/style.css', array(), $theme_version);
	wp_enqueue_script(PREFIX.'-vendor', get_stylesheet_directory_uri().'/js/vendor/vendor.js', array(), null, true);
	wp_enqueue_script(PREFIX, get_stylesheet_directory_uri().'/dist/js/script.js', array(), $theme_version, true);
	wp_localize_script(PREFIX, 'themeVariables', array('themefolder' => get_stylesheet_directory_uri()));
});

// Editor
add_action('enqueue_block_editor_assets', function() {
	$theme_version = wp_get_theme()->get('Version');

	wp_enqueue_script(PREFIX.'-editor', get_stylesheet_directory_uri() . '/js/editor/editor.js', array('wp-blocks', 'wp-dom'), $theme_version, true);
});
