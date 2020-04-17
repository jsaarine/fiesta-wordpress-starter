class Fader {

	constructor() {
		this.settings = {
			repeat: false
		}

		this.assets = [];
		this.observers = [];

		document.querySelectorAll("[class*='fade-']").forEach(i => {
			const delay = i.getAttribute("data-delay");
			const scroll = i.getAttribute("data-scroll") ? true : false;
			const obj = {};

			obj.el = i;
			obj.scroll = scroll;
			obj.offset = i.getAttribute("data-offset") ? parseInt(i.getAttribute("data-offset"), 10) : 0;

			if(delay) {
				obj.el.style.transitionDelay = i.getAttribute("data-delay") + "s";
			}

			this.assets.push(obj);
			
			// IntersectionObserver
			const options = {
				rootMargin: "0px 0px " + obj.offset + "px 0px"
			}

			const observer = new IntersectionObserver(entries => {
				entries.forEach(item => {
					if(item.isIntersecting) {
						// this.update(item.target);
						item.target.classList.add("fade-in");

						if(!this.settings.repeat) {
							observer.unobserve(item.target);
						}
					}
					else {
						if(this.settings.repeat) {
							item.target.classList.remove("fade-in");
						}
					}
				});
			}, options);

			observer.observe(i);
			this.observers.push(observer);
		});
	}

	/*

	update2(scroll) {
		this.assets.forEach(i => {
			if(i.scroll && !scroll) return;

			const el = i.el;
			const top = el.getBoundingClientRect().top;
			
			if(top + i.offset < this.windowHeight) {
				el.classList.add("fade-in");

				if(!this.settings.repeat) {
					const index = this.assets.indexOf(i);
					this.assets.splice(index, 1);
				}
			}
			else {
				if(this.settings.repeat) {
					el.classList.remove("fade-in");
				}
			}
		});

		if(this.assets.length == 0) {
			this.destroy();
		}
	}*/

	update(el) {
		el.classList.add("fade-in");
	}

	cancel() {
		this.destroy();
		
		this.assets.forEach(i => {
			i.el.classList.add("fade-in");
		});
	}

	destroy() {
		let i = 0;

		this.assets.forEach(item => {
			this.observers[i++].unobserve(item.el);
		});
	}
}