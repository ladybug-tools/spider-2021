/* Global THR */

const TXT = {};

TXT.group = new THREE.Group();

let font;


TXT.init = function () {

	TXT.group = new THREE.Group();

	THR.scene.add( TXT.group );

	const loader = new THREE.FontLoader();

	const url = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r115/examples/fonts/helvetiker_regular.typeface.json";

	loader.load( url, ( fnt ) => { font = fnt; TXT.group.add( TXT.getSimpleText() ); } );

};


TXT.addText = function( { text = "First Post\nThree.js\nabc 123",
	color = 0x006699,
	size = 3,
	x = 70,
	y = 0,
	z = 0 } = {}) {


	//console.log( "text", text );
	TXT.group.add( TXT.getSimpleText( { text, color, size, x, y, z } ) );

}

TXT.addText2 = function () {

	TXT.group.add( TXT.getSimpleText( { text: "Second post", color: 0x0000ff, x: 20, y: 20 } ) );

};


TXT.addText3 = function () {

	THR.scene.remove( TXT.group );

	TXT.group = new THREE.Group();

	THR.scene.add( TXT.group );

	TXT.group.add( TXT.getSimpleText( { text: "Third post", color: 0xff00ff, x: -20, y: 20 } ) );

};

TXT.getSimpleText = function ( {
	text = "Hello, World!\nThree.js\nabc 123",
	color = 0x006699,
	size = 3,
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

	return mesh;


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

