class Search {

	constructor(el) {
		this.el = el;
		this.buttons = document.querySelectorAll("[data-search-button]");
		this.build();
	}

	/**
	 * Build the search
	 */
	build() {
		// Search button
		this.buttons.forEach(item => {
			item.setAttribute("aria-label", item.querySelector(".open").getAttribute("data-label"));
			item.addEventListener("click", e => {
				this.currentButton = e.currentTarget;
				this.toggle();
			});
		});

		// Close
		document.body.addEventListener("click", e => {
			if(!this.el.contains(e.target) && this.currentButton && !this.currentButton.contains(e.target)) {
				this.close();
			}
		});

		// Esc key
		this.el.addEventListener("keydown", e => {
			let key = e.which || e.keyCode;

			if(key == 27) {
				// Close search
				this.close();
			}
		});
	}

	open() {
		document.documentElement.classList.add("search-open");
		this.el.querySelector(".search-field").focus();
		this.el.querySelector(".search-field").value = "";
		this.currentButton.classList.add("active");
		this.currentButton.setAttribute("aria-label", this.currentButton.querySelector(".close").getAttribute("data-label"));
		this.currentButton.setAttribute("aria-expanded", true);
	}

	toggle() {
		if(document.documentElement.classList.contains("search-open")) {
			this.close();
		}
		else {
			this.open();
		}
	}

	/**
	 * Close the search
	 */
	close() {
		document.documentElement.classList.remove("search-open");
		this.currentButton.classList.remove("active");
		this.currentButton.setAttribute("aria-label", this.currentButton.querySelector(".open").getAttribute("data-label"));
		this.currentButton.setAttribute("aria-expanded", false);
	}
}