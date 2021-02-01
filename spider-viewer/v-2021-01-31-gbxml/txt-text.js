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

	THR.ground.position.z = -500;

	htm = `
<details open>
	<summary class="summary-primary gmd-1" >gbXML BoD Presentation</summary>
	<p>
		<button onclick=TXT.addText0() >Title</button>
	</p>
	<p>
		<button onclick=TXT.addText1()>Mission 1: fewer viewers</button>
	</p>
	<p>
		<button onclick=TXT.addText2() >Mission 2: prettier models</button>
	</p>
	<p>
		<button onclick=TXT.addText3() >Mission 3: "Don't make me change!"</button>
	</p>
	<p>
		<button onclick=TXT.addText4() >As always: build better buildings</button>
	</p>
	<p>
		<button onclick=TXT.addText5() >Call to action: Where's the action?</button>
	</p>
</details>`;

	TXTdivDetails.innerHTML = htm;

};


TXT.addText0 = function () {


	TXT.setNewGroup();

	THR.ground.position.z = -50;

	THR.camera.position.set( -30, -80, 0 );

	text = "gbXML\nBoard of Directors Meeting\n2021-01-31";
	color = 0x11aa33;
	size = 8;
	x = -5;
	y = 35;
	z = -30; //- THR.center.z;
	console.log( "text", text );
	TXT.group.add( TXT.getSimpleText( { text, color, size, x, y, z } ) );

	//TXT.group.add( TXT.getSimpleText( { text, color, size, x, y, z } ) );

	text2 = `
www.ladybug.tools/spider-2021/spider-viewer/
Theo Armour
t.armour@gmail.com`

	TXT.group.add( TXT.getSimpleText( { text: text2, color: 0x0000ff, size: 5, x: -15, y: 0, z: 0 } ) );
};



TXT.addText1 = function () {

	TXT.setNewGroup();

	THR.ground.position.z = -50;

	THR.camera.position.set( -30, -80, 0 );

	//location.hash = "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/files-open-fast/omha-nb-zneth.xml"

	const text = `
Mission 1
Problem: too many viewers
Solution : single viewer opens
>> gbXML, Radiance, IDF & OSM,
>> Honeybee JSON and more`;

	const color = 0xaa6644;
	const size = 8;
	const x = -5;
	const y = 45;
	const z = -30; //- THR.center.z;
	//console.log( "text", text );

	TXT.group.add( TXT.getSimpleText( { text, color, size, x, y, z } ) );

};


TXT.addText2 = function () {

	TXT.setNewGroup();

	THR.ground.position.z = -50;

	THR.camera.position.set( -30, -80, 0 );

	//location.hash = "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/files-open-fast/omha-nb-zneth.xml"

	const text = `
Mission 2
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

	THR.ground.position.z = -50;

	THR.camera.position.set( -30, -80, 0 );

	//location.hash = "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/files-open-fast/omha-nb-zneth.xml"

	const text = `
Mission 3
* Send gbXML files to OpenStreetMaps
* Send gbXML to Maya, Rhino and Blender
* Fix errors & pass ASHRAE Validator
`;

	const color = 0x0000dd;
	const size = 8;
	const x = -5;
	const y = 45;
	const z = -30; //- THR.center.z;
	//console.log( "text", text );

	TXT.group.add( TXT.getSimpleText( { text, color, size, x, y, z } ) );

};



TXT.addText4 = function () {

	TXT.setNewGroup();

	THR.ground.position.z = -50;

	THR.camera.position.set( -30, -80, 0 );

	//location.hash = "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/files-open-fast/omha-nb-zneth.xml"

	const text = `
As always
* Fast on phone, tablet and workstation
* Choose your version - long term support
* Plain vanilla easy-peasy JavaScript
--Pollination:React|PerkinsWill:Angular, BuildSim??
* FOSS on GitHub/no charge consulting
`;

	const color = 0x0044dd;
	const size = 8;
	const x = -5;
	const y = 45;
	const z = -30; //- THR.center.z;
	//console.log( "text", text );

	TXT.group.add( TXT.getSimpleText( { text, color, size, x, y, z } ) );

};




TXT.addText5 = function () {

	TXT.setNewGroup();

	THR.ground.position.z = -50;

	THR.camera.position.set( -30, -80, 0 );

	//location.hash = "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/files-open-fast/omha-nb-zneth.xml"

	const text = `
Call to action / Looking for team
* Community manager
* Marketing help
* Co-developers
Have 100s users average 8 minutes per session
Start-up opportunity for peeps younger than me
`;

	const color = 0x0044dd;
	const size = 8;
	const x = -5;
	const y = 45;
	const z = -30; //- THR.center.z;
	//console.log( "text", text );

	TXT.group.add( TXT.getSimpleText( { text, color, size, x, y, z } ) );

};

TXT.getSimpleText = function ( {
	text = "Hello, World!\nThree.js\nabc 123",
	color = 0x006699,
	size = 10,
	x = 0,
	y = 0,
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
	mesh.castShadow = true;

	return mesh;


};


TXT.setNewGroup = function () {

	THR.getGroupNew();

	THR.scene.remove( TXT.group );

	TXT.group = new THREE.Group();

	THR.scene.add( TXT.group );

};
