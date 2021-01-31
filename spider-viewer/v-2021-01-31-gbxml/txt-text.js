/* Global THR */

const TXT = {};

TXT.group = new THREE.Group();

let font;


TXT.init = function () {

	TXT.group = new THREE.Group();

	THR.scene.add( TXT.group );

	const loader = new THREE.FontLoader();

	const url = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r115/examples/fonts/helvetiker_regular.typeface.json";

	loader.load( url, ( fnt ) => font = fnt );

	THR.ground.position.z = -500

	htm = `
<details open>
<summary class="summary-primary gmd-1" >gbXML BoD Presentation</summary>
		<p>
		<button onclick=TXT.addText1() >Title</button>
	</p>

	<p>
		<button onclick=TXT.addText2() >Second Post</button>
	</p>

	<p>
		<button onclick=TXT.addText3()>Third Post</button>
	</p>
</details>`;

	TXTdivDetails.innerHTML = htm

};


TXT.addText1 = function() {

	text = "gbXML\nBoard of Directors\n2021-01-31";
	color = 0x11aa33;
	size = 8;
	x = -5;
	y = 38;
	z = -30; //- THR.center.z;
	console.log( "text", text );
	TXT.group.add( TXT.getSimpleText( { text, color, size, x, y, z } ) );

	//TXT.group.add( TXT.getSimpleText( { text, color, size, x, y, z } ) );

	TXT.group.add( TXT.getSimpleText( { text: "www.ladybug.tools/spider-2021/spider-viewer/", color: 0x0000ff, size: 3, x: -15, y: 20, z: 0 } ) );


}

TXT.addText2 = function () {

	TXT.setNewGroup();

	THR.ground.position.z = -50;

	THR.camera.position.set( -30, -80, 0 )

	//location.hash = "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/files-open-fast/omha-nb-zneth.xml"

	const text = `
Mission 1
Problem: "Make the models pretty"
Solution : export files to prettifiers
Now support translate and export to
>> STL, OBJ, glTF & JSON`;

	const color = 0x11aa33;
	const size = 8;
	const x = -5;
	const y = 45;
	const z = -30; //- THR.center.z;
	//console.log( "text", text );

	TXT.group.add( TXT.getSimpleText( { text, color, size, x, y, z } ) );

};


TXT.addText3 = function () {

	TXT.setNewGroup();

	TXT.group.add( TXT.getSimpleText( { text: "Third post", color: 0xff00ff, x: -20, y: 20 } ) );

};

TXT.getSimpleText = function ( {
	text = "Hello, World!\nThree.js\nabc 123",
	color = 0x006699,
	size = 10,
	x = 0,
	y= 0,
	z = 0
} = {} ) {

	const shapes = font.generateShapes( text, size );

	const geometry = new THREE.ShapeBufferGeometry( shapes );
	geometry.computeBoundingBox();
	//const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
	geometry.translate( x, y, z );
	geometry.rotateX( 0.5 * Math.PI );

	const material = new THREE.MeshBasicMaterial( { color: color, opacity: 0.8, side: 2, transparent: true } );

	const mesh = new THREE.Mesh( geometry, material );
	mesh.castShadow = true

	return mesh;


};


TXT.setNewGroup = function () {


	THR.getGroupNew();

	//THR.scene.remove( TXT.group );

	TXT.group = new THREE.Group();

	THR.scene.add( TXT.group );

};


TXT.addTextContinents = function () {

	THR.scene.remove( TXT.group );

	TXT.group = new THREE.Group();

	//TXT.addBox();

	TXT.getSimpleText( { text: "Africa\n123", color: 0x0000, radius: 65, latitude: "0", longitude: "0" } );
	TXT.getSimpleText( { text: "Europe", color: 0x0085C7, radius: 65, latitude: "50", longitude: "50" } );
	TXT.getSimpleText( { text: "Asia", color: 0xF4C300, radius: 60, latitude: "20", longitude: "130" } );
	TXT.getSimpleText( { text: "Oceania", color: 0x009F3D, latitude: "-10", longitude: "160" } );
	TXT.getSimpleText( { text: "Americas", color: 0xDF0024, radius: "70", latitude: "0", longitude: "-100" } );

	THR.scene.add( TXT.group );

};

