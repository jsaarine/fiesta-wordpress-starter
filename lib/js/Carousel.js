class Carousel extends Component {

	constructor(el, options) {
		super(el);

		this.el = el;
		this.dots = this.el.querySelector(".carousel-dots");
		this.nav = this.el.querySelector(".carousel-nav");
		this.progress = this.el.querySelector(".carousel-progress");
		this.options = {};

		for(let i in options) {
			if(options.hasOwnProperty(i)) {
				this.options[i] = options[i];
			}
		}

		// Runs when slide transition begins
		this.options.callback = () => {
			this.updateControl();

			if(options.callback) {
				options.callback();
			}
		};

		this.options.transitionEnd = () => {
			this.setProgressInterval();

			if(options.transitionEnd) {
				options.transitionEnd();
			}
		};

		this.swipe = Swipe(el.querySelector(".swipe"), this.options);

		const num = this.swipe.getNumSlides();

		// Exit when just 1 slide
		if(num == 1) {
			if(this.nav) {
				this.nav.style.display = "none";
			}

			if(this.dots) {
				this.dots.style.display = "none";
			}

			return false;
		}

		// Dots
		if(this.dots) {
			for(let i = 0; i < num; i++) {
				const item = document.createElement("button");
				item.addEventListener("click", this.onClickControl(i));

				this.dots.appendChild(item);
			}
		}

		// Nav
		const next = this.el.querySelector(".carousel-next");
		const prev = this.el.querySelector(".carousel-prev");

		if(next) {
			next.addEventListener("click", e => {
				this.swipe.next();
			});
		}

		if(prev) {
			prev.addEventListener("click", e => {
				this.swipe.prev();
			});
		}

		// Keyboard nav
		this.el.addEventListener("keyup", e => {
			let key = e.which || e.keyCode;

			if(key == 39) {
				this.swipe.next();
			}

			if(key == 37) {
				this.swipe.prev();
			}
		});

		// Mouseenter/mouseleave
		if(this.options.stopOnMouseEnter && !this.progress) {
			// Stop on mouseenter
			this.el.addEventListener("mouseenter", e => {
				this.swipe.stop();
				// this.clearProgressInterval(true);
			});

			// Restart on mouseleave
			this.el.addEventListener("mouseleave", e => {
				this.swipe.restart();
				// this.setProgressInterval();
			});
		}

		// Stop on focus
		this.el.querySelectorAll("button, a, input").forEach(item => {
			item.addEventListener("focus", e => {
				this.swipe.stop();
			});
		});

		this.update((options.startSlide || 0) + 1, true);
	}

	static setup(arr, options) {
		return super.setup(arr, Carousel, "[data-carousel]", options);
	}

	updateControl() {
		this.update(this.swipe.getPos() + 1);
	}

	update(num, first) {
		// Video
		this.el.querySelectorAll(".swipe-wrap video").forEach(i => {
			i.pause();
			i.currentTime = 0;
		});

		const slides = this.el.querySelector(".swipe-wrap").children;
		const el = slides[num - 1];
		const video = el.querySelector("video");

		if(video) {
			video.play();
		}

		// ARIA
		[].slice.call(slides).forEach((item, i) => {
			item.setAttribute("aria-hidden", i != num - 1 ? true : false);
		});

		// Set active dot
		this.el.querySelectorAll(".carousel-dots > button").forEach(i => {
			i.className = "";
		});

		if(this.dots) {
			this.el.querySelector(".carousel-dots > button:nth-child(" + (num) + ")").classList.add("active");
		}

		// Clear interval
		this.clearProgressInterval();

		// Set interval for first slide
		if(first) {
			this.setProgressInterval();
		}
	}

	clearProgressInterval(reset) {
		if(this.progress && this.interval) {
			clearInterval(this.interval);
			this.progress.style.width = "100%";
		}
	}

	setProgressInterval() {
		if(this.progress) {
			let time = 0;
			const interval = 20;
			const refDate = new Date().getTime();

			this.interval = setInterval(() => {
				const date = new Date().getTime();
				const elapsed = date - refDate;
				let pct = Math.min(elapsed / (this.options.auto), 1);

				// Update progress
				this.progress.style.width = (pct * this.el.offsetWidth) + "px";
			}, interval);
		}
	}

	getSwipe() {
		return this.swipe;
	}

	onClickControl(i) {
		return e => {
			this.update(i + 1);
			this.swipe.slide(i);
		};
	}
}
