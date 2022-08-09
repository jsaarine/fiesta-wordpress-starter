<?php

namespace Fiesta;


/* Constants */

const PREFIX = 'fiesta';


/* Functions */

/**
 * Gets an array of pages by template name
 */
function get_pages_by_template($template) {
	$pages = get_posts([
		'post_type' => 'page',
		'meta_key' => '_wp_page_template',
		'meta_value' => $template.'.php'
	]);

	return $pages;
}

/**
 * Gets a menu item by post id
 */
function get_menu_item_by_post($post_id, $menu) {
	$menu_item = null;
	$nav = wp_get_nav_menu_items($menu);

	foreach($nav as $item) {
		if($post_id == $item->object_id) {
			$menu_item = $item;
			break;
		}
	}

    return $menu_item;
}

/**
 * Returns Polylang string translation. Falls back to __()
 */
function __($string, $domain = null) {
	if(function_exists('pll__')) {
		return pll__($string);
	}

	return \__($string, $domain);
}

/**
 * Echoes Polylang string translation. Falls back to _e()
 */
function _e($string, $domain = null) {
	if(function_exists('pll_e')) {
		return pll_e($string);
	}

	return \_e($string, $domain);
}

require_once('inc/assets.php');
require_once('inc/hooks.php');
require_once('inc/menus.php');
require_once('inc/post-types.php');
require_once('inc/reset.php');
require_once('inc/setup.php');
require_once('inc/taxonomies.php');
require_once('inc/translations.php');
require_once('inc/widgets.php');
