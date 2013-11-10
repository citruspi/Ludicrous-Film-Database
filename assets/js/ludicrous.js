window.onload = function () {
	
	/* Render and Display Footer */
	
	$.get('http://citruspi.github.io/Ludicrous-Film-Database/assets/ms/footer.ms', function(template) {
		
		var adjectives = ["Sexy", "Fast", "Lite", "Minimal"];
		
		var data = {
			adjective: adjectives[Math.floor(Math.random()*adjectives.length)]
		}
		
		var rendered = Mustache.render(template, data);
		
		document.getElementById('footer').innerHTML = rendered;
			
	});	

	$.get('http://citruspi.github.io/Ludicrous-Film-Database/assets/ms/header.ms', function(template) {
		
		var adjectives = ["Sexy", "Fast", "Lite", "Minimal"];
		
		var data = {
			adjective: adjectives[Math.floor(Math.random()*adjectives.length)]
		}
		
		var rendered = Mustache.render(template, data);
		
		document.getElementById('header').innerHTML = rendered;
			
	});		


	if (window.location.hash) {
	
		/* Render and Display Information */
	
	} else {
		
		$.get('http://citruspi.github.io/Ludicrous-Film-Database/assets/ms/search.ms', function(template) {
			
			document.getElementById('search').innerHTML = template;
			//document.getElementById('search').style.marginTop = "20em";

			document.getElementById('options').style.display = 'none';

			document.getElementById('search').addEventListener('focus', function (e) {

				console.log('focused');

				document.getElementById('options').style.display = 'block';				

			}, false);

			
			document.getElementById('searchField').addEventListener('keypress', function (e) {

			    if (e.which !== 0 && e.charCode !== 0){

			        document.getElementById('searchResults').innerHTML = '';

                    var params = {
                        'query': document.getElementById('searchField').value + String.fromCharCode(e.charCode),
                        'api_key': '5a55944d5f08c3c2fb90bbed7eea460f',
                        'include_adult' : false
                    };

                    $.getJSON('https://api.themoviedb.org/3/search/movie?callback=?', params, function (response) {
                
                        for (var i=0; i<response.results.length; i+=4 ){

                        	var output = "<div class='row'>";

                        	for (var j=0; j<4; j++){

                        		// Account for missing release date

                        		if (response.results[i+j] == null) {
                        			break;
                        		}

                        		if (response.results[i+j].release_date == ""){
                        			response.results[i+j].release_date = "?";
                        		} else {
                        			response.results[i+j].release_date = response.results[i+j].release_date.split('-')[0];
                        		}   

                        		// Account for missing poster path

                        		if (response.results[i+j].poster_path == null){
                        			response.results[i+j].poster_path = "http://dummyimage.com/500x700/000/fff.png&text=No+Poster+Found :(";
                        		} else {
                        			response.results[i+j].poster_path = "http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w500" + response.results[i+j].poster_path;
                        		}                       		

                        		output += "<div class='col-md-3'>";
                        		output += "<div href='#'' class='thumbnail film' film='";
                        		output += response.results[i+j].id;
                        		output += "'><img src='";
                        		output += response.results[i+j].poster_path;
                        		output += "' width='100%'/>";
                        		output += "<div class='caption'><h4>" + response.results[i+j].title + ' (' + response.results[i+j].release_date + ')';
       							output += "</h4></div></div></div>";

                        	}

                        	output += "</div>";

                        	document.getElementById('searchResults').innerHTML += output;                        	

                    	}

                    	var results = document.getElementsByClassName('film');

                    	for (var x=0; x<results.length; x++) {

                    		results[x].addEventListener('click', function (){

                    			var filmID = this.getAttribute('film');

								$.get('http://citruspi.github.io/Ludicrous-Film-Database/assets/ms/film.ms', function(template) {

									var params = {
                        				'api_key': '5a55944d5f08c3c2fb90bbed7eea460f',
                        				'append_to_response': 'credits, trailers, keywords, similar_movies'
                    				};


									$.getJSON('https://api.themoviedb.org/3/movie/' + filmID + ' ?callback=?', params, function (response) {

										console.log(response);

										if (response.poster_path == null){
                        					response.poster_path = "http://dummyimage.com/500x700/000/fff.png&text=No+Poster+Found :(";
                        				} else {
                        					response.poster_path = "http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w500" + response.poster_path;
                        				} 

										if (response.backdrop_path == null){
                        					response.backdrop_path = "http://dummyimage.com/500x700/000/fff.png&text=No+Poster+Found :(";
                        				} else {
                        					response.backdrop_path = "http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w1280" + response.backdrop_path;
                        				} 

										if (response.credits.cast.length == 0){
                        					response.cast = false;
                        				} else {
                        					response.cast = true;
                        				} 

                        				if (response.imdb_id.length == 0){
                        					response.imdb_id = false;
                        				}

										var data = {
											title: response.title,
											release_date: response.release_date,
											release_year: response.release_date.split('-')[0],
											tagline: response.tagline,
											overview: response.overview,
											poster_path: response.poster_path,	
											backdrop_path: response.backdrop_path,
											status: response.status,
											runtime: response.runtime,
											cast: response.cast,
											credits_cast: response.credits.cast,
											budget: response.budget,
											revenue: response.revenue,
											imdbid: response.imdb_id
										};

                    					document.getElementsByClassName('modal-body')[0].innerHTML = Mustache.render(template, data);

                    					$('#myModal').modal();

                    				});

								});                    			

                    			//alert(this.getAttribute('film'));

                    		}, false);

                    	}

                    });

                } else if (document.getElementById('searchField').value == '') {

                	document.getElementById('searchResults').innerHTML = '';

                }

			}, false);
			
		})
		;
	}

}