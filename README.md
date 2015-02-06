# labs-multilayer

Multilayer is achieved through an angularjs-based selector (to keep HTML as clean and self-contained as possible) and a basemap-agnostic (i.e. it works with Leaflet, Google maps or whatever) logic.

One layer per visualization and one visualization per layer.

Example URL:

http://cartodb.github.io/labs-multilayer/multilayer.html?u=dcarrion&t=multilayer&v=9c5ed27c-ad4f-11e4-ae79-0e853d047bba

URL params:

* u: username
* t: table with the layers
* v: viz.json UUID for the basemap (this visualization may contain data as well, but please remember this layer is *not* included in the selector and can't be hidden)

Required row fields in the layer table:

* cartodb_id: not used
* the_geom: not_used
* name: name to appear in the selector
* viz_json: URL for the viz.json that corresponds to the visualization
* created_at: not used
* modified_at: not used
