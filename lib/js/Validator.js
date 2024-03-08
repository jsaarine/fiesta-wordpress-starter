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

		this.el.querySelectorAll("[aria-required='true']").forEach(i => {
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
		let errorText = "";

		// Radio and checkbox
		if(i.getAttribute("role") == "radiogroup") {
			let error = true;

			i.querySelectorAll("input").forEach(function(i) {
				if(i.checked) {
					error = false;
				}
			});

			if(error) {
				errorText = "required";
			}
		}

		if(i.getAttribute("type") == "checkbox") {
			if(!i.checked) {
				errorText = "required";
			}
		}
		// Default
		else if(i.value == "") {
			errorText = "required";
		}

		// Select
		else if(i.tagName == "SELECT") {
			if(i.value == 0) {
				errorText = "required";
			}
		}

		// Email
		if(i.hasAttribute("data-required-email")) {
			if(!/\S+@\S+\.\S+/.test(i.value)) {
				errorText = "data-required-email";
			}
		}

		// Number
		if(i.hasAttribute("data-required-number")) {
			if(isNaN(i.value)) {
				errorText = "data-required-number";
			}
		}

		if(errorText != "") {
			this.addError(i, errorText);
		}

		return errorText == "";
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
