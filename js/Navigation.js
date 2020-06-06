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
			i.querySelector("a").insertAdjacentHTML("afterend", '<button class="toggle"><span>+</span><span>-</span></button>');
			
			// Open active menu
			if(i.classList.contains("current_page_item") && this.showActiveMenu) {
				// i.querySelector("ul").classList.add("visible");
				i.querySelector(".toggle").classList.add("active");
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

			// Touch support for hover menu
			i.querySelector("a").addEventListener("touchstart", e => {
				if(!document.documentElement.classList.contains("nav-open")) {
					if(!touched) {
						e.preventDefault();
					}
					
					i.classList.toggle("hover");
					touched = true;
				}
			});

			document.addEventListener("click", e => {
				if(!this.el.contains(e.target)) {
					this.el.querySelectorAll(".menu-item-has-children").forEach(item => {
						item.classList.remove("hover");
					});	

					touched = false;
				}
			});
		});
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

	toggle(item, button) {
		Core.slideToggle(item.querySelector("ul"));
		button.classList.toggle("active");

		// Close children
		item.querySelectorAll(".menu-item-has-children").forEach(function(j) {
			// j.querySelector("ul").classList.remove("visible");
			j.querySelector(".toggle").classList.remove("active");
		});
	}
}