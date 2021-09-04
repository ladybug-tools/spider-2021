// copyright 2021 Theo Armour. MIT license.
/* global  */
// jshint esversion: 6
// jshint loopfunc: true


const FOX = {};

FOX.documentTitle = document.title;
FOX.path = "./";
FOX.defaultFile = "README.md";


FOX.init = function () {

	window.addEventListener( "hashchange", FOX.onHashChange );

};



FOX.onHashChange = function () {
	//console.log( "path", FOX.path );

	//FOX.path = `https://${ GRV.user }.github.io/${ GRV.repo }/`;

	FOX.timeStart = performance.now();
	const fileName = location.hash ? location.hash.slice( 1 ) : FOX.defaultFile;
	const fileTitle = fileName.split( "/" ).pop();
	const extension = fileTitle.toLowerCase().split( '.' ).pop();
	const url = FOX.path + fileName;

	//console.log( "FOX url", url );

	document.title = `${ FOX.documentTitle } ~ ${fileTitle }`;

	//console.log( "extension", extension );

	if ( extension === "md" || extension.length > 4 ) {

		showdown.setFlavor( "github" );

		const options = { excludeTrailingPunctuationFromURLs: true, ghMention: true, parseImgDimensions: true, simplifiedAutoLink: true, simpleLineBreaks: true, emoji: true, openLinksInNewWindow: true };

		const xhr = new XMLHttpRequest();
		xhr.open( "get", url, true );
		xhr.onload = () => {
			const txt = xhr.responseText.replace( /\<!--@@@/, "" ).replace( /\@@@-->/, "" );
			divContentMain.innerHTML = new showdown.Converter( options ).makeHtml( txt );
			window.scrollTo( 0, 0 );
			FOX.timeEnd = performance.now();
			//console.log( "FOX time load", ( FOX.timeEnd - FOX.timeStart ).toLocaleString() );
		};
		xhr.send( null );

		return;

	}

	if ( [ "gif", "jpg", "png", "svg" ].includes( extension ) ) {

		divContentMain.innerHTML = `<a href=${ url } title="Open this image in a new window" target="_blank" ><img src="${ url }" style=max-width:100% ></a>`;

		return;

	}

	if ( FOX.extension === "zip" ) {

		FOX.dataZip = FOX.string;
		FOZ.onLoadFile();

		return;

	}

	divContentMain.innerHTML = `<iframe src="${ url }" height=${ window.innerHeight } width=100% ></iframe>`;

};

