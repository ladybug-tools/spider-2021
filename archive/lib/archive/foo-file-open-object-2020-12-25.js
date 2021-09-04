// copyright 2020 Theo Armour. MIT license.
/* global  */
// jshint esversion: 6
// jshint loopfunc: true


const FOO = {};

FOO.defaultFile = "README.md";


FOO.init = function () {

	window.addEventListener("hashchange", FOO.onHashChange);

	// FOO.reset();

	// if ( location.hash ) {

	// 	FOO.onHashChange();

	// }

};





FOO.onHashChange = function() {

	FOO.timeStart = performance.now();
	const fileName = location.hash ? location.hash.slice( 1 ) : FOO.defaultFile;
	const title = fileName.split( "/" ).pop();
	const extension = title.toLowerCase().split( '.' ).pop();
	const url = GRV.urlViewer + fileName;

	document.title = title;

	if ( extension === "md" ) {

		showdown.setFlavor( "github" );

		const options = { excludeTrailingPunctuationFromURLs: true, ghMention: true, parseImgDimensions: true, simplifiedAutoLink: true, simpleLineBreaks: true, emoji: true, openLinksInNewWindow: true };

		const xhr = new XMLHttpRequest();
		xhr.open( "get", url, true );
		xhr.onload = () => {
			const txt = xhr.responseText.replace( /\<!--@@@/, "" ).replace( /\@@@-->/, "" );
			divContentMain.innerHTML = new showdown.Converter( options ).makeHtml( txt );
			window.scrollTo( 0, 0 );
			FOO.timeEnd = performance.now();
			//console.log( "FOO time load", ( FOO.timeEnd - FOO.timeStart ).toLocaleString() );
		};
		xhr.send( null );

		return;

	}

	if ( [ "gif", "jpg", "png", "svg" ].includes( extension ) ) {

		divContentMain.innerHTML = `<a href=${ url } title="Open this image in a new window" target="_blank" ><img src="${ url }" style=max-width:100% ></a>`;

		return;

	}


	if ( FOO.extension === "zip" ) {

		FOO.dataZip = FOO.string;
		FOZ.onLoadFile();

		return;

	}

	divContentMain.innerHTML = `<iframe src="${ url }" height=${ window.innerHeight } width=100% ></iframe>`;

}


////////// to deprecate ??

FOO.bbbbonHashChange = function () {
	//console.log( 'hash', location.hash );

	FOO.url = location.hash ? location.hash.slice( 1 ) : FOO.defaultFile;

	FOO.requestFile( FOO.url, FOO.onLoadXhr );

};


FOO.reset = function () {

	FOOdivLog.innerHTML = "";

	FOO.extension = ".md";

	FOO.fileName = undefined;
	FOO.hostName = undefined;
	//FOO.objects = undefined;
	FOO.messagePopUp = "<p>When you touch a surface,<br>the rotation will stop<br>and its details will appear here</p>";
	FOO.onLoad = FOO.onLoadXhr;
	//FOO.doNext = () => {};
	FOO.responseType = "text";
	FOO.string = undefined;
	FOO.timeStart = undefined;
	FOO.url = undefined;
	FOO.xhr = new XMLHttpRequest();

};



FOO.onLoadFile = function( text ) {

	console.log( "FOO.string", FOO.string.slice( 0, 50 ) );

	if ( window.ifr ) {

		ifr.srcdoc = FOO.string; // need to figure out what to do with unpredicted file types

	}

	if ( window.divPopUp ) {

		divPopUp.hidden = false;
		divPopUp.innerText = "FOO.string\n" + FOO.string.slice( 0, 50 );

	}
	// if ( FOO.fileName.endsWith( ".md" ) ) { // use readme.html to convert markdown to HTML

	// 	path += "readme.html#";

	// }

	const txt = text.replace( /\<!--@@@/, "" ).replace( /\@@@-->/, "" );
	divContentMain.innerHTML = new showdown.Converter( options ).makeHtml( txt );
	window.scrollTo( 0, 0 );

};



FOO.requestFile = function ( url = urlGbxmlDefault, onLoad = FOO.onLoadXhr ) {

	//console.log( 'url', url );

	FOO.timeStart = performance.now();

	FOO.url = url;
	FOO.fileName = FOO.url.split( "/" ).pop();
	FOO.extension = FOO.fileName.split( "." ).pop().toLowerCase();
	//console.log( "FOO.extension ",  FOO.extension );
	//console.log( "FOO.responseType",  FOO.responseType );

	FOO.responseType = FOO.extension === "json" ? "json" : "text";

	FOO.responseType = FOO.extension === "zip" ? "blob" : FOO.responseType;
	//console.log( "FOO.responseType",  FOO.responseType );

	FOO.xhr.open( 'GET', url, true );
	FOO.xhr.responseType = FOO.responseType;
	FOO.xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	FOO.xhr.onprogress = function( xhr ) { FOO.onProgress( xhr.loaded, FOO.note ); };
	FOO.xhr.onload = onLoad;
	FOO.xhr.send( null );

	//const path = location.hash.slice( 1 ).split( "/" )

	const a = document.createElement( 'a' );
	a.href = url;
	FOO.hostName = a.hostname;

};



FOO.onProgress = function( size = 0, note = "" ) {

	FOO.timeToLoad = ( performance.now() - FOO.timeStart ).toLocaleString();
	FOO.size = size;

	FOO.fileInfo =
	`
		<p>
			<span class=attributeTitle >File name</span>: <span class=attributeValue >${ FOO.fileName }</span></br>
			<span class=attributeTitle >Host|type</span>: <span class=attributeValue >${ FOO.hostName }</span></br>
 			<span class=attributeTitle >Bytes loaded</span>: <span class=attributeValue >${ size.toLocaleString() }</span></br>
			<span class=attributeTitle >Time to load</span>: <span class=attributeValue>${ FOO.timeToLoad } ms</span></br>
			${ note }
		</p>
	`;

	FOOdivLog.innerHTML = FOO.fileInfo;

};



FOO.onLoadXhr = function ( xhr ) {
	//console.log( 'xhr', xhr.loaded, xhr );

	if ( xhr.loaded < 30000 ) {

		console.log( "small data warning - file may not be fully loaded" );

		//return;
	}
	FOO.onProgress( xhr.loaded, "Load complete" );

	FOO.string = xhr.target.response;

	if ( FOO.extension === "zip" ) {

		FOO.dataZip = FOO.string;
		FOZ.onLoadFile();

	} else {

		FOO.onLoadFile( xhr.target.response );

	}

};
