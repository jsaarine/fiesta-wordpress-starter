wp.hooks.addFilter(
	'blocks.registerBlockType',
	'fiesta/filters',
	function(settings, name) {
		var align;
		var defaultAlign;

		switch(name) {
			case 'core-embed/vimeo':
			case 'core-embed/youtube':
				align = ['wide', 'full'];
				defaultAlign = 'wide';
			break;
			case 'core/gallery':
				align = ['wide', 'full'];
				defaultAlign = 'full';
			break;
			case 'core/image':
				align = ['wide', 'full'];
				defaultAlign = 'wide';
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
