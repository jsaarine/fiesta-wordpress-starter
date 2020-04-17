class Search {

	constructor(el) {
		this.el = el;
		this.loader = this.el.querySelector(".c-loader");

		this.build();
	}

	build() {
		this.list = document.createElement("ul");
		this.list.setAttribute("role", "listbox");
		this.el.querySelector(".results").appendChild(this.list);

		// Input
		this.el.querySelector("input").addEventListener("input", e => {
			this.search(e.target.value);
		});

		// Reset
		this.el.querySelector(".reset").addEventListener("click", e => {
			this.el.querySelector("input").value = "";
			this.clear();
		});

		// Arrow keys
		this.el.addEventListener("keydown", e => {
			let key = e.which || e.keyCode;
			console.log(key);

			// Down
			if(key == 40) {
				
			}

			// Up
			if(key == 38) {
				
			}
		});
	}

	search(keyword) {
		const url = "../api/search.php?q=" + keyword;

		if(this.timeout) {
			clearTimeout(this.timeout);	
		}

		this.timeout = setTimeout(() => {
			if(keyword.length > 2) {
				fetch(url).then(response => {
					return response.json();
				}).then(data => {
					this.success(data);
				}).catch(err => {
					this.error(err);
				});

				this.loader.classList.add("m-active");
			}
		}, 500);


		if(keyword.length == 0) {
			this.clear();
		}
		else {
			this.el.querySelector(".reset").classList.add("m-active");
		}
	}

	success(data) {
		console.log(data);
		this.loader.classList.remove("m-active");
		if(data.results.length > 0) {
			data.results.forEach(item => {
				console.log(item);
				const data = item;
				const li = document.createElement("li");
				li.setAttribute("role", "option");
				li.setAttribute("aria-selected", "false");
				this.list.appendChild(li);
				
				li.innerHTML = '<div>id: ' + data.id + ", name: " + data.name + '</div>';
			});
		}
	}

	error(error) {
		console.error(error);
	}

	clear() {
		this.el.querySelector(".reset").classList.remove("m-active");

		while(this.list.firstChild) {
		    this.list.removeChild(this.list.firstChild);
		}
	}
}