<?php

namespace Fiesta;


/* Body class */

add_filter('body_class', function($classes) {
	global $post;

	if(isset($post->ID) && get_the_post_thumbnail($post->ID)) {
		$classes[] = 'has-featured-image';
	}

	return $classes;
});
