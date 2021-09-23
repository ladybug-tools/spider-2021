// copyright 2020 Theo Armour. MIT license.
/* global GFO, JTVdivJsonTreeView, JTVdivJsonTree */
// jshint eversions: 6
// jshint loopfunc: true


const JTI = {};



JTI.scriptList = [
	//"jti-json-tree-init.js",
	"jtp-json-tree-parse.js",
	"jte-json-tree-edit.js",
	"jtf-json-tree-finder.js",
	"jth-json-tree-helper.js",
];



JTI.schemasHoneybee = [
	"Plane", "Face3D", "Ground", "Outdoors", "Adiabatic", "Surface", "ShadeEnergyPropertiesAbridged", "ShadePropertiesAbridged", "Shade", "ApertureEnergyPropertiesAbridged", "AperturePropertiesAbridged", "Aperture", "DoorEnergyPropertiesAbridged", "DoorPropertiesAbridged", "Door", "FaceEnergyPropertiesAbridged", "FacePropertiesAbridged", "Face", "PeopleAbridged", "LightingAbridged", "ElectricEquipmentAbridged", "GasEquipmentAbridged", "InfiltrationAbridged", "VentilationAbridged", "SetpointAbridged", "RoomEnergyPropertiesAbridged", "RoomPropertiesAbridged", "Room", "WallSetAbridged", "FloorSetAbridged", "RoofCeilingSetAbridged", "ApertureSetAbridged", "DoorSetAbridged", "ConstructionSetAbridged", "OpaqueConstructionAbridged", "WindowConstructionAbridged", "ShadeConstruction", "EnergyMaterial", "EnergyMaterialNoMass", "EnergyWindowMaterialGas", "EnergyWindowMaterialGasCustom", "EnergyWindowMaterialGasMixture", "EnergyWindowMaterialSimpleGlazSys", "EnergyWindowMaterialBlind", "EnergyWindowMaterialGlazing", "EnergyWindowMaterialShade", "IdealAirSystemAbridged", "ProgramTypeAbridged", "ScheduleDay", "ScheduleRuleAbridged", "ScheduleRulesetAbridged", "ScheduleFixedIntervalAbridged", "ScheduleTypeLimit", "ModelEnergyProperties", "ModelProperties", "Model"
];



JTI.init = function () {

	JTI.scriptCount = 0;

	JTI.path = COR.pathContent + "lib-spider-09/jtv-json-tree-view/v-2021-09-16/";

	const info = `parse and display JSON data in a speedy and readable way<br>
<br>
Module name: jtv-json-tree-view<br>
Name space: JTV<br>
Release: 2021-09-16`;

	const htm = `
<details id=JTVdet ontoggle=JTI.onToggle() >

	<summary class="summary-primary gmd-1" >
		JSON tree view
		<span id=MNUspnFile ></span>
		${ MNU.addInfoBox( info ) }
		</summary>

	<p>JSON rendered to a tree view using the Spider JSON Tree View script</p>

	<div id=JTFdivJsonTreeFinder ></div>

	<div id=JTHdivJsonTreeHelper ></div>

	<div id="JTVdivJsonTree"></div>

</details>`;

	JTVdivJsonTreeView.innerHTML = htm;

};



JTI.onToggle = function () {

	if ( !JTVdet.open ) { return; }

	if ( JTI.scriptCount > 0 ) {

		JTI.onLoad();

		return;
	}

	JTI.addScripts( JTI.scriptList, JTI.onLoad );

};



JTI.addScripts = function ( list = JTI.scriptList, callback = JTI.callback ) {

	list.forEach( file => JTI.addOneScript( JTI.path + file, callback ) );

};



JTI.addOneScript = function ( url, callback ) {

	const loader = document.body.appendChild( document.createElement( 'script' ) );

	loader.onload = () => {

		//console.log( "url", url );

		JTI.scriptCount++;
		if ( JTI.scriptCount === JTI.scriptList.length ) { callback(); }

	};

	loader.src = url;

};



JTI.onLoad = function ( event ) {
	console.log( "JTVdet", JTVdet.open );

	if ( window.HBJ ) {

		console.log( "JTP", JTP );

		JTP.json = HBJ.json;
		JTP.schemas = JTI.schemasHoneybee;

		JTVdivJsonTree.innerHTML = JTP.parseJson( JTP.root, JTP.json, 0 );

		const details = JTVdivJsonTree.querySelectorAll( "details" );

		details[ 0 ].open = true;

	}

};


JTI.getThreeJson = function () {

	surfaces = [];

	THR.scene.children[ 5 ].traverse( function ( object ) {

		if ( object.isMesh && object.geometry ) {

			surfaces.push( object.uuid, object.userData );

		}

	} );

	console.log( "surfaces", surfaces );

	return surfaces;

};;


//JTI.init();