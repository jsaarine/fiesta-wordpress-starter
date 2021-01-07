class Header {

	constructor(el) {
		this.el = el;

		this.build();
	}

	/*
	 * Build the header
	 */
	build() {
		const options = {
			rootMargin: "5px 0px 0px 0px"
		};

		const observer = new IntersectionObserver(entries => {
			entries.forEach(item => {
				if(item.isIntersecting) {
					this.el.classList.remove("small");
				} else {
					this.el.classList.add("small");
				}
			});
		}, options);

		observer.observe(this.el);
	}
}
