<?php

namespace Fiesta;

/* Assets */

// Front-end
add_action('wp_enqueue_scripts', function() {
	$theme_version = wp_get_theme()->get('Version');

	wp_enqueue_style(PREFIX.'-style', get_stylesheet_directory_uri().'/dist/css/style.css', array(), $theme_version);
	wp_enqueue_script(PREFIX.'-script', get_stylesheet_directory_uri().'/dist/js/script.js', array(), $theme_version, true);
	wp_localize_script(PREFIX.'-script', PREFIX, array('themefolder' => get_stylesheet_directory_uri()));
});

// Editor
add_action('enqueue_block_editor_assets', function() {
	$theme_version = wp_get_theme()->get('Version');

	wp_enqueue_script(PREFIX.'-editor-script', get_stylesheet_directory_uri() . '/js/editor/editor.js', array('wp-blocks', 'wp-dom'), $theme_version, true);
});

// Fonts
function add_custom_fonts() {
	echo '<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet">';
}

add_action('wp_head', __NAMESPACE__.'\add_custom_fonts');
add_action('admin_head', __NAMESPACE__.'\add_custom_fonts');
