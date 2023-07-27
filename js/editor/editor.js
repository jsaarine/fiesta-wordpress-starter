wp.domReady(function() {
	// Remove block styles
	wp.blocks.unregisterBlockStyle('core/image', 'rounded');
	wp.blocks.unregisterBlockStyle('core/quote', 'large');
	wp.blocks.unregisterBlockStyle('core/quote', 'plain');
	wp.blocks.unregisterBlockStyle('core/pullquote', 'solid-color');
	wp.blocks.unregisterBlockStyle('core/separator', 'dots');
	wp.blocks.unregisterBlockStyle('core/separator', 'wide');
	wp.blocks.unregisterBlockStyle('core/table', 'stripes');
	wp.blocks.unregisterBlockStyle('core/social-links', 'pill-shape');

	// Add block styles
	wp.blocks.registerBlockStyle('core/button', {
		name: "dark",
		label: "Dark"
	});
});
