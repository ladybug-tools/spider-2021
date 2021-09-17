// copyright 2020 Theo Armour. MIT license.
/* global GFO, JTPdivJsonTreeView, JTPdivJsonTree */
// jshint esversion: 6
// jshint loopfunc: true


const JTP = {};


JTP.root = "model";
JTP.json = undefined;



JTP.schemas = [
	"Plane", "Face3D", "Ground", "Outdoors", "Adiabatic", "Surface", "ShadeEnergyPropertiesAbridged", "ShadePropertiesAbridged", "Shade", "ApertureEnergyPropertiesAbridged", "AperturePropertiesAbridged", "Aperture", "DoorEnergyPropertiesAbridged", "DoorPropertiesAbridged", "Door", "FaceEnergyPropertiesAbridged", "FacePropertiesAbridged", "Face", "PeopleAbridged", "LightingAbridged", "ElectricEquipmentAbridged", "GasEquipmentAbridged", "InfiltrationAbridged", "VentilationAbridged", "SetpointAbridged", "RoomEnergyPropertiesAbridged", "RoomPropertiesAbridged", "Room", "WallSetAbridged", "FloorSetAbridged", "RoofCeilingSetAbridged", "ApertureSetAbridged", "DoorSetAbridged", "ConstructionSetAbridged", "OpaqueConstructionAbridged", "WindowConstructionAbridged", "ShadeConstruction", "EnergyMaterial", "EnergyMaterialNoMass", "EnergyWindowMaterialGas", "EnergyWindowMaterialGasCustom", "EnergyWindowMaterialGasMixture", "EnergyWindowMaterialSimpleGlazSys", "EnergyWindowMaterialBlind", "EnergyWindowMaterialGlazing", "EnergyWindowMaterialShade", "IdealAirSystemAbridged", "ProgramTypeAbridged", "ScheduleDay", "ScheduleRuleAbridged", "ScheduleRulesetAbridged", "ScheduleFixedIntervalAbridged", "ScheduleTypeLimit", "ModelEnergyProperties", "ModelProperties", "Model"
];



JTP.parseJson = function ( key = "", item = {}, index = 0 ) { //console.log( '', key, item, index );
	const type = typeof item;

	if ( [ "string", "number", "boolean", "null", "bigint" ].includes( type ) || !item ) {

		return JTP.getString( key, item, index );

	} else if ( type === 'object' ) {

		return Array.isArray( item ) ? JTP.getArray( key, item, index ) : JTP.getObject( key, item, index );

	}

};



JTP.getString = function ( key, item, index ) { //console.log( 'string', key, item, index  );

	const htm = JTP.schemas.includes( item ) ?

		`<div>${ key }: <a href="https://ladybug-tools.github.io/honeybee-schema/model.html#tag/${ item.toLowerCase() }_model" style=background-color:yellow;color:green;cursor:help; target="_blank">${ item }</a></div>`
		:
		`<div>${ key }: <span style=color:green >${ item }<span></div>`;

	return htm;

};



JTP.getArray = function ( key, array, index ) { //console.log( 'Array', key, array );

	const htm = array.map( ( item, index ) => JTP.parseJson( key, item, index ) ).join( "" );

	return `<details style="margin: 1ch 0 1ch 1ch;" >
		<summary>${ key } [ ${ array.length } ]</summary>${ htm }
	</details>`;

};



JTP.getObject = function ( key, item, index ) {

	//if ( !item ) { console.log( 'error:', key, item, index ); return; }

	const keys = Object.keys( item );
	const htm = keys.map( key => JTP.parseJson( key, item[ key ] ) ).join( "" );

	return `<details style="margin: 1ch 0 1ch 1ch;" >
		<summary>${ key } ${ index }: { ${ keys.length } }</summary>${ htm }
	</details>`;

};
