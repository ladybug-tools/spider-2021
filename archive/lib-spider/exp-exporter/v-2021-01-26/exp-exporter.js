
const source = "https://github.com/ladybug-tools/spider-2020/tree/master/sandbox/exporter-gbxml";



const EXP = {};

EXP.init = function () {

	const htm = `

			<details>

				<summary class="summary-primary gmd-1" title="View selected items">Exporters</summary>

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

					<h3>
						Online Viewers
					</h3>

					<a href="https://3dviewer.net/" target="_blank">Online 3D Viewer</a><br>

					<a href="https://gltf-viewer.donmccurdy.com/" target="_blank">glTF Viewer</a><br>

					<a href="https://playcanvas.com/viewer" target="_blank">playcanvas</a><br>

					<br>

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

	script.src = "https://cdn.rawgit.com/mrdoob/three.js/r123/examples/js/exporters/OBJExporter.js";

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

	script.src = "https://cdn.rawgit.com/mrdoob/three.js/r123/examples/js/exporters/STLExporter.js";

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

	script.src = "https://cdn.rawgit.com/mrdoob/three.js/r123/examples/js/exporters/GLTFExporter.js";

}



EXP.exportJson = function () {

	json = THR.scene.toJSON();

	output = JSON.stringify( json, null, 2 );
	//console.log( "result", output );
	txtArea.value = output;
	//divPopUp.innerHTML = `Translation complete. Click "Save text to file" button.`;
	extension = "json";

};

EXP.saveFile = function () {

	const blob = new Blob( [ txtArea.value ] );
	let a = document.body.appendChild( document.createElement( 'a' ) );
	a.href = window.URL.createObjectURL( blob );
	a.download = `hello-world-${ new Date().toISOString().slice( 0, 10 ) }.${ extension }`;
	a.click();
	a = null;

}






