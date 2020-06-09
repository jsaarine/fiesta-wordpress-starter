<?php

/* Theme setup */

add_action('after_setup_theme', function() {
	add_theme_support('editor-styles');

	// Enqueue editor styles.
	add_editor_style('dist/css/style-editor.css');

	// Let WordPress manage the title tag
	add_theme_support('title-tag');

	// Disable custom colors
	add_theme_support('disable-custom-colors');
	add_theme_support('editor-color-palette', []);

	// Disable custom gradients
	add_theme_support('disable-custom-gradients');
	add_theme_support('editor-gradient-presets', []);

	// Disable custom colors
	add_theme_support('disable-custom-font-sizes');

	// Disable font sizes
	add_theme_support('editor-font-sizes', []);

	// Enable featured image
	add_theme_support('post-thumbnails');

	// Add html5 support
	add_theme_support('html5', array('search-form', 'gallery', 'caption', 'script', 'style'));

	// Add support for wide and full blocks
	add_theme_support('align-wide');

	// Make embeds responsive
	add_theme_support('responsive-embeds');
});


/* Styles */
add_action('wp_enqueue_scripts', function() {
	$theme_version = wp_get_theme()->get('Version');

	wp_enqueue_style('fiesta-style', get_stylesheet_directory_uri().'/dist/css/style.css', array(), $theme_version);
	wp_enqueue_script('fiesta-script', get_stylesheet_directory_uri().'/dist/js/script.js', array(), $theme_version, true);
});

add_action('enqueue_block_editor_assets', function() {
	$theme_version = wp_get_theme()->get('Version');

	// editor scripts
	wp_enqueue_script('fiesta-editor-script', get_stylesheet_directory_uri() . '/js/editor.js', array(), $theme_version, true);
});


/* Menus */
add_action('init', function() {
	register_nav_menus(array(
		'primary'  => __('Main Menu'),
	));
});


/* Reset */

// Remove WP embed
add_action('wp_footer', function() {
	wp_deregister_script('wp-embed');
});


// Remove Emoji
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

// Remove generator
remove_action('wp_head', 'wp_generator');


/* Misc */

function is_text_block($name) {
	$blocks = array(
		'core/paragraph',
		'core/heading',
		'core/list',
	);

	if(in_array($name, $blocks)) {
		return true;
	}

	return false;
}


/* Allowed Block types */

add_filter('allowed_block_types', function($allowed_block_types, $post) {
	switch($post->post_type):
			default:
				return array(
					'core/paragraph',
					'core/image',
					'core/heading',
					'core/list',
					'core/quote',
					'core/file',
					'core/table',
					'core/shortcode',
					'core/columns',
					'core/separator',
					'core/button',
					'core/buttons',
					'core/group',
					'core/gallery',
					'core/media-text',
					'core/cover',
					'core/embed',
					'core-embed/twitter',
					'core-embed/youtube',
					'core-embed/facebook',
					'core-embed/instagram',
					'core-embed/soundcloud',
					'core-embed/spotify',
					'core-embed/flickr',
					'core-embed/vimeo',
					'core-embed/issuu',
					'core-embed/slideshare',
					'fiesta/sample-block',
				);
	endswitch;  
}, 10, 2);


/* Widgets */

add_action('widgets_init', function() {
	register_sidebar( array(
		'name' => __('Footer', 'footer'),
		'id' => 'footer-widget',
		'before_widget' => '',
	   'after_widget' => '',
	   'before_title' => '<p><strong>',
	   'after_title' => '</strong></p>',
	));
});


/* Localization */

if(function_exists('pll_register_string')) {
	// Polylang translations here
}

function t__($string, $domain = null) {
	if(function_exists('pll__')) {
		return pll__($string);
	}

	return __($string, $domain);
}

function t_e($string, $domain = null) {
	if(function_exists('pll_e')) {
		return pll_e($string);
	}

	return _e($string, $domain);
}
