const GOR = {

	valueDefault: "pushme-pullyou/tootoo-2021",
	path: "./"

};

// GOR.user = "pushme-pullyou";
// GOR.repo = "tootoo-2021";

GOR.init = function () {

	const htm = `
			<details open>

				<summary class="summary-primary gmd-1" title="View selected items">${ GOR.user } repositories
					<span class="info">
						<img class=infoImg src="${ GOR.path }lib/assets/icons/noun_Information_585560.svg">
						<div id="divGOR" class="infoTooltip gmd-5">
							View all the repositories belonging to a GitHub user or organization
						</div>
					</span>
				</summary>

				<div class=divNavResize>

					<label for="GORinpUser">Choose a user:</label>
					<input type=search list="GORlistUsers" id="GORinpUser" oninput=GOR.getOrganization(this.value);
						placeholder="pushme-pullyou/tootoo-2021" name="Select a GitHub user or organization" style=width:100% />

					<datalist id="GORlistUsers">
						<option value="pushme-pullyou/tootoo-2021" >
						<option value="ladybug-tools/spider-2020" >
						<option value="theo-armour/2020">
						<option value="mostaphaRoudsari">
						<option value="chriswmackey">
					</datalist>

					<div id=GORdivGitHubRepos></div>

					<br>

				</div>

			</details>
	`;

	GORdivDetails.innerHTML = htm;

	GORinpUser.value = GOR.valueDefault

	//GOR.getOrganization();

};



GOR.getOrganization = function ( value = GORinpUser.value ) {
	//console.log( "user", user );

	if ( !value ) { return; }

	valueArr = value.split( "/" );

	GOR.user = valueArr.shift();

	GOR.repo = valueArr.shift();

	GOR.urlApi = `https://api.github.com/users/${ GOR.user }/repos?per_page=100`;

	GOR.requestFile( GOR.urlApi, GOR.onLoadTree );

};


GOR.requestFile = function ( url = GOr.urlApi, callback = GOR.onLoadTree ) {

	const xhr = new XMLHttpRequest();
	xhr.open( "GET", url, true );
	xhr.responseType = "json";
	xhr.onerror = ( xhr ) => console.log( "error:", xhr );
	//xhr.onprogress = ( xhr ) => console.log( "bytes loaded:", xhr.loaded );
	xhr.onload = ( xhr ) => callback( xhr.target.response );
	xhr.send( null );

};


GOR.onLoadTree = function ( repos = GOR.repos ) {
	//console.log( "repos", repos );

	GOR.repos = repos;

	//repo = GOR.repos.find( repo => repo.name.startsWith( GOR.user.toLowerCase() + ".github" ) );

	//GOR.repo = repo ? repo.name : GOR.repos[ 0 ].name;

	//console.log( "repo", GOR.repo );

	texts = repos.map( ( repo, index ) => {
		selected = repo.name === GOR.repo ? "selected" : "";
		return `<option title="${ repo.description }" style="background-color:#fff;" ${ selected }>${ repo.name }</option>`
	} );

	GORdivGitHubRepos.innerHTML = `
<div>
	<select id=GORinpRepo oninput=GOR.getRepo(this); class=select-resize size=10 >
	${ texts.join( "" ) }
	</select>
</div>
<div id=GORdivInfo ></div>`;

	if ( GOR.user ) { GORinpRepo.oninput(); }

};



GOR.getRepo = function ( that ) {

	json = GOR.repos[ that.selectedIndex ];
	//console.log( "json", json );

	if ( json ) {

		GOR.repo = json.name;

		GOR.branch = json.default_branch;

		GOR.urlApi = `https://api.github.com/repos/${ GOR.user }/${ GOR.repo }/git/trees/${ GOR.branch }?recursive=1`;

		GRV.urlViewer = `https://${ GOR.user }.github.io/${ GOR.repo }/`;

		//GRV.requestFile( GOR.urlApi, GRV.onLoadTree );

		GRV.getRepo( GOR.user, GOR.repo, GOR.branch )

		GORdivInfo.innerHTML = `
<div>User: <a href=https://github.com/${ GOR.user} target="_blank">${ GOR.user }</a></div>
<div>Repo: <a href="${ json.html_url }" target="_blank">${ json.name }</a></div>
<div>Description: ${ json.description }</div>
<div>Updated: ${ json.updated_at }</div>
<div>Fork: ${ json.fork } ~ Watchers: ${ json.watchers } ~ Stars: ${ json.stargazers_count }</div>
`;

	} else {

		GRVdivGitHubRepoTreeView.innerHTML = "";

		GORdivInfo.innerHTML = "";
	}

};