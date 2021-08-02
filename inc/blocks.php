<?php

namespace Fiesta;

/* Allowed Block types */

add_filter('allowed_block_types_all', function($allowed_block_types, $post) {
	switch($post->post_type):
		default:
			return array(
				'core/block',
				'core/audio',
				'core/button',
				'core/buttons',
				'core/code',
				'core/columns',
				'core/cover',
				'core/embed',
				'core/file',
				'core/gallery',
				'core/group',
				'core/heading',
				'core/image',
				'core/list',
				'core/media-text',
				'core/paragraph',
				'core/pullquote',
				'core/quote',
				'core/separator',
				'core/shortcode',
				'core/social-links',
				'core/table',
				'core/video',
			);
	endswitch;
}, 10, 2);
