
// copyright 2021 Theo Armour. MIT license.
/* global MNU, FRX, FRXdivMenuFileRead, FRXdivLog  */
// jshint esversion: 6
// jshint loopfunc: true


const source = "https://github.com/ladybug-tools/spider-2021/tree/main/lib-spider-09/exp-exporter/";



const EXP = {};

EXP.init = function () {

	const htm = `

			<details>

				<summary class="summary-primary gmd-1" title="View selected items">
				Exporters
				${ MNU.addInfoBox( "Save models in a variety of file formats. More formats will be added. Also: create an animated GIF. Learn about other online viewers" ) }
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

					<details id=GGFdet ontoggle=EXP.loadGGF();>
						<summary  class="summary-secondary">Generate animated GIF</summary>
					</details>

					<details>
						<summary class="summary-secondary">Online Viewers</summary>

						<p>
						Free online 3D file viewers
						</p>

						<p>
							<a href="https://3dviewer.net/" target="_blank">Online 3D Viewer</a><br>
							Drag and drop 3D models. Supports obj, 3ds, stl, ply, gltf, glb, 3dm, fbx, off
						</p>

						<a href="https://gltf-viewer.donmccurdy.com/" target="_blank">glTF Viewer</a><br>

						<a href="https://playcanvas.com/viewer" target="_blank">playcanvas</a><br>

						<br>
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

	script.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r132/examples/js/exporters/OBJExporter.js";

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

	script.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r132/examples/js/exporters/STLExporter.js";

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

	script.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r132/examples/js/exporters/GLTFExporter.js";

}



EXP.exportJson = function () {

	json = THR.scene.toJSON();

	output = JSON.stringify( json, null, 2 );
	//console.log( "result", output );
	txtArea.value = output;
	//divPopUp.innerHTML = `Translation complete. Click "Save text to file" button.`;
	extension = "json";

};


EXP.loadGGF = function() {

	scr = document.body.appendChild( document.createElement( 'script' ) );
	scr.src = "https://cdn.jsdelivr.net/npm/omggif@1.0.10/omggif.min.js";

	scr = document.body.appendChild( document.createElement( 'script' ) );
	scr.src = "../../lib-spider-09/exp-exporter/v-2021-09-02/ggf-generate-gif.js";


}



EXP.saveFile = function () {

	const blob = new Blob( [ txtArea.value ] );
	let a = document.createElement( 'a' );
	a.href = window.URL.createObjectURL( blob );
	a.download = `hello-world-${ new Date().toISOString().slice( 0, 10 ) }.${ extension }`;
	a.click();
	a = null;

}






