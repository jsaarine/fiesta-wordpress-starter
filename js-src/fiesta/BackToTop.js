class BackToTop {

	constructor(el) {
		this.el = el;

		this.build();
	}

	build() {
		this.el.addEventListener("click", e => {
			window.scroll({
				top: 0,
				behavior: "smooth"
			});
		});

		this.update();

		window.addEventListener("scroll", e => {
			this.update();
		});
	}

	update() {
		if(Core.scrollTop() > 100) {
			this.el.classList.add("m-active");
		}
		else {
			this.el.classList.remove("m-active");
		}
	}
}