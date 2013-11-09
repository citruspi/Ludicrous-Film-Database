window.onload = function () {
	
	/* Render and Display Footer */
	
	$.get('/assets/ms/footer.ms', function(template) {
		
		var adjectives = ["Sexy", "Fast", "Lite", "Minimal"];
		
		var data = {
			adjective: adjectives[Math.floor(Math.random()*adjectives.length)]
		}
		
		var rendered = Mustache.render(template, data);
		
		document.getElementById('footer').innerHTML = rendered;
			
	});	
	
}