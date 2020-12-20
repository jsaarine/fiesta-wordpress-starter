<?php

namespace Fiesta;

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
