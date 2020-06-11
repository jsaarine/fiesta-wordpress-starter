class Component {

	constructor(el) {
		this.el = el;
	}

	static setup(arr, ref, selector, settings) {
		arr = arr || document.querySelectorAll(selector);

		if(arr.length == 0) {
			return false;
		}

		const items = [];

		arr.forEach(i => {
			items.push(new ref(i, settings));
		});

		return items;
	}

	init(settings) {
		if(settings) {
			for(var i in settings) {
				if(settings.hasOwnProperty(i)) {
					this.settings[i] = settings[i];
				}
			}
		}
	}

	addEventListener(name, fn) {
		this.el.addEventListener(name, e => {
			fn.call(this, e);
		});
	}

	dispatchEvent(name, props) {
		this.el.dispatchEvent(new CustomEvent(name, props));
	}
}