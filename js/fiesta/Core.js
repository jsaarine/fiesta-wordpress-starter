function Core(selector, container) {
	return typeof selector === "string"? (container || document).querySelector(selector) : selector || null;
}

Core.setup = function() {
	this.ready(() => {
		this.breakpoints = {
			smallMax: this.getVariable("breakpoints-small-max"),
			medium: this.getVariable("breakpoints-medium"),
			mediumMax: this.getVariable("breakpoints-medium-max"),
			large: this.getVariable("breakpoints-large"),
			largeMax: this.getVariable("breakpoints-large-max"),
			xlarge: this.getVariable("breakpoints-xlarge")
		}
	});
}

Core.$$ = function(selector, container) {
	return typeof selector === "string"? (container || document).querySelectorAll(selector) : selector || null;
}

/*Core.$$ = function(selector, container) {
	return [].slice.call((container || document).querySelectorAll(selector));
	// return [].slice.call((container === undefined ? document : container).querySelectorAll(selector));
}*/

Core.ready = function(fn) {
	if(document.readyState !== "loading") {
		fn();
	}
	else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}

Core.initVariable = function(name) {
	var el = document.querySelector("head").appendChild(document.createElement("meta"));
	el.classList.add(name);
}

Core.getVariable = function(name) {
    if(document.querySelector("meta." + name) == null) {
        this.initVariable(name);
    }

    var getCompStyle = getComputedStyle(document.querySelector("meta." + name));

    if(getCompStyle && getCompStyle["font-family"]) {
        return getCompStyle["font-family"].replace(/["']/g, "");
    }
}

Core.scrollTo = function(el, options) {
	const offset = !options || options.offset === undefined ? 0 : options.offset;
	const onScreen = !options ||  options.onScreen === undefined ? false : options.onScreen;
	const top = el.getBoundingClientRect().top;

	if(!onScreen || (top < offset || top > window.innerHeight)) {
		let pos = top + Core.scrollTop() - offset;
		
		window.scroll({top: pos, left: 0, behavior: "smooth"});	
	}
}

Core.scrollTop = function() {
	return document.documentElement.scrollTop || document.body.scrollTop;
}

Core.index = function(el) {
	var index = 0;

	while(el = el.previousElementSibling) {
		index++;
    }
	
	return index;
}

Core.trigger = function(el, name) {
	var event = document.createEvent("HTMLEvents");
	event.initEvent(name, true, false);
	el.dispatchEvent(event);
};

Core.animate = function(el, duration, props) {
	var old = el.style.transition;
	var oldWebkit = el.style.webkitTransition;
	var transition = "";
	var webkitTransition = "";
	var count = 0;
	var counter = 0;
	var easing = props.ease || "linear";
	var delay = props.delay || 0;
	var complete = props.complete || null;

	for(var key in props) {
		if(key == "ease" || key == "delay" || key == "complete") {
			delete props[key];
			continue;
		}

		var str = key.replace(/([a-z])([A-Z])/g, "$1-$2");
		var tmp = str.toLowerCase() + " " + duration + "s " + easing + " " + delay + "s, ";

		transition += tmp;
		count++;

		if(str.slice(0, 9) == "transform") {
			str = "-webkit-" + str;
			webkitTransition += str.toLowerCase() + " " + duration + "s " + easing + " " + delay + "s, ";
		}
		else {
			webkitTransition += tmp;
		}
	}

	el.style.webkitTransition = webkitTransition.substring(0, webkitTransition.length - 2);
	el.style.transition = transition.substring(0, transition.length - 2);

	for(var key in props) {
		var str = key.replace(/([a-z])([A-Z])/g, "$1-$2");

		el.style[key] = props[key];

		if(str.slice(0, 9) == "transform") {
			el.style["-webkit-" + key] = props[key];
		}
	}

	el.addEventListener("transitionend", end);
	el.addEventListener("webkitTransitionEnd", end);

	var t = setTimeout(end2, duration * 1000 + delay * 1000 + 50);
	
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
		el.removeEventListener("webkitTransitionEnd", end);
		el.style.transition = old;
		el.style.webkitTransition = oldWebkit;

		if(complete) {
			complete.call();
		}
	}
}

Core.slideToggle = function(el) {
	var height = el.offsetHeight;
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
}

Core.createVideo = function(el) {
	const source = el.querySelector("source");

	source.setAttribute("src", source.getAttribute("data-src"));
	source.setAttribute("data-src", "");
	el.load();
}

// Initialize Core
Core.setup();

// Add global shortcuts
var $$ = Core.$$;

if(!(typeof $ != "undefined")) {
	var $ = Core;
}
