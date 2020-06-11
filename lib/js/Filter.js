class Filter extends Component {

	constructor(el, settings) {
		super(el);

		// Settings
		this.settings = {
			selectMultiple: true
		}

		this.init(settings);
		
		this.all = this.el.querySelector("button[data-id='all']");
		this.items = document.querySelector("[data-filter-items='" + el.getAttribute("data-filter") + "']");

		this.build();
	}

	static setup(arr) {
		return super.setup(arr, Filter, "[data-filter]");
	}

	build() {
		this.el.querySelectorAll("button").forEach(i => {
			i.addEventListener("click", e => {
				const id = i.getAttribute("data-id");

				// All
				if(id == "all") {
					i.classList.add("active");

					// Remove all
					this.el.querySelectorAll("button").forEach(j => {
						if(i != j) {
							j.classList.remove("active");
						}
					});
				}
				// Any other filter
				else {
					i.classList.toggle("active");

					if(this.settings.selectMultiple) {
						// Hide all button
						if(this.all) {
							this.all.classList.remove("active");
						}
					}
					else {
						// Hide all except current
						this.el.querySelectorAll("button").forEach(j => {
							if(i != j) {
								j.classList.remove("active");
							}
						});		
					}
				}
				
				// Update items
				this.update();
			});
		});

		this.update();
	}

	update() {
		const filters = [];

		// Update active filters
		this.el.querySelectorAll("button:not([data-id='all'])").forEach(i => {
			if(i.classList.contains("active")) {
				filters.push(i.getAttribute("data-id"));
			}
		});

		// Only run if items element exixts
		if(this.items) {
			// Filters applied, hide all items
			if(filters.length > 0) {
				this.items.querySelectorAll("[data-filter-item]").forEach(i => {
					i.classList.add("hidden");
				});
			}
			// No filters applied, show all items
			else {
				this.items.querySelectorAll("[data-filter-item]").forEach(i => {
					i.classList.remove("hidden");
				});

				if(this.all) {
					this.all.classList.add("active");
				}
			}

			// Show filtered items
			filters.forEach(filter => {
				this.items.querySelectorAll("[data-filter-item][data-id~='" + filter + "']").forEach(item => {
					item.classList.remove("hidden");
				});
				
			});
		}

		this.dispatchEvent("change", {detail: {filters: filters}});
	}
}
