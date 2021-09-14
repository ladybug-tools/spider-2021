// copyright 2020 Theo Armour. MIT license.;
/* global GFO, JTVdivJsonTreeView, JTVdivJsonTree */
// jshint eversions: 6
// jshint loopfunc: true


const SSO = {};



SSO.init = function () {

	const info = "life is nice!";

	const htm = `

	<details id=SSOdet >

		<summary class="summary-primary gmd-1" >
			Set Surface Type Opacity
		<span id=MNUspnFile ></span>
		${ MNU.addInfoBox( info ) }
			</summary>

		<p>Set the transparency level for types of surfaces</p>

		<p>
		<label title="Slide me">
			Opacity Aperture surfaces: <output id=outAirBoundary>100</output>
			<input id=rngOpacityAirBoundary type=range oninput=SSO.setOpacity("Aperture",this.value);outAirBoundary.value=this.value;
				min=1 max=100 value=100>
		</label>
		</p>

		<p>
		<label title="Slide me">
			Opacity Floor surfaces: <output id=outFloor>100</output>
			<input id=rngOpacityFloor type=range oninput=SSO.setOpacity("Floor",this.value);outFloor.value=this.value;
				min=1 max=100 value=100>
		</label>
		</p>

				<p>
		<label title="Slide me">
			Opacity RoofCeilings surfaces: <output id=outRoofCeiling>100</output>
			<input id=rngOpacityRoofCeiling type=range oninput=SSO.setOpacity("RoofCeiling",this.value);outRoofCeiling.value=this.value;
				min=1 max=100 value=100>
		</label>
		</p>

		<p>
		<label title="Slide me">
			Opacity Shade surfaces: <output id=outShade>100</output>
			<input id=rngOpacityShade type=range oninput=SSO.setOpacity("Shade",this.value);outShade.value=this.value;
				min=1 max=100 value=100>
		</label>
		</p>

		<p>
		<label title="Slide me">
			Opacity Wall surfaces: <output id=outWall>100</output>
			<input id=rngOpacityWall type=range oninput=SSO.setOpacity("Wall",this.value);outWall.value=this.value;
				min=1 max=100 value=100>
		</label>
		</p>

	</details>

`;

	SSOdivSetSurfaceOpacity.innerHTML = htm;

};



SSO.setOpacity = function ( surfaceType = "Shade", value = 100) {

	surfaces = [];

	THR.scene.children[ 5 ].children[ 0 ].traverse( function ( object ) {

		if ( object.isMesh ) {

			//console.log( "object", object.name );

			//surfaces.push( object );

			// object.geometry.userData.mergedUserData.forEach( obj => {

				if ( object.name === surfaceType ) {

					console.log( "pbj", object );
					object.material.transparent = true;
					object.material.opacity = value / 100;
					object.material.needsUpdate = true;

				}

			//} )


		}

	} );

	//console.log( "surfaces", surfaces );

};

// SSO.onLoad = function ( event ) {
// 	//console.log( "JTVdet", JTVdet.open );

// 	if ( !SSOdet.open ) { return; }


// 	SSO.jsonThree = SSO.getThreeJson();

// 	SSOdivSetSurfaces.innerHTML = JTP.parseJson( "three", JTP.jsonThree, 0 );

// };


// SSO.getThreeJson = function () {

// 	surfaces = [];

// 	THR.scene.children[ 5 ].traverse( function ( object ) {

// 		if ( object.isMesh && object.geometry ) {

// 			surfaces.push( object.uuid, object.userData );

// 		}

// 	} );

// 	console.log( "surfaces", surfaces );

// 	return surfaces;

// };