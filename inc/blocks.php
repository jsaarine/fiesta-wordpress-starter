<?php

namespace Fiesta;

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
