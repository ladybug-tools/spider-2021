// copyright 2020 Theo Armour. MIT license.

const MNU = {

	path: "./"

};

MNU.title = document.title ? document.title : location.href.split( "/" ).pop().slice( 0, - 5 ).replace( /-/g, " " );

MNU.init = function () {

	if ( window.innerWidth > 640 && window.innerHeight > 500 ) {

		detNavMenu.open = true;

	}

	if ( !window.MNUdivPopUp ) {

		MNUdivPopUp = document.body.appendChild( document.createElement( 'div' ) );
		MNUdivPopUp.id = "MNUdivPopUp";
		MNUdivPopUp.hidden = true;

	}



	// <div id=MNUdivHeader ></div>
	MNUdivHeader.innerHTML = `
<header>

	<h2>
		<a id=aGithub target="_top" title="Source code on GitHub">
			<img src="${ MNU.path }lib/assets/icons/mark-github.svg">
		</a>

		<a href="" title="Click to reload this page">
			<span id=spnTitle>${ MNU.title }</span>
			<span id=spnVersion></span>
		</a>
		&nbsp;
		<span class="info">
			<img class=infoImg src="${ MNU.path }lib/assets/icons/noun_Information_585560.svg">
			<div class="infoTooltip gmd-5">
			<div id="divDescription"></div>
			version <span id=spnVersionInfo ></span>
			</div>
		</span>

	</h2>

</header>`;


	// <div id=MNUdivFooter ></div>
	MNUdivFooter.innerHTML = `
<footer>

	<hr>

	<center>
		<a id=aMenuIcon class=aDingbat href="javascript:sumNavMenu.scrollIntoView();" title="Scroll to top" >❦</a>
	</center>

</footer>`;

};



MNU.unhidePopUpCentered = function ( html = "howdy" ) {

	MNUdivPopUp.hidden = false;
	MNUdivPopUp.style.top = "50%";
	MNUdivPopUp.style.left = "50%";
	MNUdivPopUp.style.transform = "translate(-50%, -50%)";
	MNUdivPopUp.innerHTML = html;

};


MNU.toggleDarkMode = function ( button ) {

	if ( button.innerHTML.includes( "dark" ) ) {

		//root.style.backgroundColor = "#1e1f23";
		document.body.style.color = "#aaa";
		navMenu.style.backgroundColor = "#555";

		THR.scene.background = new THREE.Color( 0x222222 );
		//THR.scene.fog.far = 999999;

		//const summaries = document.querySelectorAll(".summary-secondary");
		//console.log( "", summaries );

		Array.from( document.querySelectorAll( "a" ) )
			.forEach( a => a.style.color = "#ccc" );

		Array.from( document.querySelectorAll( "input,select,option" ) )
			.forEach( iso => iso.style.backgroundColor = "#bbb" );

		document.documentElement.style.setProperty( "--color-2-background", "#888" );
		Array.from( document.querySelectorAll( ".summary-primary" ) )
			.forEach( sum => sum.style.backgroundColor = "#888" );

		document.documentElement.style.setProperty( "--color-3-background", "#bbb" );
		Array.from( document.querySelectorAll( ".summary-secondary" ) )
			.forEach( sum => sum.style.backgroundColor = "#bbb" );


		MNUdivPopUp.style.backgroundColor = "#333";

		button.innerHTML = "light";

		return;

	}

	//root.style.backgroundColor = "#1e1f23";
	document.body.style.color = "teal";
	navMenu.style.backgroundColor = "#fafffa";

	THR.scene.background = new THREE.Color( 0xcce0ff );
	//THR.scene.fog.far = THR.radius * 8;

	const summaries = document.querySelectorAll( ".summary-primary" );
	Array.from( summaries ).forEach( sum => sum.style.backgroundColor = "#eee" );

	divPopUp.style.backgroundColor = "#eee";

	button.innerHTML = "dark";

};


