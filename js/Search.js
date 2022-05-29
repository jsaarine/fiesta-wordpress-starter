class Search {

	constructor(el) {
		this.el = el;
		this.buttons = document.querySelectorAll("[data-search-button]");
		this.closeButton = document.querySelector(".close");
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
		// this.closeButton.addEventListener("click", e => {
		// 	console.log("close2");
		// 	this.close();
		// });

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


// class Search {

// 	constructor(el) {
// 		this.el = el;
// 		this.toggleButton = document.querySelectorAll("[data-search-button]");
// 		this.searchOpen = false;
// 		this.build();
// 	}

// 	/**
// 	 * Build the search
// 	 */
// 	build() {
// 		// Search button
// 		this.toggleButton.forEach(item => {
// 			console.log(item);
// 			item.addEventListener("click", e => {
// 				this.open();
// 			});
// 		});

// 		// Close
// 		this.el.querySelector(".close").addEventListener("click", e => {
// 			this.close();
// 		});

// 		// Esc key
// 		this.el.addEventListener("keydown", e => {
// 			let key = e.which || e.keyCode;

// 			if(key == 27) {
// 				// Close search
// 				this.close();
// 			}
// 		});
// 	}

// 	open() {
// 		console.log("open");
// 		document.documentElement.classList.add("search-open");
// 		this.el.querySelector(".search-field").focus();
// 	}

// 	/**
// 	 * Close the search
// 	 */
// 	close() {
// 		document.documentElement.classList.remove("search-open");
// 	}
// }
