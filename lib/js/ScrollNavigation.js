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
				// this.go(item.getAttribute("data-id"));
				this.go(Core.index(item.parentNode));
			});
		});

		// IntersectionObserver
		const options = {
			rootMargin: "-50% 0px -50% 0px"
		};

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

	update(target) {
		// Hide all buttons
		this.el.querySelectorAll("button").forEach(item2 => {
			item2.classList.remove("active");
		});

		if(target != null) {
			// var activeItem = this.el.querySelector("button[data-id='" + target.getAttribute("data-id") + "']");
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
		// var target = this.contentItems.filter(item => item.getAttribute("data-id") == id)[0];
		var target = this.contentItems.filter(item => Core.index(item) == id)[0];


		this.targetPosition = target.getBoundingClientRect().top + Core.scrollTop();

		// Core.scrollTo(target);

		Jump(target, {
			duration: 1000,
			offset: 0,
			callback: () => {
				target.focus();
			},
			// easing: easeInOutQuad,
		});
	}
}
