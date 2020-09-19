class Header {

	constructor(el) {
		this.el = el;
		this.oldScroll = 0;
		this.firstLoad = true;
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

	/**
	 * Update the header based on scroll position
	 */
	update() {
		const top = Core.scrollTop();

		// Small (header is visible but smaller when scrolling)
		if(top > this.threshold) {
			this.el.classList.add("small");
		}
		else {
			this.el.classList.remove("small");
		}

		// Hidden (header is hidden when scrolling down)
		if(Math.abs(top - this.oldScroll) > 0) {
			if(this.oldScroll > top) {
				this.el.classList.remove("hidden");
			}
			else {
				if(top > this.threshold && !this.firstLoad) {
					this.el.classList.add("hidden");
				}
			}

			this.oldScroll = top;
		}

		this.firstLoad = false;
	}
}
