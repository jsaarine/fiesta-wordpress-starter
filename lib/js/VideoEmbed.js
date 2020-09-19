class VideoEmbed extends Component {

	constructor(el) {
		super(el);

		this.build();
	}

	static setup(arr) {
		return super.setup(arr, VideoEmbed, "[data-video-id]");
	}

	build() {
		const id = this.el.getAttribute("data-video-id");

		if(id) {
			const iframe = this.el.querySelector("iframe");
			const type = this.el.getAttribute("data-type");
			let prefix = "";

			if(type == "youtube") {
				prefix = "https://www.youtube.com/embed/";
			}
			else if(type == "vimeo") {
				prefix = "https://player.vimeo.com/video/";
			}
			else {
				console.warn("data-type is not defined");
			}

			if(prefix) {
				iframe.src += prefix + id + "?rel=0";
			}

			const play = this.el.querySelector(".play");

			if(play) {
				play.addEventListener("click", e => {
					this.el.classList.add("active");

					iframe.src += "&autoplay=1";
				});
			}
		}
	}
}
