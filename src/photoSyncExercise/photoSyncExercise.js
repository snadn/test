function group(photos) {
	var result = {};
	for(var i=0,n=photos.length; i<n; i++) {
		var photo = photos[i];
		var formatTime = DateH.format(new Date(photo.time), 'yyyy-MM-dd');
		if(typeof result[formatTime] === 'undefined') {
			result[formatTime] = [photo];
		} else {
			result[formatTime].push(photo);
		}
	}

	return result;
}

function getPhotoElement(photo, photoSize) {
	var img = document.createElement('image');
	var sizeKey = photo.width > photo.height ? 'width' : 'height';
	var sizeVal = photo.width > photo.height ? photo.width : photo.height;
	sizeVal > photoSize && (img.style[sizeKey] = photoSize + 'px');

	img.src = photo.imageURL;

	return img;
}

var g = function(id){
	return document.getElementById(id);
};

var DateH = {
	format: function(d, pattern) {
		pattern = pattern || 'yyyy-MM-dd';
		var y = d.getFullYear().toString(),
			o = {
				M: d.getMonth() + 1, //month
				d: d.getDate(), //day
				h: d.getHours(), //hour
				m: d.getMinutes(), //minute
				s: d.getSeconds() //second
			};
		pattern = pattern.replace(/(y+)/ig, function(a, b) {
			return y.substr(4 - Math.min(4, b.length));
		});
		for (var i in o) {
			pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function(a, b) {
				return (o[i] < 10 && b.length > 1) ? '0' + o[i] : o[i];
			});
		}
		return pattern;
	}
};

var getJsonp = function(url, callbackname, loadcallback) {
	var scriptEl = document.createElement('script');
	var symbol = url.indexOf('?') > -1 ? '&' : '?';
	scriptEl.src = url + symbol + 'callback=' + callbackname;
	typeof loadcallback == 'function' && (scriptEl.onload = loadcallback);
	document.getElementsByTagName('head')[0].appendChild(scriptEl);
};

var getDocRect = function(doc) {
	doc = doc || document;

	var win = doc.defaultView || doc.parentWindow,
		mode = doc.compatMode,
		root = doc.documentElement,
		h = win.innerHeight || 0,
		w = win.innerWidth || 0,
		scrollX = win.pageXOffset || 0,
		scrollY = win.pageYOffset || 0,
		scrollW = root.scrollWidth,
		scrollH = root.scrollHeight;

	if (mode != 'CSS1Compat') { // Quirks
		root = doc.body;
		scrollW = root.scrollWidth;
		scrollH = root.scrollHeight;
	}

	if (mode && window.navigator.userAgent.toLowerCase().indexOf('opera') === -1) { // IE, Gecko
		w = root.clientWidth;
		h = root.clientHeight;
	}

	scrollW = Math.max(scrollW, w);
	scrollH = Math.max(scrollH, h);

	scrollX = Math.max(scrollX, doc.documentElement.scrollLeft, doc.body.scrollLeft);
	scrollY = Math.max(scrollY, doc.documentElement.scrollTop, doc.body.scrollTop);

	return {
		width: w,
		height: h,
		scrollWidth: scrollW,
		scrollHeight: scrollH,
		scrollX: scrollX,
		scrollY: scrollY
	};
}