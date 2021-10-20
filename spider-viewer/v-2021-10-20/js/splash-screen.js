// Splash Screen Loader

// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR */
// jshint esversion: 6
// jshint loopfunc: true


const SSL = {}; //


SSL.init = function() {

	// const loader = new THREE.FontLoader();

	// const url = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r132/examples/fonts/helvetiker_regular.typeface.json";

	// loader.load( url, ( fnt ) => font = fnt );

	// https://css-tricks.com/fitting-text-to-a-container/
	// https://stackoverflow.com/questions/16056591/font-scaling-based-on-width-of-container

	main.hidden = false;
	//divMainContent.style.cssText = "border: 0px solid red; font-size: calc( 0.5vw + 1vh); text-align: center;";
	divMainContent.innerHTML = `
<div style="border: 0px solid red; font-size: calc( 0.5vw + 1vh); text-align: center;" >
<h1 style="text-shadow: 0 0 3px #FF0000; color:lightgreen;" >Welcome to the Open Source CAD viewer of your dreams!</h1>
<h2>Open 3D: gbXML, Honeybee JSON, Rhino, Radiance, Open Studio, GLTF, STL, OBJ</h2>
<h2>Open "flat" files: text, HTML, PDF, MP4, WEBM, CSV, GIF, JPG, PNG, SVG etc</h2>
<h2>Load files using drag & drop, file system dialog box, or link to files on the Web</h2>
<h2>Access dozens of sample files of many types to test, experiment and play</h2>
<h2>Load many files into a scene, move them about, and save the results to a new file</h2>
<h2>Right-click on any item to view its details in a pop-up menu</h2>
<h2>View render statistics and frames/second. <span class=highlight title="New 2021-09-24">Export screen captures & animated GIFs</span></h2>
<h2>Explore all the JSON data in tree view menu</h2>
<h2>1|2|3 fingers to rotate|zoom|pan ~ <span class=highlight title="New 2021-09-23">Interactive 3D axes helper</span></h2>
<h2 style=color:magenta; >Huge files load fast!!</h2>
❦
<h2>Click anywhere or press spacebar to continue</h2>
</div>
`;

	window.addEventListener( "keydown", SSL.onStart );
	main.addEventListener( "click", SSL.onStart );
	main.addEventListener( "touchstart", SSL.onStart );
	main.addEventListener( "touchmove", SSL.onStart );
	main.addEventListener( "touchend", SSL.onStart );
	main.addEventListener( "wheel", SSL.onStart );

};



SSL.onStart = function () {

	main.hidden = true;
	divMainContent.innerHTML = "";

	controls.autoRotate = false;

	main.removeEventListener( "keydown", SSL.onStart );
	main.removeEventListener( "click", SSL.onStart );
	main.removeEventListener( "touchstart", SSL.onStart );
	main.removeEventListener( "touchmove", SSL.onStart );
	main.removeEventListener( "touchend", SSL.onStart );
	main.removeEventListener( "wheel", SSL.onStart );

};

