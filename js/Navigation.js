class Navigation {

	constructor(el) {
		this.el = el;
		this.parentIsLink = true;
		this.toggleButton = document.querySelector("#nav-button");
		this.closeButton = document.querySelector("#nav-close");
		this.touched = false;
		
		this.build();
	}

	/**
	 * Build the navigation
	 */
	build() {
		this.toggleButton.addEventListener("click", e => {
			if(!this.isMobileNavOpen()) {
				this.open();
			}
			else {
				this.close();
			}
		});

		// Close
		this.closeButton.addEventListener("click", e => {
			this.close();
		});

		// Esc key
		this.el.addEventListener("keydown", e => {
			let key = e.which || e.keyCode;

			if(key == 27) {
				this.close();
			}
		});

		// Remove transition when animation complete
		this.el.addEventListener("transitionend", e => {
			if(e.target == this.el.querySelector("ul") && e.propertyName == "transform") {
				document.documentElement.classList.remove("nav-open-transition");
			}
		});

		this.el.addEventListener("webkitTransitionEnd", e => {
			if(e.target == this.el.querySelector("ul") && e.propertyName == "transform") {
				document.documentElement.classList.remove("nav-open-transition");
			}
		});

		// Second level
		this.el.querySelectorAll(".menu-item-has-children").forEach(i => {
			i.querySelector("a").insertAdjacentHTML("afterend", '<button class="subnav-button" aria-label="Open sub-menu"><svg width="12" height="8" viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg"><path d="M6.748 6.748a1.052 1.052 0 01-1.496 0L.31 1.808A1.059 1.059 0 011.722.24L1.8.31 6 4.505 10.193.31a1.059 1.059 0 011.567 1.411l-.07.078" fill="#000" fill-rule="nonzero"/></svg></button>');

			const subnavButton = i.querySelector(".subnav-button");

			// Subnav button
			subnavButton.addEventListener("click", e => {
				e.stopPropagation();
				this.toggleChildren(i, e.currentTarget);
				this.touched = true;
			});

			// Touch support for hover menu
			i.addEventListener("touchstart", e => {
				e.stopPropagation();

				if(!this.isMobileNavOpen()) {
					if(!this.touched || !i.classList.contains("hover")) {
						e.preventDefault();
					}

					if(!i.classList.contains("hover")) {
						i.classList.add("hover");
						this.touched = true;
						this.checkSubNavPosition(i);
					}
				}
			});

			i.addEventListener("mouseenter", e => {
				if(!this.touched) {
					this.checkSubNavPosition(i);
				}
			});

			i.addEventListener("mouseleave", e => {
				const ul = i.querySelector("ul");

				if(!this.isMobileNavOpen()) {
					i.classList.remove("hover");
					ul.classList.remove("left");
					ul.classList.remove("right");
					ul.classList.remove("active");
				}
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
		return document.documentElement.classList.contains("nav-open");
	}

	/**
	 * Hide the floating sub nav
	 */
	clearSubNav() {
		this.el.querySelectorAll(".menu-item-has-children").forEach(item => {
			item.classList.remove("hover");
		});

		this.touched = false;
	}

	/**
	 * Check if the sub nav is out of bounds
	 */
	checkSubNavPosition(el) {
		const ul = el.querySelector("ul");
		const pos = ul.getBoundingClientRect().left;
		const margin = 10;

		if(pos + ul.offsetWidth > window.innerWidth - margin) {
			ul.classList.add("right");
		}

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
		this.el.querySelector("ul").scrollTop = 0;
		// this.el.querySelector("nav").focus();
		this.toggleButton.setAttribute("aria-expanded", true);
	}

	/**
	 * Close the mobile nav
	 */
	close() {
		document.documentElement.classList.remove("nav-open");
		document.documentElement.classList.add("nav-open-transition");
		this.toggleButton.setAttribute("aria-expanded", false);
	}

	/**
	 * Toggle the sub nav
	 */ 
	toggleChildren(item, button) {
		// Core.slideToggle(item.querySelector("ul"));
		item.classList.toggle("hover");
		item.querySelector("ul").classList.toggle("active");
		button.classList.toggle("active");

		// Close children
		item.querySelectorAll(".menu-item-has-children").forEach(function(j) {
			j.querySelector("ul").classList.remove("active");
			j.querySelector(".subnav-button").classList.remove("active");
		});
	}
}