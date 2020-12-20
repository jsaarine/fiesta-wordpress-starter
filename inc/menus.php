<?php

namespace Fiesta;

/* Menus */

add_action('after_setup_theme', function() {
	register_nav_menus(array(
		'primary'  => __('Main Menu'),
	));
});
