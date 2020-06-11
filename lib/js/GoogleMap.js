class GoogleMap extends Component {

	constructor(el, settings) {
		super(el);

		this.settings = {
			filter: true
		}

		this.init(settings);

		this.markers = [];
		this.filters = [];

		this.styles = [
		    {
		        "featureType": "administrative",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "administrative.country",
		        "elementType": "geometry.stroke",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "administrative.province",
		        "elementType": "geometry.stroke",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "landscape",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "visibility": "on"
		            },
		            {
		                "color": "#e3e3e3"
		            }
		        ]
		    },
		    {
		        "featureType": "landscape.natural",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "poi",
		        "elementType": "all",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "road",
		        "elementType": "all",
		        "stylers": [
		            {
		                "color": "#cccccc"
		            }
		        ]
		    },
		    {
		        "featureType": "road",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "transit",
		        "elementType": "labels.icon",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "transit.line",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "transit.line",
		        "elementType": "labels.text",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "transit.station.airport",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "transit.station.airport",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "elementType": "geometry",
		        "stylers": [
		            {
		                "color": "#FFFFFF"
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    }
		];

		google.maps.event.addDomListener(window, "load", this.init.bind(this));

		if(this.settings.filter) {
			var mapFilter = new Filter(document.querySelector("[data-filter]"));

			mapFilter.addEventListener("change", e => {
				this.filters = e.detail.filters;
				this.filter();
			});	
		}
	}

	static setup(arr) {
		return super.setup(arr, GoogleMap, "[data-google-map]");
	}

	init() {
		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		const mapOptions = {
			// How zoomed in you want the map to start at (always required)
			zoom: 7,

			// The latitude and longitude to center the map (always required)
			center: new google.maps.LatLng(60.8695821, 21.8581337),

			// How you would like to style the map. 
			// This is where you would paste any style found on Snazzy Maps.
			styles: this.styles
		};

		// Get the HTML DOM element that will contain your map 
		// We are using a div with id="map" seen below in the <body>
		const mapElement = this.el;

		// Create the Google Map using our element and options defined above
		const map = new google.maps.Map(mapElement, mapOptions);
		const markers = [];

		// Turku
		/*let marker = new google.maps.Marker({
			position: new google.maps.LatLng(60.451812, 22.266631),
			map: map,
			title: 'Turku',
			label: {
				text: 'Turku',
			},
			icon: {
				url: '/resources/images/map-marker.svg',
				labelOrigin: new google.maps.Point(11, 40)
			}
		});

		markers.push(marker);*/

		this.load(map);
	}

	load(map) {
		var url = "json/map.json";

		Core.fetch(url, {
			callback: cb,
			errorCallback: ecb,
			method: "GET", // GET or POST
			data: "",
			headers: {"Content-Type":"application/x-www-form-urlencoded"},
			dataType: "json" // json or text (default)
		});

		var t = this;

		function cb(data) {
			data.forEach(i => {
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(i.latitude, i.longitude),
					map: map,
					cat: i.area,
					title: i.title,
					tooltip: '<p> test </p>',
					label: {
						fontSize: "10px",
						text: String(i.title),
					},
					icon: {
						url: '../images/map-marker.svg',
						labelOrigin: new google.maps.Point(11, 40)
					},
					url: i.site,
					properties: i.properties
				});

				t.add(marker);

				var contentString = '<div>'+
				// '<img src="/resources/images/temp/tooltip-image.jpg" alt="">'+
		        '<h2 style="margin-top: 1em;" id="firstHeading" class="firstHeading">' + i.title + '</h2>'+
		        '<div id="bodyContent">'+
		        '<p>'+ i.meta +'' +
		        '</div>'+
		        '</div>';

			    var infowindow = new google.maps.InfoWindow({
			      content: contentString
			    });

				marker.addListener('click', function() {
					infowindow.open(map, marker);
				});
			});
		}

		function ecb() {

		}
	}

	add(marker) {
		this.markers.push(marker);

		// google.maps.event.addListener(marker, 'click', function() {

		// });
	}

	filter() {
		this.markers.forEach(i => {
			let show = false;

			if(this.filters.length == 0) {
				show = true;
			}

			this.filters.forEach(j => {
				if(i.properties) {
					i.properties.filters.forEach(k => {
						if(j == k) {
							show = true;
						}
					});
				}
				else {
					show = false;
				}

			});

			i.setVisible(show);
		});
	}
}