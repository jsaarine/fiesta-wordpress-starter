/**
 * Select and return an element
 */
function Core(selector, container) {
	return typeof selector === "string"? (container || document).querySelector(selector) : selector || null;
}

/**
 * Setup sass breakpoits
 */
Core.setup = function() {
	this.ready(() => {
		this.breakpoints = {
			smallMax: this.getVariable("breakpoints-small-max"),
			medium: this.getVariable("breakpoints-medium"),
			mediumMax: this.getVariable("breakpoints-medium-max"),
			large: this.getVariable("breakpoints-large"),
			largeMax: this.getVariable("breakpoints-large-max"),
			xlarge: this.getVariable("breakpoints-xlarge")
		};
	});
};

/**
 * Select and return an array of elements
 */
Core.$$ = function(selector, container) {
	return typeof selector === "string"? (container || document).querySelectorAll(selector) : selector || null;
};

/**
 * DOM ready callback function
 */
Core.ready = function(fn) {
	if(document.readyState !== "loading") {
		fn();
	}
	else {
		document.addEventListener("DOMContentLoaded", fn);
	}
};

/**
 * Initialize a sass variable for use in JavaScript
 */
Core.initVariable = function(name) {
	const el = document.querySelector("head").appendChild(document.createElement("meta"));
	el.classList.add(name);
};

/**
 * Get the value of a sass variable
 */
Core.getVariable = function(name) {
    if(document.querySelector("meta." + name) == null) {
        this.initVariable(name);
    }

    const getCompStyle = getComputedStyle(document.querySelector("meta." + name));

    if(getCompStyle && getCompStyle["font-family"]) {
        return getCompStyle["font-family"].replace(/["']/g, "");
    }
};

/**
 * Scroll to an element
 */
Core.scrollTo = function(el, options) {
	const offset = !options || options.offset === undefined ? 0 : options.offset;
	const onScreen = !options ||  options.onScreen === undefined ? false : options.onScreen;
	const top = el.getBoundingClientRect().top;

	if(!onScreen || (top < offset || top > window.innerHeight)) {
		let pos = top + Core.scrollTop() - offset;

		window.scroll({top: pos, left: 0, behavior: "smooth"});
	}
};

/**
 * Get the distance in pixels to the top of the page
 */
Core.scrollTop = function() {
	return document.documentElement.scrollTop || document.body.scrollTop;
};

/**
 * Get the index of an element whithin its parent
 */
Core.index = function(el) {
	let index = 0;

	while(el = el.previousElementSibling) {
		index++;
    }

	return index;
};

/**
 * Triggers an event on an element
 */
Core.trigger = function(el, name) {
	const event = document.createEvent("HTMLEvents");
	event.initEvent(name, true, false);
	el.dispatchEvent(event);
};

/**
 * Animate an element using css transitions
 */
Core.animate = function(el, duration, props) {
	const old = el.style.transition;
	let transition = "";
	let count = 0;
	let counter = 0;
	const easing = props.ease || "linear";
	const delay = props.delay || 0;
	const complete = props.complete || null;

	for(let key in props) {
		if(key == "ease" || key == "delay" || key == "complete") {
			delete props[key];
			continue;
		}

		const str = key.replace(/([a-z])([A-Z])/g, "$1-$2");
		const tmp = str.toLowerCase() + " " + duration + "s " + easing + " " + delay + "s, ";

		transition += tmp;
		count++;
	}

	el.style.transition = transition.substring(0, transition.length - 2);

	for(let key in props) {
		const str = key.replace(/([a-z])([A-Z])/g, "$1-$2");

		el.style[key] = props[key];
	}

	el.addEventListener("transitionend", end);

	const t = setTimeout(end2, duration * 1000 + delay * 1000 + 50);

	function end(e) {
		if(++counter < count || e.target != e.currentTarget) {
			return false;
		}

		clearTimeout(t);
		counter = 0;
		end2();
	}

	function end2() {
		el.removeEventListener("transitionend", end);
		el.style.transition = old;

		if(complete) {
			complete.call();
		}
	}
};

/**
 * Show or hide an element with a slide animation
 */
Core.slideToggle = function(el) {
	let height = el.offsetHeight;
	// var padding = parseInt(getComputedStyle(el)["padding-top"], 10) + parseInt(getComputedStyle(el)["padding-bottom"], 10);

	if(height > 0) {
		el.style.height = height + "px";

		void el.offsetWidth;

		el.style.height = "0";
	}
	else {
		el.style.height = "auto";
		height = el.offsetHeight;
		el.style.height = "0";

		void el.offsetWidth;

		el.style.height = height + "px";
		el.addEventListener("transitionend", onEnd);
		el.addEventListener("webkitTransitionEnd", onEnd);
	}

	function onEnd() {
		if(el.offsetHeight > 0) {
			el.style.height = "auto";
		}

		el.removeEventListener("transitionend", onEnd);
		el.removeEventListener("webkitTransitionEnd", onEnd);
	}
};

// Initialize Core
Core.setup();

// Add global shortcuts $ and $$
if(!(typeof $ != "undefined")) {
	var $ = Core;
}

const $$ = Core.$$;
