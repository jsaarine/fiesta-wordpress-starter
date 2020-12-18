class Overlay extends Component {

	constructor(el, settings) {
		super(el);

		// Settings
		this.settings = {
			history: false
		};

		this.init(settings);

		this.buttons = [];
		this.backHandler = this.back.bind(this);
		this.focusHandler = this.focus.bind(this);
		this.focusEvent = false;

		document.querySelectorAll("[data-overlay-button='" + this.el.getAttribute("id") + "']").forEach(i => {
			this.buttons.push(i);
		});

		this.build();
	}

	static setup(arr) {
		return super.setup(arr, Overlay, "[data-overlay]");
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
			let key = e.which || e.keyCode;

			if(key == 27) {
				if(this.el.classList.contains("active")) {
					this.close(true);
				}
			}
		});

		// Video overlay
		if(this.el.getAttribute("data-overlay-type") == "video") {
			var iframe = this.el.querySelector("iframe");
			this.player = new Vimeo.Player(iframe);
		}

		// Focus trapping
		Core.trapFocus(this.el);
	}

	open(push) {
		if(this.settings.history) {
			if(push !== false) {
				window.history.pushState({ url: this.el.getAttribute("data-url") }, "", this.el.getAttribute("data-url"));
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

		// Set focus on overlay when window gets focus
		window.addEventListener("focus", this.focusHandler);
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
	}

	focus() {
		if(this.el.classList.contains("active") && document.activeElement !== this.el) {
			this.el.focus();
		}
	}

	back() {
		this.close(false);
	}
}
