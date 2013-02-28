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
	
	//var kivetelek = {};
	
	var visszacserelt = {};
	
	var TITLE_LEHETSEGES = 'Lehetséges változatok: ';
	var TITLE_CSERE = 'Szó cseréje erre: ';
	
	$(function(){
		var cserelt = $('.c');
		
		cserelt.mouseover(addTitle);
		cserelt.mouseout(removeTitle);
		cserelt.click(cserel);
		
		createTitle(cserelt);
	});
	
	function addTitle(e){
		var elem = $(e.target);
		if(elem.attr('title').indexOf('|') > 0){
			elem.prop('title', TITLE_LEHETSEGES + elem.attr('title'));
		}
		else{
			if(elem.hasClass('c'))
				elem.prop('title', TITLE_CSERE + removeDiakritiks(elem.text()));
			else if(elem.hasClass('v'))
				elem.prop('title', TITLE_CSERE + putbackDiakritiks(elem.text()));
		}
	}
	
	function removeTitle(e){
		var elem = $(e.target);
		elem.prop('title', elem.attr('title').replace(TITLE_LEHETSEGES, ''));
		elem.prop('title', elem.attr('title').replace(TITLE_CSERE, ''));
		return elem.attr('title');
		
	}

	function cserel(e){
		//a title-ben benne van az összes lehetséges verzió beleértve azt is ami most van, kattra a következőt jelenítjük meg
		var title = removeTitle(e).split('|');
		
		var elem = $(e.target);
		var next = title.indexOf(elem.text()) + 1;
		next = (next == title.length) ? 0 : next;
		elem.text(title[next]);
		
	}

	function createTitle(elemek){
		elemek.each(function(index){
			var originalText = $(this).text();
			var pipePos = originalText.indexOf('|');
			var firstTextForm = originalText.substr(0,pipePos);
			$(this).text(firstTextForm);
			var reOriginal = removeDiakritiks(firstTextForm);
			reOriginal = (reOriginal == firstTextForm) ? '' : reOriginal + '|';
			$(this).prop('title', reOriginal + originalText);
			});
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
})(jQuery);