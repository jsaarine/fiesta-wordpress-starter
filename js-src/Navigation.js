class Navigation {

	constructor(el) {
		this.el = el;
		this.parentIsLink = true;
		this.showActiveMenu = true;
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

		// Adds clickable overlay
		// this.setupOverlay();

		// Adds double tab
		// this.setupDoubleTapToGo(document.querySelectorAll("#main-nav > nav > ul > li"));
	}

	open() {
		document.documentElement.classList.add("m-nav-open");
		document.documentElement.classList.add("m-nav-open-transition");
		this.el.scrollTo(0,0);
		// this.el.querySelector("nav").focus();
		this.toggleButton.setAttribute("aria-expanded", true);

		// Inert WIP
		/*
		// if(this.el.parentNode == document.body) {
			[].slice.call(document.body.children).forEach(item => {
				if(item !== this.el.parentNode && item.tagName != "SCRIPT") {
					item.inert = true;
				}
				// else {
				// 	[].slice.call(item.children).forEach(item2 => {
				// 		if(item2 !== this.el && item.tagName != "SCRIPT") {
				// 			item2.inert = true;
				// 		}
				// 	});
				// }
			});

			// this.el.inert = false;

			let node = this.el;

			while(node !== document.body) {
				console.log(node);
				node.inert = false;
				node = node.parentNode;
			}
		// }
		*/
	}

	close() {
		document.documentElement.classList.remove("m-nav-open");
		document.documentElement.classList.add("m-nav-open-transition");
		this.toggleButton.setAttribute("aria-expanded", false);

		// Inert WIP
		// if(this.el.parentNode == document.body) {
		// 	[].slice.call(document.body.children).forEach(item => {
		// 		item.inert = false;
		// 	});
		// }
	}

	setupToggleNavigation() {
		this.el.querySelectorAll(".m-parent").forEach(i => {
			i.querySelector("a").insertAdjacentHTML("afterend", '<button class="toggle"><span>+</span><span>-</span></button>');
			
			// Open active menu
			if(i.classList.contains("m-active") && this.showActiveMenu) {
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
		item.querySelectorAll(".m-parent").forEach(function(j) {
			j.querySelector("ul").classList.remove("m-visible");
			j.querySelector(".toggle").classList.remove("m-active");
		});
	}

	setupOverlay() {
		document.querySelectorAll("main-nav > ul > li.m-has-overlay > a").forEach(function(i) {
			const el = i.parentNode;

			// Close
			const close = document.createElement("div");
			close.classList.add("overlay-close");
			el.insertBefore(close, el.firstChild);
			
			close.addEventListener("click", function(e) {
				el.classList.remove("m-overlay-open");
				header.classList.remove("m-overlay-open");
			});

			// Nav clicked
			i.addEventListener("click", function(e) {
				if(!window.matchMedia("(min-width: " + Core.breakpoints.medium + ")").matches) {
					return false;
				}

				e.preventDefault();
				e.stopPropagation();

				// Clear all opened navs
				if(!el.classList.contains("m-overlay-open")) {
					document.querySelectorAll("#main-nav > ul > li.m-has-overlay").forEach(function(j) {
						j.classList.remove("m-overlay-open");
					});
				}

				// Toggle
				el.classList.toggle("m-overlay-open");
			});
		});
	}

	setupDoubleTapToGo(items, breakpoint) {
		var breakpoint = breakpoint || 0;
		
		if(!("ontouchstart" in window) && !navigator.msMaxTouchPoints && !navigator.userAgent.toLowerCase().match( /windows phone os 7/i )) {
			return false;
		}

		items.forEach(item => {
			var curItem = false;
			
			item.addEventListener("click", function(e) {
				if(window.matchMedia("(min-width: " + breakpoint + ")").matches) {
					if(item != curItem) {
						e.preventDefault();
						curItem = item;
					}
				}
			});

			["click", "touchstart", "MSPointerDown"].forEach(item2 => {
				document.addEventListener(item2, e => {
					if(window.matchMedia("(min-width: " + breakpoint + ")").matches) {
						var parents = [];
						var resetItem = true;
						var el = e.target;

						while(el.parentNode) {
							el = el.parentNode;
							parents.push(el);
						}

						for(var i = 0; i < parents.length; i++) {
							if(parents[i] == curItem) {
								resetItem = false;
							}
						}

						if(resetItem) {
							curItem = false;
						}
					}
				});
			});
		});
	}
}