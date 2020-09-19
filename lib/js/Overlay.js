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
		let focusableElements = [].slice.call(this.el.querySelectorAll("button, [href], input, select, textarea, [tabindex='0']"));
		focusableElements = focusableElements.filter(item => item.getAttribute("tabindex") != "-1");

		const firstFocusableElement = focusableElements[0];
		const lastFocusableElement = focusableElements[focusableElements.length - 1];

		this.el.addEventListener("keydown", function(e) {
			var key = e.which || e.keyCode;

			if(key != 9) {
				return;
			}

			if(e.shiftKey) {
				if(document.activeElement === firstFocusableElement) {
					lastFocusableElement.focus();
					e.preventDefault();
				}
			} else {
				if(document.activeElement === lastFocusableElement) {
					firstFocusableElement.focus();
					e.preventDefault();
				}
			}
		});
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
	}

	back() {
		this.close(false);
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
	}
}
