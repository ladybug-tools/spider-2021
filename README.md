# [![](https://pushme-pullyou.github.io/tootoo-2021/lib/assets/icons/mark-github.svg )](https://github.com/ladybug-tools/spider-2021/ "Source code on GitHub" ) [Spider 2021 Read Me]( https://ladybug-tools.github.io/spider-2021/ "Home page" )

Your 2021 3D happy place for online browsing, composing and exporting many of the standard architecture, engineering and construction (AEC) [open data]( https://en.wikipedia.org/wiki/Open_data ) file types.

## Full screen: [Spider Viewer 2021]( https://ladybug.tools/spider-2021/spider-viewer/)

[Dev Version]( https://ladybug.tools/spider-2021/dev/ )

<!--@@@
<iframe id=ifr src=https://ladybug.tools/spider-2021/spider-viewer/index.html class="iframe-resize" ></iframe>
_Spider Viewer 2021_

<button onclick='ifr.contentWindow.location.hash="https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/hbjson-sample-files/2021/demo05.hbjson"' >cityscape  ~ demo05</button>

@@@-->


## Concept


### 2021-09-18

* The Spider Viewer 2021 is now an early stage work-in-progress

Features
* Open, mix and match 3D: gbXML, Honeybee JSON, Rhino, Radiance, Open Studio, GLTF, STL, OBJ in the same scene
* Open "flat" files: text, HTML, PDF, MP4, WEBM, CSV, GIF, JPG, PNG, SVG etc
* Load files using drag & drop, the file system dialog box or link to files on the Web
* Access dozens of sample files of many types in order to test, experiment and play
* Load many files into a scene, move them about, and save the results to a new file
* Decompress and load models from ZIP files automatically
* View renderer statistics and frames per seconds
* Right-click on any item to view its details in a pop-up menu
* Explore all the JSON data in tree view menu
* Dashboard to adjust: view, scene, model and statistics is speedy easy way
* 1|2|3 fingers to rotate|zoom|pan
* Huge files load fast

Instead of multiple viewers each supporting a single file format, it's now one viewer that reads any number of formats. There's more on the way:

* Faster drawing algorithms. For example. try loading this 21MB model 62K triangles of geometry: [urban_district.hbjson]( https://www.ladybug.tools/spider-2021/spider-viewer/#https://cdn.jsdelivr.net/gh/ladybug-tools/3d-models@master/hbjson-sample-files/2021/Urban_District.zip ). It takes a while lo load, but once it's up: click the reload button. Right-click on and notice the pop-up appears without delay. Over the next few weeks the new algorithms will be refactored into all file format loaders
* More file formats to be added. Anybody want IFC or EPW or Design Explorer support?
* Better user experience in moving, viewing and editing the data
* Of course many - if not all - the features you have enjoyed from previous releases will be added.

As always with the Spider scripts, 
* You don't have to change your ways! All the previous releases continue to be available. Choose to work the way you want.
* The code is so simple and easy to tweak it even runs in Discourse!

And - as is so often the case with open source apps:

* No feedback from users means programmers get bored and work on other projects
* Lots of feedback makes for lots of coding. ;-)

So let's talk about making this the best Spider Viewer!


### Mission

* Provide fast, simple open source file manipulators for many open data Architecture, Engineering, & Construction (AEC) file types for 3D building data
* Load and display a variety of AEC industry standard file formats
	* Rhino 3DM
	* gbXML
	* Khronos [GLTF & GLB]( https://en.wikipedia.org/wiki/GlTF )
	* Ladybug Tools HBJSON
	* EnergyPlus IDF & OSM
	* OBJ
	* Radiance RAD
	* STL
	* VTK
* Load files via URL, operating system file dialog and Drag & Drop
* Load multiple files of various type unto a single scene
* Automatically decompress models in ZIP files and load them into the scene
* Translate double bytes character files to single byte (UTF-16 to UTF-8)

* Export files into industry-standard rendering, animation and gaming formats
* Export a scene with multiple models into a single new file
* Enable a feature-rich 3D interaction with models
* View renderer and frames per second statistics

* Access an extensive collection of sample data files
* Creates a standard user experience across the range of Spider apps
* Become the major Spider project for this year
* Create a single unified set of files for developing and testing the interaction between dozens of modules
* Gather all the Spider 3D file viewers into a single cooperative framework
* Enable new types of reports and presentations
* Simplify testing and adding features across the range of viewers

### Vision

* The issues of communication between the many disciplines in AEC - [Islands of Automation]( https://en.wikipedia.org/wiki/Islands_of_automation ) - become almost non-existent.
* All the apps may share data in near real time with all the other apps.
* All the apps export and import data in the file format of their choice
* The Spider apps "magic" is to read the data in one format and write the data in another format
* The spider process relies on multiple small apps each custom tailored to a single task: translating information from one specific format to another specific format.
* There are be multiple apps for for every format. For example the translator for gbXML files going from a Bentley product to a Sephora may be differnt that the translator for gbXML files going from an NREL product goint to an Autodesk product.
* There may be further forks so that an app is custom-tailored for, say, an Arup's workflow or a  Trane workflow.
* The apps - for the most part - are small and simple coding efforts written in easy to read and decipher formats. They are customizable to specific workflows by entry and medium level developers.


### Problems to be solved

>The [2030 Agenda for Sustainable Development]( https://sustainabledevelopment.un.org/post2015/transformingourworld ), adopted by all United Nations Member States in 2015, provides a shared blueprint for peace and prosperity for people and the planet, now and into the future. At its heart are the 17 Sustainable Development Goals (SDGs), which are an urgent call for action by all countries - developed and developing - in a global partnership. They recognize that ending poverty and other deprivations must go hand-in-hand with strategies that improve health and education, reduce inequality, and spur economic growth – all while tackling climate change and working to preserve our oceans and forests.

All members of the AEC community must take an active role implementing the relevant goals. These may include:

* Goal 1: End poverty in all its forms everywhere
	* Target 1.4: By 2030, ensure that all men and women, in particular the poor and the vulnerable, have equal rights to economic resources, as well as access to basic services, ownership and control over land and other forms of property, inheritance, natural resources, appropriate new technology and financial services, including microfinance &lt;br&gt;
* Goal 11: Make cities and human settlements inclusive, safe, resilient and sustainable

_Further revisions of this document will highlight relevant goal, targets and indicators._

### Proposed solutions / Benefits

* Help clients and developers get up to speed with with what has to be done and with radically more clear explanations on how to do it
* Help gifted, talented and experienced professionals be more productive, useful and
* Guide students and learners into effective pathways for gaining domain expertise
* Bridge the gaps between AEC professionals and computer programmers


## Road map / Import

https://rufus31415.github.io/sandbox/3d-viewer/


### Blender BLEND files

* https://github.com/acweathersby/js.blend


### gbXML

* Schema: https://gbxml.org


### IDF and OSM

* originator: https://www.energyplus.net/


### Honeybee JSON & VTK

* schema: https://github.com/ladybug-tools/honeybee-schema
* https://github.com/ladybug-tools/honeybee-schema/wiki
* schema: https://github.com/ladybug-tools/dragonfly-schema

VTK

* https://github.com/ladybug-tools/honeybee-vtk
* nhttps://github.com/ladybug-tools/honeybee-vtk/blob/master/honeybee_vtk/model.py - has colors in HSL


### Radiance ~ RAD

* schema: https://radiance-online.org/

To-do

* 2021-08-25 ~ fix a number of small issues
* 2021-08-25 ~ add materials


### VTK

* https://vtk.org/Wiki/VTK


### Industry Foundation Classes  ~ IFC

* Your 3D happy place for [IFC]( https://en.wikipedia.org/wiki/Industry_Foundation_Classes ) files is over at [xeoLabs]( https://xeolabs.com/ ). Tell Lindsay that Theo sent you.
* https://github.com/agviegas/IFC.js??


## Export

To-Do

* gbXML
* Export to other formats as requested


## To Do and wishlist

* 2021-08-25 ~ frx.progress text everywhere
* 2021-08-25 ~ import "3json"
* Add Sun path
* Add capture image
* Add insert text
* Edit model position, scale and rotation
* Add Three.js axis editor

## Links of Interest

* https://newbuildings.org/
* https://patternguide.advancedbuildings.net/using-this-guide/analysis-methods/daylight-factor.html


***

<center><img style=color:green; title="Your AEC 3D viewer happy place!" height="24" width="24" src="https://ladybug.tools/artwork/icons_bugs/ico/spider.ico">
</center>
