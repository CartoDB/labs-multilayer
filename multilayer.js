function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
}

var user = getURLParameter('u');
var table = getURLParameter('t');
var uuid = getURLParameter('v');
var title = getURLParameter('tt');
var description = getURLParameter('d');
var baseVizJsonUrl = "http://" + user + ".cartodb.com/api/v2/viz/" + uuid + "/viz.json";

var multilayer = angular.module('multilayer', []);
multilayer.controller('SelectorCtrl', function ($scope) {
    var cartodbLayers = [];

    $scope.title = title;
    $scope.description = description;

    $scope.selectedLayers = [];

    $scope.layersUpdated = function (id) {
        var sublayer = cartodbLayers[id];
        if ($scope.selectedLayers[id]) {
            sublayer.show();
        } else {
            sublayer.hide();
        }
    };

    cartodb.createVis('map', baseVizJsonUrl, {
        zoom: 3,
        center_lat: 5,
        center_lon: 0,
        loaderControl: false,
        zoomControl: false
    }).done(function (vis) {
        var map = vis.getNativeMap();

        var sql = new cartodb.SQL({user: user});
        sql.execute("SELECT name, viz_json FROM " + table + " WHERE name IS NOT NULL")
            .done(function (data) {
                $scope.layers = data.rows;
                for (var id = 0; id < $scope.layers.length; ++id) {
                    layer = $scope.layers[id];
                    layer.id = id;
                    $scope.selectedLayers[id] = true;
                    cartodb.createLayer(map, layer.viz_json)
                        .addTo(map)
                        .done(function (layer) {
                            cartodbLayers.push(layer);
                        })
                        .error(function (error) {
                            console.log("error: " + error);
                        });
                }
                $scope.$apply();
            })
            .error(function (errors) {
                console.log("errors: " + errors);
            });
    });
});
