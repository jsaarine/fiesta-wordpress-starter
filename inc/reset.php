<?php

namespace Fiesta;

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

// Remove dashboard metaboxes
add_action('admin_init', function() {
	remove_meta_box('dashboard_site_health', 'dashboard', 'normal');
	remove_meta_box('dashboard_primary', 'dashboard', 'normal');
	remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
	remove_meta_box('rg_forms_dashboard', 'dashboard', 'normal');
});

// Add post types to activity
add_filter('dashboard_recent_posts_query_args', function($items) {
	$post_types = get_post_types([
		'_builtin' => false
	]);

	if(is_array($post_types)) {
		$items['post_type'] = array_filter($post_types, function($var) {
			return strpos($var, 'acf-') === false;
		});
	}

	return $items;
}, 15);

// Add post types to add a glance
add_action('dashboard_glance_items', function() {
	// Custom post types counts
	$post_types = get_post_types(array(
		'_builtin' => false,
	), 'objects');

	foreach($post_types as $post_type) {
		if(strpos($post_type->name, 'acf-') === false) {
			$num_posts = wp_count_posts($post_type->name);
			$num = number_format_i18n($num_posts->publish);
			$text = _n($post_type->labels->singular_name, $post_type->labels->name, $num_posts->publish);

			if(current_user_can('edit_posts')) {
				$num = '<li class="post-count"><a href="edit.php?post_type=' . $post_type->name . '">' . $num . ' ' . $text . '</a></li>';
			}

			echo $num;
		}
    }
});


// Remove comments
add_action('admin_init', function() {
	// Redirect users accessing the comments page
	global $pagenow;

	if($pagenow === 'edit-comments.php') {
		wp_redirect(admin_url());
		exit;
	}

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

// Remove comments admin page
add_action('admin_menu', function () {
	remove_menu_page('edit-comments.php');
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

// Remove svg filters
remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');
