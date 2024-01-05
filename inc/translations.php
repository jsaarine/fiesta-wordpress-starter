<?php

namespace Fiesta;

/* Translations */

if(function_exists('pll_register_string')) {
	// Polylang translations here
	// pll_register_string(PREFIX, 'Example translation');
}


/* Translate private post types and taxonomies */

/*add_filter('pll_get_post_types', function ($post_types, $is_settings) {
	if($is_settings) {
		unset($post_types['cpt']);
	} else {
		$post_types['cpt'] = 'cpt';
	}

	return $post_types;
}, 10, 2);

add_filter('pll_get_taxonomies', function ($taxonomies, $is_settings) {
	if($is_settings) {
		unset($taxonomies['taxonomy']);
	} else {
		$taxonomies['taxonomy'] = 'taxonomy';
	}

	return $taxonomies;
}, 10, 2);*/
