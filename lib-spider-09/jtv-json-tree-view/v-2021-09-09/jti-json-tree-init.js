// copyright 2020 Theo Armour. MIT license.
/* global GFO, JTVdivJsonTreeView, JTVdivJsonTree */
// jshint eversions: 6
// jshint loopfunc: true


const JTI = {};


JTI.schemasHoneybee = [
	"Plane", "Face3D", "Ground", "Outdoors", "Adiabatic", "Surface", "ShadeEnergyPropertiesAbridged", "ShadePropertiesAbridged", "Shade", "ApertureEnergyPropertiesAbridged", "AperturePropertiesAbridged", "Aperture", "DoorEnergyPropertiesAbridged", "DoorPropertiesAbridged", "Door", "FaceEnergyPropertiesAbridged", "FacePropertiesAbridged", "Face", "PeopleAbridged", "LightingAbridged", "ElectricEquipmentAbridged", "GasEquipmentAbridged", "InfiltrationAbridged", "VentilationAbridged", "SetpointAbridged", "RoomEnergyPropertiesAbridged", "RoomPropertiesAbridged", "Room", "WallSetAbridged", "FloorSetAbridged", "RoofCeilingSetAbridged", "ApertureSetAbridged", "DoorSetAbridged", "ConstructionSetAbridged", "OpaqueConstructionAbridged", "WindowConstructionAbridged", "ShadeConstruction", "EnergyMaterial", "EnergyMaterialNoMass", "EnergyWindowMaterialGas", "EnergyWindowMaterialGasCustom", "EnergyWindowMaterialGasMixture", "EnergyWindowMaterialSimpleGlazSys", "EnergyWindowMaterialBlind", "EnergyWindowMaterialGlazing", "EnergyWindowMaterialShade", "IdealAirSystemAbridged", "ProgramTypeAbridged", "ScheduleDay", "ScheduleRuleAbridged", "ScheduleRulesetAbridged", "ScheduleFixedIntervalAbridged", "ScheduleTypeLimit", "ModelEnergyProperties", "ModelProperties", "Model"
];


JTI.init = function () {

	const info = "life is good!";

	const htm = `

	<details id=JTVdet ontoggle=JTI.onLoad() >

		<summary class="summary-primary gmd-1" >
			JSON tree view
		<span id=MNUspnFile ></span>
		${ MNU.addInfoBox( info ) }
			</summary>

		<p>JSON rendered to a tree view using the Spider JSON Tree View script</p>

		<div id="JTVdivJsonTree"></div>

		<hr>

		<div id="JTVdivViewThree"></div>

	</details>

`;

	JTVdivJsonTreeView.innerHTML = htm;

};



JTI.onLoad = function ( event ) {
	//console.log( "JTVdet", JTVdet.open );

	if ( !JTVdet.open ) { return; }

	if ( HBJ ) {

		console.log( "", 23 );

		JTP.json = HBJ.json;
		JTP.schemas = JTI.schemasHoneybee;

		JTVdivJsonTree.innerHTML = JTP.parseJson( JTP.root, JTP.json, 0 );

		const details = JTVdivJsonTree.querySelectorAll( "details" );

		details[ 0 ].open = true;

	} //else {

		// JTP.jsonThree = JTI.getThreeJson();

		// JTVdivViewThree.innerHTML = JTP.parseJson( "three", JTP.jsonThree , 0 );

	//}




};


JTI.getThreeJson = function () {

	surfaces = [];

	THR.scene.children[ 5 ].traverse( function ( object ) {

		if ( object.isMesh && object.geometry) {

			surfaces.push( object.uuid, object.userData );

		}

	} );

	console.log( "surfaces", surfaces );

	return surfaces;

}