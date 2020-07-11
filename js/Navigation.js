class Navigation {

	constructor(el) {
		this.el = el;
		this.parentIsLink = true;
		this.showActiveMenu = false;
		this.toggleButton = document.querySelector("#nav-button");
		this.closeButton = document.querySelector("#nav-close");
		
		this.build();
	}

	build() {
		let touched = false;

		this.toggleButton.addEventListener("click", e => {
			if(!document.documentElement.classList.contains("nav-open")) {
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
			document.documentElement.classList.remove("nav-open-transition");
		});

		this.el.addEventListener("webkitTransitionEnd", e => {
			document.documentElement.classList.remove("nav-open-transition");
		});

		// Second level
		this.el.querySelectorAll(".menu-item-has-children").forEach(i => {
			i.querySelector("a").insertAdjacentHTML("afterend", '<button class="subnav-button" aria-label="Open sub-menu"><svg width="12" height="8" viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg"><path d="M6.748 6.748a1.052 1.052 0 01-1.496 0L.31 1.808A1.059 1.059 0 011.722.24L1.8.31 6 4.505 10.193.31a1.059 1.059 0 011.567 1.411l-.07.078" fill="#000" fill-rule="nonzero"/></svg></button>');

			const subnavButton = i.querySelector(".subnav-button");
			
			// Open active menu
			if(i.classList.contains("current_page_item") && this.showActiveMenu) {
				// i.querySelector("ul").classList.add("visible");
				subnavButton.classList.add("active");
			}

			// Parent is link?
			if(this.parentIsLink) {
				subnavButton.addEventListener("click", e => {
					e.preventDefault();
					this.toggleChildren(i, e.currentTarget);
				});
			}
			else {
				i.addEventListener("click", e => {
					e.preventDefault();
					this.toggleChildren(i, e.currentTarget);
				});
			}

			// Touch support for hover menu
			i.querySelector("a").addEventListener("touchstart", e => {
				if(!document.documentElement.classList.contains("nav-open")) {
					if(!touched) {
						e.preventDefault();
					}

					i.classList.toggle("hover");
					touched = true;
				}

				this.checkSubNavPosition(i);
			});

			document.addEventListener("click", e => {
				if(!this.el.contains(e.target)) {
					this.el.querySelectorAll(".menu-item-has-children").forEach(item => {
						item.classList.remove("hover");
					});

					touched = false;
				}
			});

			i.addEventListener("mouseenter", e => {
				this.checkSubNavPosition(i);
			});

			i.addEventListener("mouseleave", e => {
				const ul = i.querySelector("ul");

				i.classList.remove("hover");
				ul.classList.remove("left");
				ul.classList.remove("right");
				ul.classList.remove("active");
			});
		});
	}

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

	open() {
		document.documentElement.classList.add("nav-open");
		document.documentElement.classList.add("nav-open-transition");
		this.el.scrollTo(0,0);
		// this.el.querySelector("nav").focus();
		this.toggleButton.setAttribute("aria-expanded", true);
	}

	close() {
		document.documentElement.classList.remove("nav-open");
		document.documentElement.classList.add("nav-open-transition");
		this.toggleButton.setAttribute("aria-expanded", false);
	}

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