<?php

namespace Fiesta;

/* Assets */

// Front-end
add_action('wp_enqueue_scripts', function() {
	$theme_version = wp_get_theme()->get('Version');

	wp_enqueue_style(PREFIX, get_stylesheet_directory_uri().'/dist/css/style.css', [], $theme_version);
	wp_enqueue_script(PREFIX.'-vendor', get_stylesheet_directory_uri().'/js/vendor/vendor.js', [], null, true);
	wp_enqueue_script(PREFIX, get_stylesheet_directory_uri().'/dist/js/script.js', [], $theme_version, true);
	wp_localize_script(PREFIX, 'themeVariables', ['themefolder' => get_stylesheet_directory_uri()]);
});

// Editor
add_action('enqueue_block_editor_assets', function() {
	$theme_version = wp_get_theme()->get('Version');

	wp_enqueue_script(PREFIX.'-editor', get_stylesheet_directory_uri() . '/js/editor/editor.js', ['wp-blocks', 'wp-dom'], $theme_version, true);
});
