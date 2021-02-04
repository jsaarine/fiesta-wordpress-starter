<?php

namespace Fiesta;

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

// Disable theme updates
add_filter('site_transient_update_themes', function($value) {
	if(isset($value) && is_object($value)) {
		unset($value->response[PREFIX]);
	}

	return $value;
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
	foreach(get_post_types() as $post_type) {
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

// Hide users from REST api
add_filter('rest_endpoints', function($endpoints) {
	if(is_user_logged_in()) {
		return $endpoints;
	}

	if(isset($endpoints['/wp/v2/users'])) {
		unset($endpoints['/wp/v2/users']);
	}

	if(isset($endpoints['/wp/v2/users/(?P<id>[\d]+)'])) {
		unset($endpoints['/wp/v2/users/(?P<id>[\d]+)']);
	}

	return $endpoints;
});
