////////// Interacting between DOM and 3D

/* global renderer, divPopUp */


// needs: <div id=divPopUp style=position:absolute; ></div>

// three.js mouse interaction with scene



const RAY = {
	raycaster: new THREE.Raycaster(),
	mouse: new THREE.Vector2(),
	intersectObjects: [],
};

RAY.init = function () {

	RAY.intersectObjects = THR.group.children;

	RAY.addMouseMove();


}

RAY.addMouseMove = function () {
	renderer.domElement.addEventListener("mousemove", RAY.onMouseMove);
	renderer.domElement.addEventListener("touchstart", RAY.onMouseMove);
	renderer.domElement.addEventListener("touchmove", RAY.onMouseMove);

	//divInfo.innerHTML = "";
};

RAY.onMouseMove = function (event) {

	//console.log( "event", event  );

	if (event.type === "touchmove" || event.type === "touchstart") {
		event.clientX = event.touches[0].clientX;
		event.clientY = event.touches[0].clientY;
	}

	RAY.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	RAY.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	RAY.raycaster.setFromCamera(RAY.mouse, camera);

	let intersects = RAY.raycaster.intersectObjects(RAY.intersectObjects);

	//console.log( "int", intersects );

	if (intersects.length) {
		RAY.intersected = intersects[0];

		//if ( intersected.instanceId ) {

		//console.log( "intersected", RAY.intersected );

		MNUdivPopUp.hidden = false;
		MNUdivPopUp.style.left = event.clientX + 30 + "px";
		MNUdivPopUp.style.top = event.clientY + "px";
		MNUdivPopUp.innerHTML = RAY.getHtm(RAY.intersected);

		renderer.domElement.addEventListener("click", RAY.onClick);

		//}
	} else {
		if (["touchstart", "touchmove", "mousedown"].includes(event.type)) {
			MNUdivPopUp.hidden = true;
		}

		RAY.intersected = undefined;
	}
};

RAY.onClick = function () {
	if (!RAY.intersected) {
		MNUdivPopUp.hidden = true;
	}

	renderer.domElement.removeEventListener("click", RAY.onClick);
};

RAY.getHtm = function (intersected) {
	//const htm = JSON.stringify( intersected.object, null, "<br>" ).slice( 1, - 1 ).replace( /[",]/g, "");

	const htm = JSON.stringify(intersected.object, null, "\t").replace(/[",]/g, "");

	// htm = `
	// 	<a href="https://en.wikipedia.org/wiki/${ name }" target="_blank">${ name }</a><br>
	// 	${ ( + country[ 6 ] ).toLocaleString() } people
	// 	`;

	return htm;
};

RAY.getHtm = function (intersected) {
	console.log("intersected", RAY.intersected);
	const mesh = RAY.intersected.object;

	const htm = `
	<div>
		id: ${THR.group.children.indexOf( mesh ) }<br>
		geometry: ${ mesh.geometry.type }<br>
		name: ${ mesh.name }</br>
		uuid: ${mesh.uuid}<br>
	</div>`;

	return htm;
};



RAY.getMeshData = function (index) {
	//detNavMenu.open = true;
	//detData.open = true;

	const mesh = group.children[index];

	const htm = JSON.stringify( lines[ index ], null, "\t").replace(/[",]/g, "");

	RAYdivMeshData.innerText = htm;
};
