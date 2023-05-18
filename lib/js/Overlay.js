class Overlay {

	constructor(el, settings) {
		this.el = el;

		// Settings
		this.settings = {
			history: false
		};

		this.buttons = [];
		this.backHandler = this.back.bind(this);

		document.querySelectorAll("[data-overlay-button='" + this.el.getAttribute("id") + "']").forEach(i => {
			this.buttons.push(i);
		});

		this.build();
	}

	build() {
		this.el.addEventListener("click", (e) => {
			if(e.target == e.currentTarget) {
				this.close(true);
			}
		});

		const close = this.el.querySelector(".overlay-close");

		close.addEventListener("click", (e) => {
			this.close(true);
		});

		this.buttons.forEach(i => {
			i.setAttribute("aria-controls", this.el.getAttribute("id"));
			i.addEventListener("click", (e) => {
				e.preventDefault();

				this.callingButton = i;
				this.open();
			});
		});

		// Esc key listener
		this.el.addEventListener("keydown", e => {
			if(e.key == "Escape") {
				if(this.el.classList.contains("active")) {
					this.close(true);
				}
			}
		});

		// Video overlay
		if(this.el.getAttribute("data-overlay-type") == "video") {
			let iframe = this.el.querySelector("iframe");
			this.player = new Vimeo.Player(iframe);
		}
	}

	open(push) {
		if(this.settings.history) {
			if(push !== false) {
				window.history.pushState({ url: this.el.getAttribute("data-url")}, "", this.el.getAttribute("data-url"));
			}

			window.addEventListener("popstate", this.backHandler);
		}

		document.documentElement.classList.add("overlay-open");
		this.el.classList.add("active");
		this.el.scrollTop = 0;
		this.el.setAttribute("aria-hidden", false);
		this.el.focus();

		this.dispatchEvent("open");

		if(this.player) {
			this.player.play();
		}

		// Set inert
		Core.setInert(this.el, true);
	}

	close(back) {
		if(this.settings.history) {
			if(back) {
				window.history.back();
			}

			window.removeEventListener("popstate", this.backHandler);
		}

		document.documentElement.classList.remove("overlay-open");
		this.el.classList.remove("active");
		this.el.setAttribute("aria-hidden", true);
		this.el.blur();

		if(this.callingButton) {
			this.callingButton.focus();
		}

		this.dispatchEvent("close");

		if(this.player) {
			this.player.pause();
			this.player.setCurrentTime(0);
		}

		window.removeEventListener("focus", this.focusHandler);

		// Remove inert
		Core.setInert(this.el, false);
	}

	back() {
		this.close(false);
	}

	dispatchEvent(name, props) {
		this.el.dispatchEvent(new CustomEvent(name, props));
	}
}
