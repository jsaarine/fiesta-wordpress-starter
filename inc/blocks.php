<?php

namespace Fiesta;

/* Allowed Block types */

add_filter('allowed_block_types', function($allowed_block_types, $post) {
	switch($post->post_type):
		default:
			return array(
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
				'fiesta/sample-block',
			);
	endswitch;
}, 10, 2);


/* ACF blocks */

/*add_action('acf/init', function() {
	if(function_exists('acf_register_block_type')) {
		acf_register_block_type(array(
			'name' => 'testing',
			'title' => __('Testing'),
			'description' => __('A test block.'),
			'render_template' => 'template-parts/blocks/testing/testing.php',
			'category' => 'common',
			'icon' => 'admin-comments',
			'keywords' => array('testing'),
		));
	}
});*/
