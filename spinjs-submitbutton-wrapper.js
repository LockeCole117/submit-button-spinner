(function(){

	//from: http://www.quirksmode.org/dom/getstyles.html
	function getStyle(element,styleProp)
	{
		var style = element.style[styleProp];
		if(style == ''){
			if (element.currentStyle)
				style = element.currentStyle[styleProp];
			else if (window.getComputedStyle)
				style = document.defaultView.getComputedStyle(element,null).getPropertyValue(styleProp);
		}
		return style;
	}

	//from spin.js
	function merge(object_1, object_2){
		var object_3 = object_1;
		for (var n in object_2){
			object_3[n] = object_2[n];
		}
    return object_3;
	}

	function startSpinner(element,options){
		var parent = element.parentNode;
		var wrapper = document.createElement('div');
		wrapper.style.display='inline-block';
		wrapper.setAttribute('data-is-submit-wrapper', 1);

		var text_color = getStyle(element, 'color');
		element.setAttribute('data-text-color', text_color);
		element.style.color='transparent'

		// set the wrapper as child (instead of the element)
		parent.replaceChild(wrapper, element);
		// set element as child of wrapper
		wrapper.appendChild(element);

		var button_height = element.offsetHeight;
		var button_width  = element.offsetWidth;
		var number_of_lines = Math.floor(button_height/5);
		if(number_of_lines < 9){
			number_of_lines = 9
		} else if(number_of_lines > 17){
			number_of_lines = 17;
		}

		var width = Math.ceil(button_height/8);
		if(width > 4){
			width = 4;
		}

		var length = (button_height/10);
		var radius = (button_height/5);

		if((radius * 2) >= (button_width - 10)){
			radius = (button_width - 10)/4;
			length -= 5;
		}

		var default_options = {
			radius: radius,
			length: length,
			lines: 	number_of_lines,
			width: 	width,
			color: text_color
		}

		return Spinner(merge(default_options, options)).spin(wrapper);
	}

	function stopSpinner(element){
		var wrapper = element.parentNode;
		var text_color = element.getAttribute('data-text-color');
		if(wrapper.getAttribute('data-is-submit-wrapper') !== null){
			var parent 	= wrapper.parentNode;
			// set the element as child (instead of the wrapper)
			parent.replaceChild(element, wrapper);
		}
		element.style.color = text_color;
	}

	SubmitButtonWrapper = { startSpinner : startSpinner, stopSpinner : stopSpinner }
})();