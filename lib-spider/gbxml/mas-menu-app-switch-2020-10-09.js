// copyright 2020 Ladybug Tools authors. MIT license.


const MAS = {};


MAS.arrApps = [

	{
		text: "Select Ladybug Tools / Spider Apps", url: "https://ladybug.tools",
		title: "free computer applications that support environmental design and education"
	},
	{
		text: "Ladybug Tools home page", url: "https://ladybug.tools",
		title: "free computer applications that support environmental design and education"
	},
	{
		text: "Ladybug Tools GitHub", url: "https://github.com/ladybug-tools",
		title: "Source code repositories"
	},
	{
		text: "gbXML.org home page", url: "http://www.gbxml.org",
		title: "Green Building XML (gbXML) is the language of buildings ... allowing disparate building design software tools to all communicate with one another."
	},
	{
		text: "gbXML.org Schema", url: "http://www.gbxml.org/schema_doc/6.01/GreenBuildingXML_Ver6.01.html",
		title: "Version 6.01 of the gbXML schema"
	},
	{
		text: "Spider home page (2017-2018)", url: "https://ladybug.tools/spider/",
		title: "3D interactive analysis in your browser mostly written around the Three.js JavaScript library"
	},
	{
		text: "Spider gbXML Viewer R12 'Aragog'", url: "https://www.ladybug.tools/spider/gbxml-viewer/",
		title: "A popular release"
	},
	{
		text: "Spider gbXML Viewer R14", url: "https://www.ladybug.tools/spider/gbxml-viewer/r14/aragog-shortcut.html",
		title: "An interesting release"
	},
	{
		text: "Spider gbXML Tools home page (2019)", url: "https://www.ladybug.tools/spider-gbxml-tools/",
		title: "Home page for tools to help you find, load, examine and edit gbXML files - in large numbers and sizes"
	},
	{
		text: "Spider gbXML Viewer v0.17 'Maevia' stable", url: "https://www.ladybug.tools/spider-gbxml-tools/spider-gbxml-viewer/",
		title: "Mission: run a series of basic checks on gbXML files to identify, report and help you fix any issues."
	},
	{
		text: "Spider 2020 home page", url: "https://www.ladybug.tools/spider-2020/spider-2020/",
		title: "Latest development release - still under development - may have issues"
	},
	{
		text: "Spider gbXML Viewer v-2020-xx-xx pre-release", url: "https://www.ladybug.tools/spider-2020/spider-gbxml-viewer/",
		title: "Latest development release - still under development - may have issues"
	},
	{
		text: "Spider gbXML Fixer", url: "https://www.ladybug.tools/spider-gbxml-fixer/",
		title: "Scripts to help you load, manage and fix 3D issues in gbXML files"
	},
	{
		text: "Spider IDF|OSM Viewer", url: "https://www.ladybug.tools/spider-2020/spider-idf-viewer/",
		title: "Scripts to help you load and view NREL IDF and OSM files"
	},
	{
		text: "Radiance Online home page", url: "https://www.radiance-online.org/",
		title: "Radiance is a suite of programs for the analysis and visualization of lighting in design."
	},
	{
		text: "Spider RAD viewer", url: "https://www.ladybug.tools/spider-2020/spider-radiance-viewer/",
		title: "View Radiance RAD files in interactive 3D in your browser using the Three.js JavaScript library"
	}

];


MAS.getAppSwitch = function () {

	const options = MAS.arrApps.map( item =>
		`<option value="${ item.url }" title="${ item.title }" >${ item.text }</option>`
	).join( "" );

	const htm = `<select oninput=window.location.href=this.value >${ options }</select>`;

	return htm;

};


