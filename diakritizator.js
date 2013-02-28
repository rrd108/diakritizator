(function($){

	var c = {
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
		'ṛ' : 'ri', 	'Ṛ' : 'Ri',
		'ṝ' : 'r', 		'Ṝ' : 'R',
		'ṣ' : 's', 		'Ṣ' : 'S',
		'ś' : 's', 		'Ś' : 'S',
		'ṭ' : 't',  	'Ṭ' : 'T'};
	
	var visszacserelt = {};

	$(function(){
		var cserelt = $('.c');
		cserelt.click(visszacsere);
		cserelt.mouseover(addTitle);
	});

	function addTitle(e){
		var elem = $(e.target);
		var title = 'Szó cseréje erre: ';
		if(elem.hasClass('c'))
			elem.prop('title', title + '"' + removeDiakritiks(elem.text()) + '"');
		else if(elem.hasClass('v'))
			elem.prop('title', title + '"' + putbackDiakritiks(elem.text()) + '"');
	}
	
	function removeDiakritiks(text){
		var k;
		var re;
		for(k in c){
			re = new RegExp(k,"g");
			text = text.replace(re, c[k]);	
		}
		return text;
	}
	
	function putbackDiakritiks(text){
		return(visszacserelt[text]);
	}

	function visszacsere(e){
		//vissza kell cserélni a diakritizált karaktereket
		var elem = $(e.target);
		text = removeDiakritiks(elem.text());
		
		elem.unbind('click');
		visszacserelt[text] = elem.text();		// Hare : Hāre
		elem.bind('click', visszaallit);
		
		elem.text(text);
		elem.removeClass('c');
		elem.addClass('v');
	}
	
	function visszaallit(e){
		var elem = $(e.target);
		elem.text(putbackDiakritiks(elem.text()));
		elem.removeClass('v');
		elem.addClass('c');
		elem.unbind('click');
		elem.bind('click', visszacsere);
	}
})(jQuery);