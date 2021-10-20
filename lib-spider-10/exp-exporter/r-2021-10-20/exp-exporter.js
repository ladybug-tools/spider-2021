
// copyright 2021 Theo Armour. MIT license.
/* global MNU, FRX, FRXdivMenuFileRead, FRXdivLog  */
// jshint esversion: 6
// jshint loopfunc: true





const EXP = {};

EXP.source = "https://github.com/ladybug-tools/spider-2021/tree/main/lib-spider-10/exp-exporter/";
EXP.release = "r-2021-10-20";
EXP.info = `
"Save models in a variety of file formats. More formats will be added.<br>
Also: create an animated GIF.<br>
release: ${ EXP.release }<br>
<a href="${ EXP.source }" target="_blank">Source code</a>
`

EXP.init = function () {

	const htm = `

			<details>

				<summary class="summary-primary gmd-1" title="View selected items">
				Exporters
				${ MNU.addInfoBox( EXP.info ) }
				</summary>

				<div class=divNavResize>

					<p>
						<button onclick=EXP.exportObj()>create OBJ</button>

						<button onclick=EXP.exportStl()>create STL</button>

						<button onclick=EXP.exportGltf()>create glTF</button>

						<button onclick=EXP.exportJson()>create JSON</button>
					</p>

					<textarea id=txtArea rows=10 style=width:100%;
						placeholder="translated text will appear here..."></textarea>

					<button onclick=EXP.saveFile();>save translated text to file</button>

					<hr>

					<details>
						<summary  class="summary-secondary">Screen Capture 3D</summary>

						<p>
							<button onclick=EXP.captureScreen() >Capture screen</button>
						</p>

						<p>
						Click button. When the image appears, use right-click or context menu to save the image to a file.
						</p>
					</details>


					<details id=GGFdet ontoggle=EXP.loadGGF();>

						<summary class="summary-secondary">Generate Animated GIF</summary>

					</details>

				</div>

			</details>

	`;

	EXPdivMenuExporters.innerHTML = htm;
};

EXP.exportObj = function () {

	//divPopUp.innerHTML = "processing...";

	const script = document.head.appendChild( document.createElement( "script" ) );

	script.onload = () => {

		const exporter = new THREE.OBJExporter();
		const result = exporter.parse( THR.group );
		extension = "obj";
		//console.log( "obj result", result );
		txtArea.value = result;
		//divPopUp.innerHTML = `Translation complete. Click "Save text to file" button.`;

	};

	script.src = `https://cdn.jsdelivr.net/gh/mrdoob/three.js@${ COR.releaseThree }/examples/js/exporters/OBJExporter.js`;

};



EXP.exportStl = function() {

	//divPopUp.innerHTML = "processing...";

	const script = document.head.appendChild( document.createElement( "script" ) );

	script.onload = () => {

		const exporter = new THREE.STLExporter();
		const result = exporter.parse( THR.group );
		extension = "stl";
		//console.log( "obj result", result );
		txtArea.value = result;
		//divPopUp.innerHTML = `Translation complete. Click "Save text to file" button.`;

	};

	script.src = `https://cdn.jsdelivr.net/gh/mrdoob/three.js@${ COR.releaseThree }/examples/js/exporters/STLExporter.js`;

}


EXP.exportGltf = function() {

	//divPopUp.innerHTML = "processing...";

	const script = document.head.appendChild( document.createElement( "script" ) );

	script.onload = () => {

		const exporter = new THREE.GLTFExporter();
		const result = exporter.parse( THR.group, ( result ) => {
			output = JSON.stringify( result, null, 2 );
			//console.log( "result", output );
			txtArea.value = output;
			//divPopUp.innerHTML = `Translation complete. Click "Save text to file" button.`;
		} );
		extension = "gltf";

	};

	script.src = `https://cdn.jsdelivr.net/gh/mrdoob/three.js@${ COR.releaseThree }/examples/js/exporters/GLTFExporter.js`;

}



EXP.exportJson = function () {

	const json = THR.scene.toJSON();

	output = JSON.stringify( json, null, 2 );
	//console.log( "result", output );
	txtArea.value = output;
	//divPopUp.innerHTML = `Translation complete. Click "Save text to file" button.`;
	extension = "json";

};



EXP.captureScreen = function () {

	// https://jsfiddle.net/user/2pha/fiddles/

	const win = window.open( "","" );
	win.document.title = "Screenshot";
	//w.document.body.style.backgroundColor = "red";

	const image = new Image();
	// Without 'preserveDrawingBuffer' set to true, we must render now

	THR.renderer.render( scene, camera );
	image.src = THR.renderer.domElement.toDataURL();
	win.document.body.appendChild( image );

};




EXP.loadGGF = function () {

	scr = document.body.appendChild( document.createElement( 'script' ) );
	scr.src = `https://cdn.jsdelivr.net/npm/omggif@1.0.10/omggif.min.js`;

	scr = document.body.appendChild( document.createElement( 'script' ) );
	scr.src = `https://www.ladybug.tools/spider-2021/lib-spider-10/exp-exporter/${ EXP.release }/ggf-generate-gif.js`;

};



EXP.saveFile = function () {

	const blob = new Blob( [ txtArea.value ] );
	let a = document.createElement( 'a' );
	a.href = window.URL.createObjectURL( blob );
	a.download = `hello-world-${ new Date().toISOString().slice( 0, 10 ) }.${ extension }`;
	a.click();
	a = null;

};
