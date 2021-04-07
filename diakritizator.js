$(document).ready(function(){
	$('.tooltip').tooltipster({
		theme: 'diakritizatorTip',
		interactive: true,
		position: 'right',

		functionReady: function(origin, tooltip){
			diakritizator.origin = origin;
			tooltip.click(diakritizator.szoCsere);
		}
		});
});

var diakritizator = {
	origin : null,

	szoCsere : function(e){
		diakritizator.origin.text($(e.target).text());
	}
}