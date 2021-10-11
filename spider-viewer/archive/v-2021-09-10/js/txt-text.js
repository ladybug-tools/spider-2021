/* Global THR */

const TXT = {};

//TXT.group = new THREE.Group();

let font;
let dragControls

TXT.init = function () {


	info =
`This menu item was used along with modified Spider Viewer for a Zoom presentation to the gbXML Board of Directors meeting.
<br><br>
It is an example of the Spider Viewer being useful with "Augmented Modelling" by adding "virtual" text and graphics to 3D AEC visualizations.
`;


	htm = `
	<details ontoggle=TXT.onToggle(); >
	<summary class="summary-primary gmd-1" >gbXML BoD Presentation
	${ MNU.addInfoBox( info ) }
	</summary>
	<p>
		<button onclick=TXT.addText0() >Title</button>
	</p>
	<p>
		<button onclick=TXT.addText1()>Current state: many file formats</button>
	</p>
	<p>
		<button onclick=TXT.addText2() >Mission 1: prettier models</button>
	</p>
	<p>
		<button onclick=TXT.addText3() >Mission 2: respond to market opportunity</button>
	</p>
	<p>
		<button onclick=TXT.addText4() >As always: "Don't make me change!"</button>
	</p>
	<p>
		<button onclick=TXT.addText5() >Call to action: Where's the action?</button>
	</p>
</details>`;

	TXTdivDetails.innerHTML = htm;

};


TXT.onToggle = function () {


	TXT.group = new THREE.Group();

	TXT.group.name = "TXT.gbxmlBodPresentation";

	THR.scene.add( TXT.group );

	const loader = new THREE.FontLoader();

	const url = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r131/examples/fonts/helvetiker_regular.typeface.json";

	loader.load( url, ( fnt ) => font = fnt );

};



TXT.addText0 = function () {

	dragControls = new THREE.DragControls( THR.group.children, THR.camera, THR.renderer.domElement );
	dragControls.transformGroup = true;
	dragControls.addEventListener( 'dragstart', function ( event ) { THR.controls.enabled = false; } );
	dragControls.addEventListener( 'dragend', function ( event ) { THR.controls.enabled = true; } );

	THR.group.position.set( 70, 30, 40 )
	TXT.setNewGroup();

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
www.ladybug.tools/spider-2021/spider-viewer
Theo Armour
t.armour@gmail.com`

	TXT.group.add( TXT.getSimpleText( { text: text2, color: 0x0000ff, size: 5, x: -15, y: 0, z: 0 } ) );
};



TXT.addText1 = function () {

	TXT.setNewGroup();

	//location.hash = "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/files-open-fast/omha-nb-zneth.xml"

	const text = `Problem of many AEC formats
gbXML plus IFC, IDF, OSM, Radiance, Honeybee JSON ++
++ want more terrain and complex shade elements
Solution: gbXML plays well with all the formats
Benefit: gbXML keeps much design intent in simple format
`;

	const color = 0xaa3344;
	const size = 8;
	const x = -5;
	const y = 45;
	const z = -30; //- THR.center.z;
	//console.log( "text", text );

	TXT.group.add( TXT.getSimpleText( { text, color, size, x, y, z } ) );

};


TXT.addText2 = function () {

	TXT.setNewGroup();

	//location.hash = "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/files-open-fast/omha-nb-zneth.xml"

	const text = `
Mission 1
Problem: "Make the models pretty"
Solution : export files to prettifiers
Now support translate and export to
>> STL, OBJ, glTF, JSOM + gbXML?!?`;

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

	//location.hash = "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/files-open-fast/omha-nb-zneth.xml"

	const text = `
Mission 2: respond to market needs
* Send gbXML files to OpenStreetMaps
* Combine gbXML and LIDAR files from drones
* Send gbXML to Maya, Rhino and Blender
* gbXML/glTF >> real architects working for Unreal & Unity
* Fix errors & pass ASHRAE Validator
* gbXML rocks in virus-preventative design
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

	//location.hash = "https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/gbxml-sample-files/files-open-fast/omha-nb-zneth.xml"

	const text = `
Call to action / Looking for team
* Community manager
* Marketing help
* Co-developers
Have 100s users average 3 to 37 minutes per session
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

	//THR.getGroupNew();

	THR.scene.remove( TXT.group );

	TXT.group = new THREE.Group();

	THR.scene.add( TXT.group );

	THR.ground.position.z = -50;

	THR.camera.position.set( -30, -80, 0 );

	THR.controls.target.copy( new THREE.Vector3() )

};
