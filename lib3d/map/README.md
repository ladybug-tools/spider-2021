<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://theo-armour.github.io/2020/lib/map/readme.html  "View file as a web page." ) </span>

<div><input type=button onclick=window.top.location.href="https://github.com/theo-armour/2020/tree/master/lib/map/";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>


# [MAP Read Me]( https://theo-armour.github.io/2020/lib/map/readme.html )

<!--@@@
<div style=height:500px;overflow:hidden;width:100%;resize:both; ><iframe src=https://theo-armour.github.io/2020/lib/map/ height=100% width=100% ></iframe></div>
_MAP in a resizable window. One finger to rotate. Two to zoom._
@@@-->

### Full Screen: [MAP]( https://theo-armour.github.io/2020/lib/map/ )


## Concept

This section follws the concept described in [A Pattern Language]( https://en.wikipedia.org/wiki/A_Pattern_Language ) in which a problem is described and then a solution is offered.

_The folowing sections are all all still at an early stage._

### Problems to be solved

* Outcomes for construction projects are downgraded in terms of time, cost, quality and sustainability because access to the site and the terrain of the site were not fully taken into account
* Outcome for COVID-19 prevention are downgraded must consider the ability to view the statistics at all levels of detail raging from global perspective down to the "nitty-gritty" of a neighborhood
* Outcomes for virtual Burning Man events are downgraded because the visualization of temples and other installations at multiple venues around the world not synchronized with the shading and shadow of the actual location

### Propose solution

* Interactive maps that display terrain in 3D overlaid by 2D bitmaps 
* Provide an address, place name or latitude & longitude and the map is displayed nearly instantly
* Works on phone, tablet or workstation
* Etc

### Features

* A hackable 3D map - easy-peasy code - single dependency: three.js
* Light weight code hosted on static server scraping needed data at run-time
	* Uses public APIs
* Any latitude, longitude and zoom level
	* 7 types of overlay available in current version
* Bitmaps from any global bitmap tile server
	* Current version sources height maps from https://mapbox.cpm
* Fully asynchronous operation - let it all happen whenever it wants to happen
* Access to Google Geocoder provides fast and easy access to latitude and longitude
* Any location may be re-accesses by permalinks created on-the-fly



## To Do / Wish List


### Very soon

* Retain settings such as number of rows and columns when other attributes are updated
* Directly enter latitude and longitude in the menu
* Enable saving overlay type to location hash
* Enable saving rows, columns and height scale to location hash

### In due course

* Right-click menu
	* Display latitude and longitude and elevation
	* Button to go to next zoom level at that location
* Set given latitude and longitude to be exactly at the origin
* Add buildings wherever the data is available
* Add Sun range and analemma diagrams
* Add a Burning Man "street map" to any location and have it "decal" the terrain
* Add interaction, titling, GeoJSON mapping overlays
* Add people dancing in the street
* Add nearby places labels
* Link to see same view in Google Earth, Google Street View and other services


## Issues


## Links of Interest

Jaanga

* https://jaanga.github.io/terrain3/elevations-core3/elevations-core3-r1.html

OSM 
* https://wiki.openstreetmap.org/wiki/Zoom_levels
* https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Resolution_and_Scale

Reddits to post to

* https://www.reddit.com/r/InternetIsBeautiful/
* https://www.reddit.com/r/MapPorn/


## Change Log

### 2020-08-03 ~ Theo

* Add canonical link for https
* Add more locations
* More fixes to heightmap and bitmap issues
* many read me updates

The project is really beginning to look good. After all these years it's really nice to see something like this really working as expected.

### 2020-08-02 ~ Theo

Eureka! The height maps and bitmaps at different zoom levels seems to be working OK


Mostly working as expected

* Enable the bitmaps and height maps to use different zoom levels - in order to have te bitmaps represent greater detail and to allow for lower resolution height maps on slower devices


### 2020-08-01

* Add: Enable selecting the number of rows and columns to tiles to display
* Refactor: MAP.getTilesBitmaps

### 2020-07-31

* Add: * Enable selecting from the various sources bitmap tile servers 
* Add: direction arrows and code to update location
* Add: Update the height scale in real time with a slider


### 2020-07-24

* First commit


***

<center title="hello! Click me to go up to the top" ><a href=javascript:window.scrollTo(0,0); style=font-size:2ch;text-decoration:none; > ❦ </a></center>
