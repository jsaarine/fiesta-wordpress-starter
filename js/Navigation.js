class Navigation {

	constructor(el) {
		this.el = el;
		this.toggleButton = document.querySelector("#nav-button");
		this.touched = false;

		this.build();
	}

	/**
	 * Build the navigation
	 */
	build() {
		// Menu button
		this.toggleButton.addEventListener("click", e => {
			if(!this.isMobileNavOpen()) {
				this.open();
			}
			else {
				this.close();
			}
		});

		// Close
		document.body.addEventListener("click", e => {
			if(!this.el.contains(e.target)) {
				this.close();
			}
		});

		// Esc key
		this.el.addEventListener("keydown", e => {
			let key = e.which || e.keyCode;

			if(key == 27) {
				// Close sub nav
				if(!this.isMobileNavOpen()) {
					this.el.querySelectorAll(".subnav-button").forEach(item => {
						item.classList.remove("active");
					});

					this.el.querySelectorAll("ul").forEach(item => {
						item.classList.remove("active");
					});
				}

				// Close mobile nav
				this.close();
			}
		});

		// Remove transition when animation complete
		this.el.addEventListener("transitionend", e => {
			if(e.target == this.el.querySelector("div") && e.propertyName == "transform") {
				document.documentElement.classList.remove("nav-open-transition");
			}
		});

		// Add events to parent items
		this.el.querySelectorAll(".menu-item-has-children").forEach(i => {
			i.querySelector("a").insertAdjacentHTML("afterend", '<button class="subnav-button" aria-label="Open sub-menu"><svg width="12" height="8" viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg"><path d="M6.748 6.748a1.052 1.052 0 01-1.496 0L.31 1.808A1.059 1.059 0 011.722.24L1.8.31 6 4.505 10.193.31a1.059 1.059 0 011.567 1.411l-.07.078" fill="#000" fill-rule="nonzero"/></svg></button>');

			const subnavButton = i.querySelector(".subnav-button");

			// Subnav button
			subnavButton.addEventListener("click", e => {
				e.stopPropagation();

				this.toggleChildren(i, e.currentTarget);

				if(!this.isMobileNavOpen()) {
					if(i.classList.contains("hover")) {
						this.touched = true;
						this.checkSubNavPosition(i);
					}
					else {
						this.touched = false;
					}
				}
			});

			subnavButton.setAttribute("aria-expanded", false);

			// Touch support for hover menu
			i.addEventListener("touchstart", e => {
				e.stopPropagation();

				// Close sibling menus if open
				this.closeSiblings(i);

				if(!this.isMobileNavOpen()) {
					if(!this.touched || !i.classList.contains("hover")) {
						e.preventDefault();
					}

					if(!i.classList.contains("hover")) {
						i.classList.add("hover");
						i.querySelector(".subnav-button").setAttribute("aria-expanded", true);
						this.touched = true;
						this.checkSubNavPosition(i);
					}
				}
			});

			i.addEventListener("mouseenter", e => {
				if(!this.isMobileNavOpen()) {
					i.classList.add("hover");

					if(!this.touched) {
						this.checkSubNavPosition(i);
					}
				}
			});

			i.addEventListener("mouseleave", e => {
				const ul = i.querySelector("ul");

				if(!this.isMobileNavOpen()) {
					i.classList.remove("hover");
					ul.classList.remove("active");
				}

				this.clearSubNav(i);
			});
		});

		// Close all when touched outside
		document.addEventListener("touchstart", e => {
			if(!this.el.contains(e.target)) {
				this.clearSubNav();
			}
		});
	}

	/**
	 * Check if mobile nav is open
	 */
	isMobileNavOpen() {
		return document.documentElement.classList.contains("nav-open") && this.toggleButton.offsetParent;
	}

	/**
	 * Hide the floating sub nav
	 */
	clearSubNav(el) {
		const target = el || this.el;

		if(!this.isMobileNavOpen()) {
			target.querySelectorAll(".menu-item-has-children").forEach(item => {
				item.classList.remove("hover");
				item.querySelector(".subnav-button").setAttribute("aria-expanded", false);
			});

			this.touched = false;
		}
	}

	/**
	 * Close open sibling menus when opening a new menu
	 */
	closeSiblings(item) {
		if(!this.isMobileNavOpen() && !item.classList.contains("hover")) {
			item.parentNode.querySelectorAll(":scope > li").forEach(item2 => {
				if(item2.classList.contains("hover")) {
					item2.classList.remove("hover");
				}
			});
		}
	}


	/**
	 * Check if the sub nav is out of bounds
	 */
	checkSubNavPosition(el) {
		const ul = el.querySelector("ul");
		ul.classList.remove("right");

		const pos = ul.getBoundingClientRect().left;
		const margin = 10;

		// Out of bounds on right side of screen
		if(pos + ul.offsetWidth > window.innerWidth - margin) {
			ul.classList.add("right");
		}

		// Out of bounds on left side of screen
		if(pos < margin) {
			ul.classList.add("left");
		}
	}

	/**
	 * Open the mobile nav
	 */
	open() {
		document.documentElement.classList.add("nav-open");
		document.documentElement.classList.add("nav-open-transition");

		this.el.querySelector("div").scrollTop = 0;
		this.toggleButton.setAttribute("aria-expanded", true);
	}

	/**
	 * Close the mobile nav
	 */
	close() {
		this.clearSubNav();

		if(this.isMobileNavOpen()) {
			document.documentElement.classList.add("nav-open-transition");
		}

		document.documentElement.classList.remove("nav-open");

		this.toggleButton.setAttribute("aria-expanded", false);
	}

	/**
	 * Toggle the sub nav
	 */
	toggleChildren(item, button) {
		// Close sibling menus if open
		this.closeSiblings(item);

		item.classList.toggle("hover");
		button.setAttribute("aria-expanded", item.classList.contains("hover"));
	}
}
