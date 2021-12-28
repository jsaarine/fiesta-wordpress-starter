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
			rootMargin: "2px 0px 0px 0px"
		};

		if("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "isIntersecting" in window.IntersectionObserverEntry.prototype) {
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
}
