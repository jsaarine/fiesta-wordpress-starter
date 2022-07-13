class Header {

	constructor(el) {
		this.el = el;
		this.threshold = 0;

		this.build();
	}

	/*
	 * Build the header
	 */
	build() {
		window.addEventListener("scroll", e => {
			this.update();
		});

		this.update();
	}

	update() {
		const top = document.documentElement.scrollTop;

		// Small (header is visible but smaller when scrolling)
		if(top > this.threshold) {
			this.el.classList.add("small");
		}
		else {
			this.el.classList.remove("small");
		}
	}
}
