class Scroller extends Component {

	constructor(el) {
		super(el);

		this.slider = this.el.querySelector(".items");

		this.build();
	}

	build() {
		const div = this.el.querySelector(".items > div");
		let isDown = false;
		let startX;
		let currentX;
		let scrollLeft;

		this.slider.addEventListener("mousedown", e => {
			isDown = true;
			this.slider.classList.add("active");
			startX = e.pageX - this.slider.offsetLeft;
			currentX = startX;
			scrollLeft = this.slider.scrollLeft;

			e.preventDefault();
		});

		this.slider.addEventListener("click", e => {
			if(Math.abs(startX - currentX) > 0) {
				e.preventDefault();
			}
		});

		this.slider.addEventListener("mouseleave", e => {
			isDown = false;
			this.slider.classList.remove("active");
		});

		this.slider.addEventListener("mouseup", e => {
			isDown = false;
			this.slider.classList.remove("active");

			e.preventDefault();
		});

		this.slider.addEventListener("mousemove", e => {
			if(!isDown) {
				return;
			}

			currentX = e.pageX - this.slider.offsetLeft;
			const walk = (currentX - startX) * 1;
			this.slider.scrollLeft = scrollLeft - walk;
		});

		// Navigation
		this.el.querySelector(".prev").addEventListener("click", e => {
			this.slider.scroll({
				left: this.slider.scrollLeft - (div.offsetWidth + parseInt(getComputedStyle(div)["marginRight"], 10)),
				behavior: "smooth"
			});
		});

		this.el.querySelector(".next").addEventListener("click", e => {
			this.slider.scroll({
				left: this.slider.scrollLeft + (div.offsetWidth + parseInt(getComputedStyle(div)["marginRight"], 10)),
				behavior: "smooth"
			});
		});

		this.updateScrollPosition();

		this.slider.addEventListener("scroll", e => {
			this.updateScrollPosition();
		});
	}

	updateScrollPosition() {
		const width = this.el.offsetWidth;
		const scrollWidth = this.slider.scrollWidth;

		if(this.slider.scrollLeft == 0) {
			this.el.classList.remove("left");
		}
		else {
			this.el.classList.add("left");
		}

		if(this.slider.scrollLeft >= scrollWidth - width) {
			this.el.classList.remove("right");
		}
		else {
			if(scrollWidth - width > 0) {
				this.el.classList.add("right");
			}
		}
	}
}
