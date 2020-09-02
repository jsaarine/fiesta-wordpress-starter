<?php

/* Theme setup */

add_action('after_setup_theme', function() {
	// Enable Gutenberg styles
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
	
	// Add hero image max size
	add_image_size('hero', 2500, 1042);

	// Add html5 support
	add_theme_support('html5', array('search-form', 'gallery', 'caption', 'script', 'style'));

	// Add support for wide and full blocks
	add_theme_support('align-wide');

	// Make embeds responsive
	add_theme_support('responsive-embeds');

	// Remove default block patterns
	remove_theme_support('core-block-patterns');
});


/* Assets */

// Front-end
add_action('wp_enqueue_scripts', function() {
	$theme_version = wp_get_theme()->get('Version');

	wp_enqueue_style('fiesta-style', get_stylesheet_directory_uri().'/dist/css/style.css', array(), $theme_version);
	wp_enqueue_script('fiesta-script', get_stylesheet_directory_uri().'/dist/js/script.js', array(), $theme_version, true);
});

// Editor
add_action('enqueue_block_editor_assets', function() {
	$theme_version = wp_get_theme()->get('Version');

	wp_enqueue_script('fiesta-editor-script', get_stylesheet_directory_uri() . '/js/editor/editor.js', array('wp-blocks', 'wp-dom'), $theme_version, true);
});

// Fonts
function fiesta_add_fonts() {
	echo '<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet">';
}

add_action('wp_head', 'fiesta_add_fonts');
add_action('admin_head', 'fiesta_add_fonts');


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

// Disable theme auto update
add_filter('theme_auto_update_setting_template', function($template) {
	$text = __('Auto-updates are not available for this theme.');
 
	return "<# if ( [ 'my-theme', 'fiesta' ].includes( data.id ) ) { #>
		<p>$text</p>
		<# } else { #>
		$template
		<# } #>";
});


/* Remove comments */

add_action('admin_init', function() {
	// Redirect users accessing the comments page
	global $pagenow;

	if($pagenow === 'edit-comments.php') {
		wp_redirect(admin_url());
		exit;
	}

	// Remove comments admin page
	remove_menu_page('edit-comments.php');

	// Remove metabox from dashboard
	remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');

	// Disable support for comments and trackbacks in post types
	foreach (get_post_types() as $post_type) {
		if(post_type_supports($post_type, 'comments')) {
			remove_post_type_support($post_type, 'comments');
			remove_post_type_support($post_type, 'trackbacks');
		}
	}
});

// Close comments on the front-end
add_filter('comments_open', '__return_false', 20, 2);
add_filter('pings_open', '__return_false', 20, 2);

// Hide existing comments
add_filter('comments_array', '__return_empty_array', 10, 2);

// Remove admin bar comments link
add_action('wp_before_admin_bar_render', function() {
	global $wp_admin_bar;
	$wp_admin_bar->remove_menu('comments');
});


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
				'core/social-links',
				'core/embed',
				'core-embed/facebook',
				'core-embed/flickr',
				'core-embed/instagram',
				'core-embed/issuu',
				'core-embed/soundcloud',
				'core-embed/spotify',
				'core-embed/twitter',
				'core-embed/vimeo',
				'core-embed/youtube',
				'core-embed/slideshare',
				'fiesta/sample-block',
			);
	endswitch;  
}, 10, 2);


/* Custom Post types */

/*add_action('init', function() {
	register_post_type('services',
		array(
			'labels' => array(
				'name' => __('Services'),
				'singular_name' => __('Service')
			),
			'public' => false,
			'show_ui' => true,
			'has_archive' => false,
			'rewrite' => array('slug' => 'services'),
			'show_in_rest' => true,
			'supports' => array('title', 'editor'),
		)
	);
});*/


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

function fiesta__($string, $domain = null) {
	if(function_exists('pll__')) {
		return pll__($string);
	}

	return __($string, $domain);
}

function fiesta_e($string, $domain = null) {
	if(function_exists('pll_e')) {
		return pll_e($string);
	}

	return _e($string, $domain);
}
