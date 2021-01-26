const GRVT = {};

// GRVT.urlApi = "https://api.github.com/repos/ladybug-tools/spider-2020/git/trees/master?recursive=1";
// GRVT.urlSource = "https://github.com/ladybug-tools/spider-2020/tree/master/";

GRVT.user = "theo-armour";
GRVT.repo = "qdata";

GRVT.urlApi = "https://api.github.com/repos/theo-armour/qdata/git/trees/master?recursive=1";
GRVT.urlSource = "https://github.com/theo-armour/qdata/tree/master/";
GRVT.urlViewer = "https://theo-armour.github.io/qdata/";

GRVT.urlVscode = "vscode://file:/c:/Users/theo/Dropbox/Public/git-repos/theo-armour-qdata/";

//vscode://file/c:/Users/theo/Dropbox/Public/git repos/theo - armour - qdata /

GRVT.iconOctoCat = `<img width=14 src="${ GRVT.urlViewer }lib/assets/icons/octicon.svg">`;

GRVT.link = `<img width=14 src="${ GRVT.urlViewer }lib/assets/icons/icon-link-external.svg">`;


GRVT.init = function() {

	GRVT.accessToken = localStorage.getItem( 'githubAccessToken' ) || "";

	GRVT.requestFile( GRVT.urlApi, GRVT.onLoadTree );


	//GRVTinpGitHubApiKey.value = GRVT.accessToken;

	const htm = `
			<details open>
				<!-- 'open' triggers a run on load -->

				<summary id=GRVTsumRepo class="summary-primary gmd-1" title="View selected items">
					<span id=GRVTsumTitle >${ GRVT.repo } repository files</span>
					<span class="info">
						<img class=infoImg src="${ GRVT.path }lib/assets/icons/noun_Information_585560.svg">
						<div id="divGRV" class="infoTooltip gmd-5">
							Display all folders and files in a GitHub repository in a tree view menu<br>
							<button onclick=GRVT.test()>Testing: view all files in this repository</button>
						</div>
					</span>
				</summary>

				<div class=divNavResize>

					<p>
						Access token
						<input id=GRVTinpGitHubApiKey onclick=this.select(); onblur=GRVT.setGitHubAccessToken();
							title="Obtain API Access Token" style=width:100%;>
					</p>

					<p>Files you can load, view and experiment with:</p>

					<div id=GRVTdivGitHubRepoTreeView></div>

					<br>

				</div>

			</details>
	`;

	GRVTdivDetails.innerHTML = htm;

	GRVTinpGitHubApiKey.value = GRVT.accessToken;

}


GRVT.requestFile = function( url = "https://example.com" , callback = onLoad ) {

	const xhr = new XMLHttpRequest();
	xhr.open( "GET", url, true );
	xhr.setRequestHeader( "Authorization", "token " + GRVT.accessToken );
	xhr.responseType = "json";
	xhr.onerror = ( xhr ) => console.log( "error:", xhr  );
	//xhr.onprogress = ( xhr ) => console.log( "bytes loaded:", xhr.loaded );
	xhr.onload = ( xhr ) => callback( xhr.target.response );
	xhr.send( null );

};


GRVT.setGitHubAccessToken = function () {

	//console.log( 'accessToken', GRVinpGitHubApiKey.value );

	localStorage.setItem( "githubAccessToken", GRVinpGitHubApiKey.value );

	//GRVT.accessToken = accessToken;

};

GRVT.onLoadTree = function (json) {
	//console.log( "json", json );

	const tree = json.tree.slice();

	const subtrees = tree.filter(obj => obj.type === "tree").map(subtree => subtree.path.split("/"));
	//console.log( "subtrees", subtrees );

	const files = tree.filter(obj => obj.type === "blob").map(subtree => subtree.path);
	//console.log( "files", files );

	const htm = GRVT.subtreesToDetails(subtrees, files);

	const filesRoot = files
		.filter(file => !file.includes("/"))
		.map( ( item, i ) => `
		<div class=GRVdiv >
			<a href="${ GRVT.urlSource }${item}"  title="Source code on GitHub. Edit me!" >
			${ GRVT.iconOctoCat }</a>
			${ i + 1 } <a href="#${item}" >${item.split("/").pop()}</a>
			<a href="${ GRVT.urlViewer }${item}"title="Link to just this file. Open file in new tab."  target="_blank" >${ GRVT.link }</a>
		</div>`);

	GRVTdivGitHubRepoTreeView.innerHTML = filesRoot.join("") + htm.join("");

	window.addEventListener("hashchange", GRVT.onHashChange, false);

	GRVT.onHashChange();
};

GRVT.onHashChange = function () {
	if (!GRVT.links) {
		GRVT.links = Array.from(GRVTdivGitHubRepoTreeView.querySelectorAll("a"));
	}

	GRVT.links.forEach(link => link.parentNode.classList.remove("highlight"));

	const str = location.hash ? location.hash.slice(1) : "README.md";

	item = GRVT.links.find(a => a.getAttribute("href").includes(str));
	//console.log("item", item);

	item.parentNode.classList.add("highlight");

	item.parentNode.parentNode.open = true;

	item.parentNode.parentNode.parentNode.open = true;

	item.scrollIntoView();
};



GRVT.subtreesToDetails = function (subtrees, files) {
	let lengthSlicePrevious = 0;

	const htmArr = subtrees.map((subtree, index) => {
		//let closer = "</details>";
		let closer = "";

		const subtreeTitle = subtree.slice(-1);
		const subtreeSlice = subtree.slice(0, -1);
		const subtreeSliceJson = JSON.stringify(subtreeSlice);

		if (subtreeSlice.length === lengthSlicePrevious) {
			closer = "</details>";
			//console.log( "len same", subtreeSlice   );
		}

		if (subtreeSlice.length < lengthSlicePrevious) {
			const diff = lengthSlicePrevious - subtreeSlice.length + 1;
			closer = Array(diff).fill("</details>").join("");
			//console.log( "len shorter", subtreeTitle, diff, subtreeSlice, subtreeSlice.length, lengthSlicePrevious );
		}

		lengthSlicePrevious = subtreeSlice.length;

		const filesHtm = GRVT.getFiles(subtree, files);

		return `
		${closer}
		<details class="GRVdet" >
			<summary class="GRVsum" >${subtreeTitle}</summary>

			${filesHtm.join("")}
		`;
	});

	//console.log( "htmArr", htmArr );

	return htmArr;
};

GRVT.getFiles = function (subtree, files) {
	const str = subtree.join("/");


	const path = "vscode://file/C:/Users/theo/Dropbox/Public/git-repos/theo-armour-qdata/";

	const filtered = files
		.filter(file => file.slice(0, file.lastIndexOf("/")) === str)
		.map(item => `
		<div>
			<a href="${ GRVT.urlSource }${item}" title="Source code on GitHub" >
			${ GRVT.iconOctoCat }</a>
			<a href="#${item}" title="">${item.split("/").pop()}</a>
			<a href="${ path }${item}" title="Open file in new tab" >
			${ GRVT.link }</a>
		</div>`);

	return filtered;

	//<a href="${ GRVT.urlVscode}${item}" title="Open file in new tab" target="_blank" >
};
