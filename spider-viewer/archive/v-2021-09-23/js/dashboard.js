const DBD = {};

DBD.init = function () {


	const htm = `

	<footer id=THRftr title="Settings for >> View :: Scene :: Model :: Statistics">

		<div class=THRdivButtonGroup>
			<button class="THRbutParent gmd-1" onclick="THR.zoomObjectBoundingSphere();" title="reset the view"><img
					height=32 width=32
					src="https://cdn.glitch.com/7af242e2-0cf2-4179-8c41-b2f2cb982c5a%2Fnoun_Home_3359355.svg"> </button>
			<div class="THRdivChild gmd-2">

				<div title="Camera frustum near plane.">
					camera near: <output id=outNear>1</output>
					<input type=range id=inpNear value=1
						oninput=THRU.setCameraNear(this);outNear.value=THR.camera.near.toFixed();>
				</div>

				<div>
					<label id=lblFOV title="Camera frustum vertical field of view. Perspective camera only">
						field of view: <output id=outFov>40</output>
						<input id=rngFieldOfView type=range oninput=THRU.setFieldOfView(this);outFov.value=this.value;
							min=1 max=179 value=40>
					</label>
				</div>
				<div><button id=THRUbutOrtho class="THRbutChild"
						onclick="THRU.toggleCameraOrthoPerspective();">ortho|perspective</button></div>

				<div><button id=THRUbutViews class="THRbutChild gmd-1"
						onclick="THRdivViews.hidden=!THRdivViews.hidden;">views</button></div>

				<div id=THRdivViews class="THRdivChildChild gmd-2" hidden>

					<button class="THRbutChild" onclick="THRU.setCameraPosition('top');">top</button>
					<button class="THRbutChild" onclick="THRU.setCameraPosition('front');">front</button>
					<button class="THRbutChild" onclick="THRU.setCameraPosition('back');">back</button>
					<button class="THRbutChild" onclick="THRU.setCameraPosition('right');">right</button>
					<button class="THRbutChild" onclick="THRU.setCameraPosition('left');">left</button>
					<button class="THRbutChild" onclick="THRU.setCameraPosition('bottom');">bottom</button>

				</div>

				<div> <button class="THRbutChild" onclick="THR.zoomToFitObject();">zoom fit</button></div>
			</div>
		</div>

		<div class=THRdivButtonGroup title="Settings that update the entire scene">
			<button class="THRbutParent gmd-1" onclick="THR.controls.autoRotate=!THR.controls.autoRotate"
				title="toggle the rotation">&circlearrowright;</button>
			<div class="THRdivChild gmd-2">

				<div> <button class="THRbutChild" title="Show or hide the fog"
						onclick="THR.scene.fog.far=THR.scene.fog.far === THR.radius * 8 ? 999999 :  THR.radius * 8;">fog</button>
				</div>
				<div> <button class="THRbutChild" onclick="THR.cameraHelper.visible=!THR.cameraHelper.visible"
						title="Show or hide the shadow area frustum">light box</button></div>

				<div> <button class="THRbutChild" title="Show or hide the floor"
						onclick="THR.ground.visible=!THR.ground.visible">ground plane</button></div>
				<div> <button class="THRbutChild" title="Show or hide the RGB|XYZ bars"
						onclick="THR.axesHelper.visible=!THR.axesHelper.visible">axes</button></div>

			</div>
		</div>

		<div class=THRdivButtonGroup title="Settings that update just the model">
			<button class=THRbutParent onmouseover=THRdivMaterials.hidden=true; onclick="THR.setAllVisible();"
				title="Show all surfaces">
				&sdotb;
			</button>

			<div class="THRdivChild gmd-2">

				<div><button id=THRUbutMaterials class="THRbutChildParent gmd-1"
						onclick="THRdivMaterials.hidden=!THRdivMaterials.hidden;">materials</button>
				</div>

				<div id=THRdivMaterials class="THRdivChildChild gmd-2" style=top:0rem;>

					<button class="THRbutChild" onclick="THRC.setExposureMaterial();" ">Exposure type</button>
					<button class=" THRbutChild" onclick="THRC.setPhongDefaultMaterial();">Shades of gray</button>
					<button class="THRbutChild" onclick="THRC.setNormalMaterial();">Normals</button>
					<button class="THRbutChild" onclick="THRC.setImageTexture();">Images</button>
					<button class="THRbutChild" onclick="THRC.setRandomMaterial();">Random colors</button>
					<button class="THRbutChild" onclick="THRC.setDefaultMaterial();">Default materials</button>

				</div>

				opacity: <output id=THRoutOpacity>85</output>%
				<input type=range id="THRrngOpacity" oninput=THRU.setObjectOpacity();THRoutOpacity.value=this.value
					value=85>
				<button class="THRbutChild" onclick="THRU.toggleBoundingBoxHelper();">bounding box</button>
				<button class="THRbutChild" onclick="THRU.toggleWireframe();">wireframe</button>
				<button class="THRbutChild" onclick="THRU.toggleMeshEdges();">edges</button>
				<div><button class="THRbutChild" onclick="GBX.toggleSpaceTitles();">titles</button></div>


			</div>
		</div>

		<div class=THRdivButtonGroup>
			<button class=THRbutParent onclick="THR.setStats();"
				title="View frames per second and number of draw calls. Used for testing performance">fps</button>
			<div class="THRdivChild gmd-2">


				<div>
					<button class="THRbutChild" onclick="alert( 'What else do you need to see here?' );">??</button>
				</div>
				<div>
					<button class="THRbutChild" id=butDark onclick=MNU.toggleDarkMode();
						title="The efforts on this feature have just begun...">dark</button>
				</div>


			</div>
		</div>

	</footer>


`;

	DBDdivDashboard.innerHTML = htm;

}

