// copyright 2020 Theo Armour. MIT license.;
/* global GFO, JTVdivJsonTreeView, JTVdivJsonTree */
// jshint eversions: 6
// jshint loopfunc: true


// SSO = Set Surface Opacity
const SSO = {};


SSO.init = function () {

	const info = `
<p>Adjust the opacity of different types of surfaces</p >
File: ssp-set-surface-opacity<br>
Name space: SSO<br>
Release: 2021-09-15<br>
`;

	const htm = `

	<details id=SSOdet ontoggle=SSO.setHandler() >

		<summary class="summary-primary gmd-1" >
		Set Surface Type Opacity
		<span id=MNUspnFile ></span>
		${ MNU.addInfoBox( info ) }
			</summary>

		<p>Set the transparency level for types of surfaces</p>

		<div id=SSOdivSliders></div>



	</details>

`;

	SSOdivSetSurfaceOpacity.innerHTML = htm;

};




SSO.setHandler = function () {

	for ( child of THR.group.children ) {

		if ( child.name.endsWith( "hbjson" ) ) {

			const htm = `

		<h3>Honeybee JSON</h3>
		<p>
		<label title="Slide me">
			Opacity Aperture surfaces: <output id=outAirBoundary>100</output>
			<input id=rngOpacityAirBoundary type=range oninput=SSO.setOpacityHbjson("Aperture",this.value);outAirBoundary.value=this.value;
				min=1 max=100 value=100>
		</label>
		</p>

		<p>
		<label title="Slide me">
			Opacity Floor surfaces: <output id=outFloor>100</output>
			<input id=rngOpacityFloor type=range oninput=SSO.setOpacityHbjson("Floor",this.value);outFloor.value=this.value;
				min=1 max=100 value=100>
		</label>
		</p>

				<p>
		<label title="Slide me">
			Opacity RoofCeilings surfaces: <output id=outRoofCeiling>100</output>
			<input id=rngOpacityRoofCeiling type=range oninput=SSO.setOpacityHbjson("RoofCeiling",this.value);outRoofCeiling.value=this.value;
				min=1 max=100 value=100>
		</label>
		</p>

		<p>
		<label title="Slide me">
			Opacity Shade surfaces: <output id=outShade>100</output>
			<input id=rngOpacityShade type=range oninput=SSO.setOpacityHbjson("Shade",this.value);outShade.value=this.value;
				min=1 max=100 value=100>
		</label>
		</p>

		<p>
		<label title="Slide me">
			Opacity Wall surfaces: <output id=outWall>100</output>
			<input id=rngOpacityWall type=range oninput=SSO.setOpacityHbjson("Wall",this.value);outWall.value=this.value;
				min=1 max=100 value=100>
		</label>
		</p>
`;

			SSOdivSliders.innerHTML += htm;

		}


		if ( child.name.endsWith( "3dm" ) ) {

			surfaces = THR.group.children[ 0 ].children;
			//console.log( "surfaces", surfaces );

			cols = surfaces.map( surface => "" + surface.material.color.r +
				"," + surface.material.color.g + "," + surface.material.color.b + "" );

			colors = [ ...new Set( cols ) ];
			console.log( "colors", colors );

			let htm = "<h3>Rhino 3DM</hs>";
			colors.forEach( ( color, i ) => {

				htm += `
<p>
<label title="Slide me">
	Color ${ color }: <output id=outColor${ i } >100</output>
	<input id=rngColor${ i } type=range oninput=SSO.setOpacity3dm(${ i },this.value);outColor${ i }.value=this.value;
		min=1 max=100 value=100>
</label>
</p>`;
			} );


			SSOdivSliders.innerHTML += htm;

		}

	}


};


SSO.setOpacityHbjson = function ( surfaceType = "Shade", value = 100 ) {

	THR.group.traverse( function ( object ) {

		if ( object.isMesh ) {

			//console.log( "object", object );

			if ( object.name === surfaceType ) {

				//console.log( "obj", object );
				object.material.transparent = true;
				object.material.opacity = value / 100;
				object.material.needsUpdate = true;

			}

		}

	} );

	//console.log( "surfaces", surfaces );

};


SSO.setOpacity3dm = function ( index, value ) {

	THR.group.traverse( function ( object ) {

		object.castShadow = false;

		if ( object.isMesh && !object.material.vertexColors ) {

			color = "" + object.material.color.r +
				"," + object.material.color.g + "," + object.material.color.b + "";

			if ( color === colors[ index ] ) {

				//console.log( "obj", object );
				object.material.transparent = true;
				object.material.opacity = value / 100;
				object.material.needsUpdate = true;


			}
			//object.visible = object.material.vertexColors ? true : false;

		}

	} );
}