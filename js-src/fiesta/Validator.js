class Validator {

	constructor(el, options) {
		this.options = options || {};
		this.el = el;
		this.errors = [];

		// const submitEvent = options.submitEvent === undefined ? true : options.submitEvent;
		
		// if(submitEvent) {
		// 	this.el.addEventListener("submit", e => {
		// 		this.validate(e);
		// 	}, false);
		// }
	}

	validate(e) {
		this.errors.length = 0;

		this.el.querySelectorAll("[required]").forEach(i => {
			// Skip fields that are not visible
			if((i.offsetParent !== null) == false) {
				return;
			}

			this.validateField(i);
		});

		if(this.errors.length > 0) {
			if(e) {
				e.preventDefault();
			}

			if(typeof this.options.callback === "function") {
				this.options.callback(this.errors);
			}

			return false;
		}

		return true;
	}

	validateField(i) {
		this.error = false;

		// Radio and checkbox
		if(i.getAttribute("type") == "radio" || i.getAttribute("type") == "checkbox") {
			let error = true;

			this.el.querySelectorAll("input[name=" + i.getAttribute("name") + "]").forEach(function(i) {
				if(i.checked) {
					error = false;
				}
			});

			if(error) {
				this.addError(i, "required");
			}
		}
		// Default
		else if(i.value == "") {
			this.addError(i, "required");
		}

		// Select
		else if(i.tagName == "SELECT") {
			if(i.value == 0) {
				this.addError(i, "required");
			}
		}

		// Email
		if(i.hasAttribute("data-required-email")) {
			if(!/\S+@\S+\.\S+/.test(i.value)) {
				this.addError(i, "data-required-email");
			}
		}

		// Number
		if(i.hasAttribute("data-required-number")) {
			if(isNaN(i.value)) {
				this.addError(i, "data-required-number");
			}
		}

		return !this.error;
	}

	addError(target, id) {
		// Reset error
		this.error = true;

		// Create error object
		const obj = {
			name: target.getAttribute("name"),
			error: id,
			element: target,
			message: target.getAttribute("data-message")
		};

		this.errors.push(obj);
	}
}