<?php

namespace Fiesta;

/* Assets */

// Front-end
add_action('wp_enqueue_scripts', function() {
	$theme_version = wp_get_theme()->get('Version');

	wp_enqueue_style(PREFIX, get_stylesheet_directory_uri().'/dist/css/style.css', [], $theme_version);
	wp_enqueue_script(PREFIX.'-vendor', get_stylesheet_directory_uri().'/js/vendor/vendor.js', [], $theme_version, true);
	wp_enqueue_script(PREFIX, get_stylesheet_directory_uri().'/dist/js/script.js', [], $theme_version, true);
	wp_localize_script(PREFIX, 'themeVariables', ['themefolder' => get_stylesheet_directory_uri()]);
});

// Favicon
function add_favicon() {
	echo '
		<link rel="apple-touch-icon" sizes="180x180" href="'.get_stylesheet_directory_uri().'/images/favicon/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="'.get_stylesheet_directory_uri().'/images/favicon/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="'.get_stylesheet_directory_uri().'/images/favicon/favicon-16x16.png">
		<link rel="icon" type="image/svg+xml" href="'.get_stylesheet_directory_uri().'/images/favicon/favicon.svg">
		<link rel="manifest" href="'.get_stylesheet_directory_uri().'/images/favicon/site.webmanifest">
		<link rel="mask-icon" href="'.get_stylesheet_directory_uri().'/images/favicon/safari-pinned-tab.svg" color="#694cd4">
		<meta name="theme-color" content="#ffffff">
	';
}

add_action('wp_head', __NAMESPACE__.'\add_favicon');
add_action('admin_head', __NAMESPACE__.'\add_favicon');
add_action('login_head', __NAMESPACE__.'\add_favicon');
