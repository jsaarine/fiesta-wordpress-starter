class Search {

	constructor(el) {
		this.el = el;
		this.buttons = document.querySelectorAll("[data-search-button]");
		this.searchField = this.el.querySelector(".search-field")

		this.build();
	}

	build() {
		// Search button
		this.buttons.forEach(item => {
			item.setAttribute("aria-label", item.getAttribute("data-label-open"));
			item.addEventListener("click", e => {
				this.searchButton = e.currentTarget;
				this.toggle();
			});
		});

		// Close
		this.el.querySelector(".close").addEventListener("click", e => {
			this.close();
		});

		document.body.addEventListener("click", e => {
			if(document.documentElement.classList.contains("search-open") && !this.el.contains(e.target) && this.searchButton && !this.searchButton.contains(e.target)) {
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

		this.buttons.forEach(item => {
			item.setAttribute("aria-label", item.getAttribute("data-label-close"));
		});
	}

	toggle() {
		if(document.documentElement.classList.contains("search-open")) {
			this.close();
		}
		else {
			this.open();
		}
	}

	close() {
		document.documentElement.classList.remove("search-open");
		this.searchField.blur();

		this.buttons.forEach(item => {
			item.setAttribute("aria-label", item.getAttribute("data-label-open"));
		});
	}
}
