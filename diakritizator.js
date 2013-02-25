diakritizator = {

	c : {
		'ā' : 'a', 		'Ā' : 'A', 
		'ī' : 'i', 		'Ī' : 'I',
		'ū' : 'u', 		'Ū' : 'U',
		'ḍ' : 'd', 		'Ḍ' : 'D',
		'ḥ' : 'h', 		'Ḥ' : 'H',
		'ḷ' : 'l', 		'Ḷ' : 'L',
		'ḹ' : 'l', 		'Ḹ' : 'L',
		'ṁ' : 'm', 		'Ṁ' : 'M',
		'ṅ' : 'n', 		'Ṅ' : 'N',
		'ṇ' : 'n', 		'Ṇ' : 'N',
		'ñ' : 'n', 		'Ñ' : 'N',
		'ṛ' : 'ri', 	'Ṛ' : 'R',
		'ṝ' : 'r', 		'Ṝ' : 'R',
		'ṣ' : 's', 		'Ṣ' : 'S',
		'ś' : 's', 		'Ś' : 'S',
		'ṭ' : 't',  	'Ṭ' : 'T'},
	
	visszacserelt : {},

	init : function(){
		var cserelt = $$('.c');
		cserelt.each(function(elem){
			Event.observe(elem, 'click', diakritizator.visszacsere);
			Event.observe(elem, 'mouseover', diakritizator.addTitle);
		});
	},

	addTitle : function(e){
		var elem = e.target;
		elem.title = 'Szó cseréje erre: ';
		if(elem.hasClassName('c'))
			elem.title += '"' + diakritizator.removeDiakritiks(elem.textContent) + '"';
		else if(elem.hasClassName('v'))
			elem.title += '"' + diakritizator.putbackDiakritiks(elem.textContent) + '"';
	},
	
	removeDiakritiks : function(text){
		var k;
		var re;
		for(k in diakritizator.c){
			re = new RegExp(k,"g");
			text = text.replace(re, diakritizator.c[k]);	
		}
		return text;
	},
	
	putbackDiakritiks : function(text){
		return(diakritizator.visszacserelt[text]);
	},

	visszacsere : function(e){
		//vissza kell cserélni a diakritizált karaktereket
		var elem = e.target;
		text = diakritizator.removeDiakritiks(elem.textContent);
		
		elem.stopObserving('click', diakritizator.visszacsere);
		diakritizator.visszacserelt[text] = elem.textContent;		// Hare : Hāre
		Event.observe(elem, 'click', diakritizator.visszaallit);
		
		elem.textContent = text;
		elem.removeClassName('c');
		elem.addClassName('v');
	},
	
	visszaallit : function(e){
		var elem = e.target;
		elem.textContent = diakritizator.putbackDiakritiks(elem.textContent);
		elem.removeClassName('v');
		elem.addClassName('c');
		elem.stopObserving('click', diakritizator.visszaallit);
		Event.observe(elem, 'click', diakritizator.visszacsere);
	}
}

document.observe('dom:loaded', function(){
	diakritizator.init();
});