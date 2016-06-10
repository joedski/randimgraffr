// this prevents any overhead from creating the object each time
var element = document.createElement('div');

// regular expression matching HTML entities
var entity = /&(?:#x[a-f0-9]+|#[0-9]+|[a-z0-9]+);?/ig;

export default function decodeHTMLEntities(str) {
	// find and replace all the html entities
	str = str.replace(entity, function(m) {
		element.innerHTML = m;
		return element.textContent;
	});

	// reset the value
	element.textContent = '';

	return str;
}
