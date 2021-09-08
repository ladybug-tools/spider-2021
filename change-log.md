# Change Log

## 2021-09-07


* GFF Sample Files Gallery supports arrays of extensions per gallery
* FRX File Read & XHR supports HTML, Markdown, a variety of images files including SVG using the operating system file dialog, drag & drop or a URL. Other files types that seem to work iinclude
PDF, CSF, MP4, TXT, WEBM


## 2021-09-04

	<iframe src=https://www.ladybug.tools/spider-2021/spider-viewer/v-2021-09-04/spider-viewer.html width=100% height=500 ></iframe>

* Now loads and display all HBJSON shade types (still some triangulation issues here and there)
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

