class Form extends Component {

	constructor(el, settings) {
		super(el);

		this.button = this.el.querySelector("[data-submit]");
		this.errorMessage = this.el.querySelector("[data-fetch-error]");
		this.successMessage = this.el.querySelector("[data-success]");
		this.formContent = this.el.querySelector("[data-form-content]");
		this.sending = false;

		this.settings = {
			ajax: true
		}

		this.init(settings);

		this.build();
	}

	static setup(arr) {
		return super.setup(arr, Form, "[data-form]");
	}

	build() {
		// Validator options
		const options = {
			submitEvent: false,
			callback: (errors) => {
				// Loop through validation errors
				errors.forEach(i => {
					// console.log(i, i.element.closest("label"));
					i.element.closest(".field").classList.add("error");
				});

				// If errors, scroll to and focus first error
				if(errors.length > 0) {
					this.showMessage(errors[0].element);
				}
			}
		}
		
		this.validator = new Validator(this.el, options);

		// Live validation
		this.el.querySelectorAll("[required]").forEach(i => {
			// Validate field on change
			const type = i.getAttribute("type");

			if(type == "radio" || type == "checkbox" ||  type == "file") {
				i.addEventListener("change", e => {
					this.validateField(i);
				});
			}
			else {
				i.addEventListener("input", e => {
					this.validateField(i);
				});	
			}
		});

		// Add submit event
		this.el.addEventListener("submit", e => {
			this.submitted = true;

			if(this.validator.validate()) {
				if(this.settings.ajax) {
					e.preventDefault();

					if(!this.sending) {
						this.send();
					}
				}
			}
			else {
				e.preventDefault();
			}

		}, false);
	}

	send() {
		const url = this.el.getAttribute("data-action");
		const data = this.serialize();

		// Fetch
		const searchParams = Object.keys(data).map(key => {
  			return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
		}).join('&');

		fetch(url, {
			method: "POST",
			body: searchParams,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
			}
		}).then(response => {
			return response.json();
		}).then(data => {
			this.success(data);
		}).catch(err => {
			this.error(err);
		});

		// XMLHttpRequest
		/*Core.fetch(url, {
			callback: this.success.bind(this),
			errorCallback: this.error.bind(this),
			method: "POST",
			data: JSON.stringify(data),
			headers: {"Content-Type":"application/x-www-form-urlencoded"},
			dataType: "json" // json or text (default)
		});*/

		this.startLoader();
	}

	serialize() {
		const elems = this.el.elements;
		let data = {};

		for(let i = 0; i < elems.length; i += 1) {
			const element = elems[i];
			const type = element.type;
			const name = element.name;

			if(!name) {
				continue;
			}

			switch(type) {
				case "checkbox":
					data[name] = element.checked ? element.value : 0;
					break;
				case "radio":
					if(element.checked) {
						data[name] = element.value;
					}
					break;
				default:
					data[name] = element.value;
					break;
			}
		}
		
		return data;
	}

	success(data) {
		this.dispatchEvent("success");

		// Hide errors
		if(data.success) {
			if(this.errorMessage) {
				this.el.querySelector("[data-fetch-error]").style.display = "none";	
			}

			// Hide form and show success
			if(this.formContent) {
				this.formContent.style.display = "none";
			}
			
			this.el.reset();

			if(this.successMessage) {
				this.showMessage(this.successMessage, true);
			}
		}
		// Back end validation errors
		else {
			let errors = [];

			// Loop through errors
			data.errors.forEach(i => {
				const el = this.el.querySelector("[name='" + i + "']");
				el.classList.add("error");
				el.closest("label").classList.add("error");

				errors.push(el);
			});

			// If errors, scroll to first error
			if(errors.length > 0) {
				this.showMessage(errors[0]);
			}
		}

		this.stopLoader();
	}

	error(error) {
		console.error(error);

		if(this.errorMessage) {
			this.showMessage(this.el.querySelector("[data-fetch-error]"), true);
		}
		
		this.dispatchEvent("error");
		this.stopLoader();
	}

	showMessage(el, show) {
		if(show) {
			el.style.display = "block";
		}

		// Scroll offset
		// let offset = -30;
		let offset = -window.innerHeight / 4;
		const top = el.getBoundingClientRect().top;

		if(top < -offset || top > window.innerHeight) {
			Jump(el, {duration: 500, offset: offset, callback: function() {
				el.focus();
			}});
		}
		else {
			el.focus();
		}
	}

	validateField(i) {
		if(this.submitted) {
			if(!this.validator.validateField(i)) {
				i.closest(".field").classList.add("error");
			}
			else {
				i.closest(".field").classList.remove("error");
			}
		}
	}

	startLoader() {
		this.sending = true;
		this.el.classList.add("sending");
		this.button.querySelector(".c-loader").classList.add("active");
	}

	stopLoader() {
		this.sending = false;
		this.el.classList.remove("sending");
		this.button.querySelector(".c-loader").classList.remove("active");
	}
}