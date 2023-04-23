class Navigation {

	constructor(el) {
		this.el = el;
		this.toggleButton = this.el.querySelector(".nav-button");
		this.inert = false;

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
			if(e.key == "Escape") {
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
			if(e.target == this.el.querySelector(":scope > div") && e.propertyName == "transform") {
				document.documentElement.classList.remove("nav-open-transition");
			}
		});

		// Add events to parent items
		this.el.querySelectorAll(".menu-item-has-children").forEach(i => {
			i.querySelector("a").insertAdjacentHTML("afterend", '<button class="subnav-button"><svg width="12" height="8" viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg"><path d="M6.748 6.748a1.052 1.052 0 01-1.496 0L.31 1.808A1.059 1.059 0 011.722.24L1.8.31 6 4.505 10.193.31a1.059 1.059 0 011.567 1.411l-.07.078" fill="#000" fill-rule="nonzero"/></svg></button>');

			const subnavButton = i.querySelector(".subnav-button");
			subnavButton.setAttribute("aria-label", "Open sub navigation for " + i.querySelector("a").textContent);

			// Subnav button
			subnavButton.addEventListener("click", e => {
				e.stopPropagation();

				this.toggleChildren(i, e.currentTarget);

				if(!this.isMobileNavOpen()) {
					if(i.classList.contains("hover")) {
						this.checkSubNavPosition(i);
					}
				}
			});

			subnavButton.setAttribute("aria-expanded", false);

			i.addEventListener("mouseenter", e => {
				if(!this.isMobileNavOpen()) {
					this.checkSubNavPosition(i);
				}
			});

			this.checkSubNavPosition(i);
		});

		window.addEventListener("resize", e => {
			if(this.inert) {
				this.inert = false;
				this.setInert(false);
			}
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

		// Set inert
		this.inert = true;
		this.setInert(true);
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

		// Remove inert
		if(this.inert) {
			this.inert = false;
			this.setInert(false);
		}
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

	/**
	 * Use inert to block the rest of the page
	 */
	setInert(value) {
		this.inert = value;

		let current = document.body;

		while(current != this.el) {
			for(const el of current.children) {
				if(el.tagName == "STYLE" || el.tagName == "SCRIPT") continue;

				if(el.contains(this.el)) {
					current = el;
				}
				else {
					el.inert = this.inert;
				}
			}
		}
	}
}
