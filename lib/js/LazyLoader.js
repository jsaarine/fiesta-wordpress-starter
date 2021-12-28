class LazyLoader {

	constructor(assets) {
		this.assets = [];

		assets.forEach(item => {
			this.addAsset(item);
		});

		this.build();
	}

	build() {
		if("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "isIntersecting" in window.IntersectionObserverEntry.prototype) {
			const observer = new IntersectionObserver(entries => {
				entries.forEach(item => {
					if(item.isIntersecting) {
						observer.unobserve(item.target);
						this.load(item.target);
					}
				});
			});

			this.assets.forEach(item => {
				observer.observe(item.element);
			});
		}
		else {
			this.assets.forEach(item => {
			 	this.load(item.element);
			});
		}
	}

	load(el) {
		switch(el.tagName) {
			case "PICTURE":
				this.loadPicture(el);
				break;
			case "IMG":
				this.loadImg(el);
				break;
			case "VIDEO":
				this.loadVideo(el);
				break;
			case "DIV":
				this.loadBackground(el);
				break;
			case "IFRAME":
				this.loadIframe(el);
				break;
		}
	}

	loadImg(el) {
		el.setAttribute("src", el.getAttribute("data-src"));
		el.setAttribute("data-src", "");
	}

	loadPicture(el) {
		const source = el.querySelector("source");

		source.setAttribute("srcset", source.getAttribute("data-srcset"));
		source.setAttribute("data-srcset", "");
	}

	loadVideo(el) {
		const source = el.querySelector("source");

		source.setAttribute("src", source.getAttribute("data-src"));
		source.setAttribute("data-src", "");
		el.load();
	}

	loadBackground(el) {
		el.style.backgroundImage = "url(" + el.getAttribute("data-src") + ")";
		el.setAttribute("data-src", "");
	}

	loadIframe(el) {
		el.setAttribute("src", el.getAttribute("data-src"));
		el.setAttribute("data-src", "");
	}

	addAsset(el, offset) {
		const obj = {};
		obj.element = el;
		obj.loaded = false;
		// obj.offset = offset;

		this.assets.push(obj);
	}
}
