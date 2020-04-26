<?php

/* Theme setup */

function theme_setup() {
	add_theme_support('editor-styles');

	// Enqueue editor styles.
	add_editor_style('dist/css/style-editor.css');

	// Let WordPress manage the title tag
	add_theme_support('title-tag');

	// Disable custom colors
	// add_theme_support('disable-custom-colors');

	// add_theme_support('editor-color-palette', []);

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
}

add_action('after_setup_theme', 'theme_setup');


/* Styles */
function theme_register_styles() {
	$theme_version = wp_get_theme()->get('Version');

	wp_enqueue_style('twentytwenty-style', get_stylesheet_directory_uri().'/dist/css/style.css', array(), $theme_version);
}

add_action('wp_enqueue_scripts', 'theme_register_styles');


/* Menus */
function theme_menus() {

	$locations = array(
		'primary'  => __('Desktop Horizontal Menu', 'twentytwenty'),
	);

	register_nav_menus( $locations );
}

add_action('init', 'theme_menus');


/* Reset */

// Remove WP embed
function my_deregister_scripts(){
	wp_deregister_script('wp-embed');
}

add_action('wp_footer', 'my_deregister_scripts');

// Remove Emoji
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

// Remove generator
remove_action('wp_head', 'wp_generator');


/* Post types */

/*function create_custom_posttypes() {
	register_post_type('services',
		array(
				'labels' => array(
						'name' => __('Services'),
						'singular_name' => __('Services')
				),
				'public' => true,
				'has_archive' => true,
				'rewrite' => array('slug' => 'services'),
				'show_in_rest' => true,
				'supports' => array('title', 'editor'),
				'has_archive' => false
		)
	);
}

add_action('init', 'create_custom_posttypes');*/


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

function posts_allowed_block_types($allowed_block_types, $post) {
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
					'fiesta/test-block',
				);
	endswitch;  
}

add_filter('allowed_block_types', 'posts_allowed_block_types', 10, 2);


/* Widgets */

function theme_register_widgets() {
	register_sidebar( array(
		'name' => __('Footer', 'footer'),
		'id' => 'footer-widget',
		'before_widget' => '',
	   'after_widget' => '',
	   'before_title' => '<p><strong>',
	   'after_title' => '</strong></p>',
	));
}

add_action('widgets_init', 'theme_register_widgets');