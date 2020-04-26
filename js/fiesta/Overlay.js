class Overlay extends Component {

	constructor(el, settings) {
		super(el);

		// Settings
		this.settings = {
			history: false
		}

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
		// const background = document.createElement("div");
		// background.classList.add("overlay-background");
		// this.el.appendChild(background);

		// background.addEventListener("click", (e) => {
		// 	this.close(true);
		// });

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
			i.setAttribute("data-controls", this.el.getAttribute("id"));
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
				if(this.el.classList.contains("m-active")) {
					this.close(true, true);
				}
			}
		});

		// Video overlay
		if(this.el.getAttribute("data-overlay-type") == "video") {
			var iframe = this.el.querySelector("iframe");
			this.player = new Vimeo.Player(iframe);
		}
	}

	open(push) {
		if(this.settings.history) {
			if(push !== false) {
				window.history.pushState({ url: this.el.getAttribute("data-url") }, "", this.el.getAttribute("data-url"));
			}

			window.addEventListener("popstate", this.backHandler);	
		}

		document.documentElement.classList.add("m-overlay-open");
		this.el.classList.add("m-active");
		this.el.scrollTop = 0;
		this.el.setAttribute("aria-hidden", false);
		this.el.focus();

		this.dispatchEvent("open");

		if(this.player) {
			this.player.play();
		}

		// Inert WIP
		// if(this.el.parentNode == document.body) {
		// 	[].slice.call(document.body.children).forEach(item => {
		// 		if(item !== this.el && item.tagName != "SCRIPT") {
		// 			item.inert = true;
		// 		}
		// 	});	
		// }
	}

	back() {
		this.close(false)
	}

	close(back, keyboard) {
		if(this.settings.history) {
			if(back) {
				window.history.back();
			}
		
			window.removeEventListener("popstate", this.backHandler);
		}

		document.documentElement.classList.remove("m-overlay-open");
		this.el.classList.remove("m-active");
		this.el.setAttribute("aria-hidden", true);
		this.el.blur();

		if(keyboard) {
			this.callingButton.focus();
		}

		this.dispatchEvent("close");

		if(this.player) {
			this.player.pause();
			this.player.setCurrentTime(0);
		}

		// Inert WIP
		// if(this.el.parentNode == document.body) {
		// 	[].slice.call(document.body.children).forEach(item => {
		// 		item.inert = false;
		// 	});
		// }
	}
}