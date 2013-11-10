<div class="row">

	<div class="col-md-9 col-md-offset-3" style="z-index:8;">		

			<h2>{{ title }} ({{ release_year }})</h2>
			<i><h3>{{ tagline }}</h3></i>

	</div>

	<div class="col-md-9 col-md-offset-3" style="z-index:8;">
		<hr>
	</div>

	<div class="col-md-9 col-md-offset-3" style="z-index:8; ">	

		<p class="lead">{{ status }}, {{ runtime }} minutes  {{ #imdbid }} // <a style="color:#DCA917; text-decoration:none;" href="http://imdb.com/title/{{ imdbid }}">IMDB</a>{{ /imdbid }}</p>

		<p class="lead" style="font-weight:bold;">Overview</p>

		<p class="lead">{{ overview }}</p>	

		<p class="lead" style="font-weight:bold;">Financials (USD)</p>

		<table class='table lead'>

			<thead>
				<tr>
					<td width="50%">Budget</td>
					<td>{{ budget }}</td>
				</tr>
			</th>

			<tbody>
				<tr>
					<td>Revenue</td>
					<td>{{ revenue }}</td>
				</tr>
			</tbody>


		</table>

		<p class="lead" style="font-weight:bold;">Cast</p>

		{{ #cast }}		

		<table class="table lead">

		<thead>
			<tr>
				<td width="50%"><strong>Starring</strong></td>
				<td><strong>As</strong></td>
			</tr>
		</thead>
		<tbody>

			{{ #credits_cast }}

			<tr>
				<td>{{ name }}</td>
				<td>{{ character }}</td>
			</tr>

			{{ /credits_cast }}

		</tbody>

		</table>

		{{ /cast }}


		{{ ^cast }}
		<p class="lead">None Found :-(</p>
		{{ /cast }}



	</div>

	<div class="col-md-3" style="z-index:10; float:left; position:absolute;">

		<a href="#" class="thumbnail">
			<img src="{{ poster_path }}" width="100%" alt="...">
		</a>
		
	</div>


</div>


