function extend(newObj ,oldObj){
    for(var key in oldObj){
        newObj[key] = oldObj[key];
    }
    return newObj;
}

function $(id){
    return document.getElementById(id);
}

function hide(elem){
    elem.style.display = 'none';
}

function show(elem){
    elem.style.display = '';
}

function hasClass(elem, className){
	return elem.className.indexOf(className) > -1;
}

function addClass(elem, className){
	if(!hasClass(elem, className)){
		elem.className += ' '+ className;
	}
}

function removeClass(elem, className){
	if(!hasClass(elem, className)){
		return;
	}
	var cls = elem.className.split(/\s+/);
	cls.splice(cls.indexOf(className), 1);
	elem.className = cls.join(' ');
}