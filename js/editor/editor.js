wp.domReady(function() {
	// Remove editor styles
	wp.blocks.unregisterBlockStyle('core/image', 'rounded');
	wp.blocks.unregisterBlockStyle('core/quote', 'large');
	wp.blocks.unregisterBlockStyle('core/quote', 'plain');
	wp.blocks.unregisterBlockStyle('core/pullquote', 'solid-color');
	wp.blocks.unregisterBlockStyle('core/separator', 'dots');
	wp.blocks.unregisterBlockStyle('core/separator', 'wide');
	wp.blocks.unregisterBlockStyle('core/table', 'stripes');
	wp.blocks.unregisterBlockStyle('core/social-links', 'pill-shape');

	// Add editor styles
	wp.blocks.registerBlockStyle('core/paragraph', {
		name: 'ingress',
		label: 'Ingressi'
	});
});

// Filter block alignment options
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'fiesta/block-alignment',
	function(settings, name) {
		var align;
		var defaultAlign;

		switch(name) {
			case 'core/gallery':
				align = ['wide', 'full'];
				defaultAlign = 'full';
			break;
			case 'core/columns':
				align = ['wide', 'full'];
				defaultAlign = 'wide';
			break;
			case 'core/cover':
				align = ['wide', 'full'];
				defaultAlign = 'full';
			break;
			default:
				return settings;
		}

		return lodash.assign({}, settings, {
			supports: lodash.assign({}, settings.supports, {
				align: align,
			}),
			attributes: lodash.assign({}, settings.attributes, {
				align: lodash.assign({}, settings.attributes.align, {
					default: defaultAlign,
				})
			}),
		});
	}
);
