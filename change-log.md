# Change Log

## 2021-09-18

* Dashboard ~ Adjust: view, scene, model and statistics
	* Four buttons to click
	* Touch each button for pop-up menu with more choices
	* Not all choices fully operational or debugged
* JSON Tree View
	* View JSON files a tree view
	* Very simple code
	* HTML5 only
	* No CSS needed
	* Good number of sample files available for testing
	* View raw data
	* Help text throughout
	* Search and highlight facility

Current development focuses on Honeybee JSON. In a week or so, development will return focus to gbXML - adding the new simpler speedier parsing and display algorithms and more

## 2021-09-11

* Spider Viewer and TooToo combine into one app. View files of many types - 3D and 2D - including Markdown, PDF, HTML files and many more. Menus are beginning to work together. Library files being made deployable to any repo

## 2021-09-07

* GFF Sample Files Gallery supports arrays of extensions per gallery
* FRX File Read & XHR supports HTML, Markdown, a variety of images files including SVG using the operating system file dialog, drag & drop or a URL. Other files types that seem to work including
PDF, CSV, MP4, TXT, WEBM


## 2021-09-04

	<iframe src=https://www.ladybug.tools/spider-2021/spider-viewer/v-2021-09-04/spider-viewer.html width=100% height=500 ></iframe>

* Now loads and displays all HBJSON shade types (still some triangulation issues here and there)
* Commented: //renderer.outputEncoding = THREE.sRGBEncoding; ~ changes the coloring a lot - not sure whether good or not
* Add scene.traverse: updateVertexNormals & material.needsUpdate - improves shading and shadows
* Add generate animated GIF ~ 512x512 experimental feature ~ Try it from the Exporters menu
* Update exp-exporter.js menu
* Update user interaction:
	* When single model open: mouse down updates entire scene
	* When multiple models open: mouse down over building moves the building. mouse down in space updates the scene
* Fixes to drag and drop process

The animated GIF routine is adapted from Mr.doob's example.

* demo:  https://mrdoob.github.io/omggif-example/
* code: https://github.com/mrdoob/omggif-example

The GIF are created in less than minute. So it's fThe limiting feature is that GIF only supports 256 colors

The idea behind this feature is to help you get your designs into Instagram and even TikTok. If anybody is interested in animated GIFs I will continue, otherwise I may move on to MP4 videos. In any case, still image capture will happen soon.

