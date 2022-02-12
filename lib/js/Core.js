/**
 * Select and return an element
 */
function Core(selector, container) {
	return typeof selector === "string"? (container || document).querySelector(selector) : selector || null;
}

/**
 * Select and return an array of elements
 */
Core.$$ = (selector, container) => {
	return typeof selector === "string"? (container || document).querySelectorAll(selector) : selector || null;
};

/**
 * DOM ready callback function
 */
Core.ready = fn => {
	document.addEventListener("DOMContentLoaded", fn);
};

/**
 * Get the index of an element within its parent
 */
Core.index = el => {
	let index = 0;

	while(el = el.previousElementSibling) {
		index++;
    }

	return index;
};

/**
 * Triggers an event on an element
 */
Core.trigger = (el, name) => {
	const event = document.createEvent("HTMLEvents");
	event.initEvent(name, true, false);
	el.dispatchEvent(event);
};

/**
 * Animate an element using css transitions
 */
Core.animate = (el, duration, props) => {
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
Core.slideToggle = (el, complete) => {
	let height = el.offsetHeight;
	let padding = parseInt(getComputedStyle(el)["padding-top"], 10) + parseInt(getComputedStyle(el)["padding-bottom"], 10);

	// Slide up
	if(height - padding > 0) {
		el.style.height = height + "px";

		void el.offsetWidth;

		el.style.height = "0";
		el.addEventListener("transitionend", onEndHide);
	}
	// Slide down
	else {
		el.style.height = "auto";
		height = el.offsetHeight;
		el.style.height = "0";
		el.style.visibility = "visible";

		void el.offsetWidth;

		el.style.height = height + "px";
		el.addEventListener("transitionend", onEndShow);
	}

	function onEndHide() {
		el.style.visibility = "hidden";

		el.removeEventListener("transitionend", onEndHide);

		if(complete) {
			complete();
		}
	}

	function onEndShow() {
		if(el.offsetHeight - padding > 0) {
			el.style.height = "auto";
		}

		el.removeEventListener("transitionend", onEndShow);

		if(complete) {
			complete();
		}
	}
};

/**
 * Trap focus inside an element
 */
Core.trapFocus = el => {
	let focusableElements = [].slice.call(el.querySelectorAll("button, [href], input, select, textarea, [tabindex='0']"));
	focusableElements = focusableElements.filter(item => item.getAttribute("tabindex") != "-1");

	const firstFocusableElement = focusableElements[0];
	const lastFocusableElement = focusableElements[focusableElements.length - 1];

	el.addEventListener("keydown", function(e) {
		var key = e.which || e.keyCode;

		if(key != 9) {
			return;
		}

		if(e.shiftKey) {
			if(document.activeElement === firstFocusableElement) {
				lastFocusableElement.focus();
				e.preventDefault();
			}
		} else {
			if(document.activeElement === lastFocusableElement) {
				firstFocusableElement.focus();
				e.preventDefault();
			}
		}
	});
}

// Add global shortcuts $ and $$
if(!(typeof $ != "undefined")) {
	const $ = Core;
}

const $$ = Core.$$;
