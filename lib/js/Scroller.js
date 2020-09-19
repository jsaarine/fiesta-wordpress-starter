class Scroller extends Component {

	constructor(el) {
		super(el);

		this.target = this.el.querySelector(".scroll-area");
		this.mouseTarget = this.el.querySelector(".scroll-area > div");
		this.nav = this.el.querySelector(".scroller-nav");
		this.internalScrollLeft = 0;
		this.pressed = false;

		this.build();
	}

	static setup(arr) {
		return super.setup(arr, Scroller, "[data-scroller]");
	}

	build() {
		// Dragging
		if(!app.mobile) {
			this.mouseTarget.addEventListener("mousedown", (e) => {
				this.mousedown(e);
				e.preventDefault();
				e.stopPropagation();
			});

			document.addEventListener("mousemove", (e) => {
				this.mousemove(e);
			});

			document.addEventListener("mouseup", (e) => {
				this.mouseup(e);
			});

			this.animate();

			this.target.addEventListener("mousedown", (e) => {
				this.active = false;
			});
		}

		// Nav
		if(this.nav) {
			const div = this.el.querySelector(".scroll-area > div > div");

			this.nav.querySelector(".prev").addEventListener("click", e => {
				this.active = false;

				this.target.scroll({
					left: this.target.scrollLeft - (div.offsetWidth + parseInt(getComputedStyle(div)["marginRight"], 10)),
					behavior: "smooth"
				});
			});

			this.nav.querySelector(".next").addEventListener("click", e => {
				this.active = false;

				this.target.scroll({
					left: this.target.scrollLeft + (div.offsetWidth + parseInt(getComputedStyle(div)["marginRight"], 10)),
					behavior: "smooth"
				});
			});
		}

		// Scroll position
		this.target.addEventListener("scroll", () => {
			this.updateScrollPosition();
		});

		window.addEventListener("resize", e => {
			this.updateScrollPosition();
		});

		window.addEventListener("load", e => {
			this.updateScrollPosition();
		});

		this.updateScrollPosition();

		// const images = $$("img", this.target);
		// let loaded = 0;

		// var t = this;

		// images.forEach(i => {
		// 	if(i.readyState !== "loading") {
		// 		imageLoaded();
		// 	}
		// 	else {
		// 		i.addEventListener("load", e => {
		// 			imageLoaded();
		// 		});
		// 	}

		// 	function imageLoaded() {
		// 		if(++loaded == images.length) {
		// 			t.updateScrollPosition();
		// 		}
		// 	}
		// });
	}

	updateScrollPosition() {
		const width = this.el.offsetWidth;
		const scrollWidth = this.target.scrollWidth;

		if(this.target.scrollLeft == 0) {
			this.el.classList.remove("left");
		}
		else {
			this.el.classList.add("left");
		}

		if(this.target.scrollLeft >= scrollWidth - width) {
			this.el.classList.remove("right");
		}
		else {
			if(scrollWidth - width > 0) {
				this.el.classList.add("right");
			}
		}
	}

	mousedown(e) {
		this.startX = e.clientX;
		this.xPos = 0;
		this.startScroll = this.target.scrollLeft;
		this.active = true;
		this.pressed = true;
	}

	mousemove(e) {
		if(this.pressed) {
			this.xPos = (e.clientX - this.startX);
		}
	}

	mouseup(e) {
		e.preventDefault();
		this.pressed = false;
	}

	animate() {
		requestAnimationFrame(this.animate.bind(this));

		if(this.active) {
			const targetLeft = (this.startScroll - this.xPos);
			const currentLeft = this.target.scrollLeft;
			const temp = (targetLeft - currentLeft) * 0.05;

			//if movement is small enough and mouse is no longer being pressed
			if (Math.abs(temp) < 0.1 && !this.pressed) {
			 	this.active = false;
			}
			this.target.scrollLeft += temp;
		}
	}
}
