class ScrollNavigation {

	constructor(el) {
		this.el = el;
		this.animating = false;
		this.targetPosition = null;
		this.contentItems = [].slice.call(document.querySelector("[data-scroll-navigation-content]").children);

		this.build();
	}

	build() {
		this.el.querySelectorAll("button").forEach(item => {
			item.addEventListener("click", e => {
				this.go(Core.index(item.parentNode));
			});
		});

		// IntersectionObserver
		const options = {
			rootMargin: "-50% 0px -50% 0px"
		};

		if("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "isIntersecting" in window.IntersectionObserverEntry.prototype) {
			const observer = new IntersectionObserver(entries => {
				entries.forEach(item => {
					if(item.isIntersecting) {
						this.update(item.target);
					}
				});
			}, options);

			this.contentItems.forEach(item => {
				observer.observe(item);
			});
		}
	}

	update(target) {
		// Hide all buttons
		this.el.querySelectorAll("button").forEach(item2 => {
			item2.classList.remove("active");
		});

		if(target != null) {
			var activeItem = this.el.children[Core.index(target)].querySelector("button");
			activeItem.classList.add("active");
		}
		else {
			this.el.querySelectorAll("button").forEach(item => {
				item.classList.remove("active");
		 	});
		}
	}

	go(id) {
		// this.animating = true;
		var target = this.contentItems.filter(item => Core.index(item) == id)[0];
		let duration = 1000;

		this.targetPosition = target.getBoundingClientRect().top + window.scrollY;

		if(window.matchMedia("(prefers-reduced-motion)").matches) {
			duration = 0;
		}

		Jump(target, {
			duration: duration,
			offset: 0,
			callback: () => {
				target.focus();
			},
		});
	}
}
