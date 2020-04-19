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
		this.toggleButton.addEventListener("click", e => {
			if(!document.documentElement.classList.contains("m-nav-open")) {
				this.open();
			}
			else {
				this.close();
			}
		});

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
			document.documentElement.classList.remove("m-nav-open-transition");
		});

		this.el.addEventListener("webkitTransitionEnd", e => {
			document.documentElement.classList.remove("m-nav-open-transition");
		});

		// Adds toggle buttons (+/-)
		this.setupToggleNavigation();
	}

	open() {
		document.documentElement.classList.add("m-nav-open");
		document.documentElement.classList.add("m-nav-open-transition");
		this.el.scrollTo(0,0);
		// this.el.querySelector("nav").focus();
		this.toggleButton.setAttribute("aria-expanded", true);
	}

	close() {
		document.documentElement.classList.remove("m-nav-open");
		document.documentElement.classList.add("m-nav-open-transition");
		this.toggleButton.setAttribute("aria-expanded", false);
	}

	setupToggleNavigation() {
		this.el.querySelectorAll(".menu-item-has-children").forEach(i => {
			i.querySelector("a").insertAdjacentHTML("afterend", '<button class="toggle"><span>+</span><span>-</span></button>');
			
			// Open active menu
			if(i.classList.contains("current_page_item") && this.showActiveMenu) {
				i.querySelector("ul").classList.add("m-visible");
				i.querySelector(".toggle").classList.add("m-active");
			}

			// Parent is link?
			if(this.parentIsLink) {
				i.querySelector(".toggle").addEventListener("click", e => {
					e.preventDefault();
					this.toggle(i, e.currentTarget);
				});
			}
			else {
				i.addEventListener("click", e => {
					e.preventDefault();
					this.toggle(i, e.currentTarget);
				});
			}
		});
	}

	toggle(item, button) {
		item.querySelector("ul").classList.toggle("m-visible");
		button.classList.toggle("m-active");

		// Close children
		item.querySelectorAll(".menu-item-has-children").forEach(function(j) {
			j.querySelector("ul").classList.remove("m-visible");
			j.querySelector(".toggle").classList.remove("m-active");
		});
	}
}