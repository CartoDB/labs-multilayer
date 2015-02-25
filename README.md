# Toggle layers in CartoDB

Multilayer is achieved through an angularjs-based selector (to keep HTML as clean and self-contained as possible) and a basemap-agnostic (i.e. it works with Leaflet, Google maps or whatever) logic.

One layer per visualization and one visualization per layer.

Example URL:

http://multilayer.cartodb.io/multilayer.html?u=dcarrion&t=multilayer&v=9c5ed27c-ad4f-11e4-ae79-0e853d047bba&tt=Multilayer%20map&d=Description%20test

URL params:

* u: username
* t: table with the layers
* v: viz.json UUID for the basemap (this visualization may contain data as well, but please remember this layer is *not* included in the selector and can't be hidden)
* tt: Title of the map
* d: Description - Keep it short!

Required row fields in the layer table:

* cartodb_id: not used
* the_geom: not_used
* name: name to appear in the selector
* show: true if layer is to be displayed initially
* viz_json: URL for the viz.json that corresponds to the visualization (takes precedence over sql and cartocss)
* sql: SQL query for the data in the layer (used if viz_json is not present)
* sql_user: user name for the SQL query (used if viz_json is not present)
* cartocss: CartoCSS for the layer (used if viz_json is not present)
* interactivity: Fields to interact with for the layer (used if viz_json is not present)
* created_at: not used
* modified_at: not used
