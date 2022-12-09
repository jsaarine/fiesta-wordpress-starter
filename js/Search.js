class Search {

	constructor(el) {
		this.el = el;
		this.buttons = document.querySelectorAll("[data-search-button]");
		this.searchField = this.el.querySelector(".search-field")

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
			if(document.documentElement.classList.contains("search-open") && !this.el.contains(e.target) && this.currentButton && !this.currentButton.contains(e.target)) {
				this.close();
			}
		});

		// Esc key
		this.el.addEventListener("keydown", e => {
			if(e.key == "Escape") {
				// Close search
				this.close();
			}
		});
	}

	open() {
		document.documentElement.classList.add("search-open");
		this.searchField.focus();
		this.searchField.value = "";
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
		this.searchField.blur();
	}
}
