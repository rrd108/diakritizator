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
		var cserelt = $('.c');
		cserelt.bind('click', diakritizator.visszacsere);
		cserelt.bind('mouseover', diakritizator.addTitle);
	},

	addTitle : function(e){
		var elem = $(e.target);
		var title = 'Szó cseréje erre: ';
		if(elem.hasClass('c'))
			elem.prop('title', title + '"' + diakritizator.removeDiakritiks(elem.text()) + '"');
		else if(elem.hasClass('v'))
			elem.prop('title', title + '"' + diakritizator.putbackDiakritiks(elem.text()) + '"');
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
		var elem = $(e.target);
		text = diakritizator.removeDiakritiks(elem.text());
		
		elem.unbind('click');
		diakritizator.visszacserelt[text] = elem.text();		// Hare : Hāre
		elem.bind('click', diakritizator.visszaallit);
		
		elem.text(text);
		elem.removeClass('c');
		elem.addClass('v');
	},
	
	visszaallit : function(e){
		var elem = $(e.target);
		elem.text(diakritizator.putbackDiakritiks(elem.text()));
		elem.removeClass('v');
		elem.addClass('c');
		elem.unbind('click');
		elem.bind('click', diakritizator.visszacsere);
	}
}

$(document).ready(function(){
	diakritizator.init();
});