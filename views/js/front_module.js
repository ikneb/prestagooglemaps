var labels = '';
var labelIndex = 0;
var map;
var LatLngList = [];
var files;
var markers = [];
var poly;
var polies = [];
var coord_poly = [];

$(window).load(function () {
    var _map = JSON.parse(map_set.replace(new RegExp('&quot;', 'gm'), '"'));
    var _markers = JSON.parse(markers_set.replace(new RegExp('&quot;', 'gm'), '"'));
    var _polylines = JSON.parse(polies_set.replace(new RegExp('&quot;', 'gm'), '"'));

    renderMarkers(map, _markers, _map);
    renderPoly(map, _polylines, _map);
});

function renderMarkers(map, _markers, _map) {

    if (_markers.length > 0) {
        jQuery.each(_markers, function () {
            var coord = this.coordinates;
            var latlng = coord.split(',');
            var location = {lat: parseInt(latlng[0]), lng: parseInt(latlng[1])};
            var marker = new google.maps.Marker({
                position: location,
                label: labels[labelIndex++ % labels.length],
                map: map,
            });
            if (this.method == 1) {
                var icon = {
                    url: this.icon,
                    scaledSize: new google.maps.Size(35, 35)
                };
                marker.setIcon(icon);
            } else if (this.method == 2) {
                var icon = {
                    url: '/modules/prestagooglemaps/views/image/marker-icon/' + this.icon,
                    scaledSize: new google.maps.Size(50, 50)
                };
                marker.setIcon(icon);
            }
            if (this.label_text.length > 1) {
                marker.setTitle(this.label_text);
            }
            if (this.window_text.length > 1) {
                var contentString = '<div>' + this.window_text + '</div>';
                google.maps.event.clearListeners(marker, 'click');
                google.maps.event.addListener(marker, 'click', function () {

                    var infowindow = new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 300
                    });
                    infowindow.open(map, marker);
                });
            } else if (this.animation.length > 1) {
                if (this.animation == 'BOUNCE') {
                    marker.addListener('click', function () {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                        setTimeout(function () {
                            marker.setAnimation();
                        }, 2100);
                    });
                } else if (this.animation == 'DROP') {
                    marker.addListener('click', function () {
                        marker.setAnimation(google.maps.Animation.DROP);
                    });
                }
            } else if (this.link.length > 1) {
                var value = this.link;
                google.maps.event.clearListeners(marker, 'click');
                google.maps.event.addListener(marker, 'click', function () {
                    window.open(value);
                });
            } else if (this.script.length > 1) {
                google.maps.event.clearListeners(marker, 'click');
                var script = this.script;
                google.maps.event.addListener(marker, 'click', function () {
                    eval(script);
                });
            }
            markers.push(marker);
        });
        //set position map if isset markers
        if (markers.length > 0 && _map[0]['coord'] == '') {
            var latlngbounds = new google.maps.LatLngBounds();
            markers.forEach(function (latLng) {
                latlngbounds.extend(latLng.getPosition());
            });
            map.setCenter(latlngbounds.getCenter());
            map.fitBounds(latlngbounds);
        } else if (_map[0]['coord'] != '') {
            var latLng = _map[0]['coord'].split(',');
            map.setCenter(new google.maps.LatLng(parseFloat(latLng[0]), parseFloat(latLng[1])));
            map.setZoom(Number(_map[0]['zoom']));
        }
    }
}


/**
 *  Render polylines on admin page
 */
function renderPoly(map, _polylines, _map) {
    if (markers_set.length > 0) {
        jQuery.each(_polylines, function () {
            var flightPlanCoordinates = '[' + this.coordinates + ']';
            flightPlanCoordinates = flightPlanCoordinates.replace(new RegExp('lat', 'gm'), '"lat"').
                replace(new RegExp('-', 'gm'), ',').replace(new RegExp('!', 'gm'), ':').
                replace(new RegExp(' &lt;', 'gm'), '{').replace(new RegExp('&gt;', 'gm'), '}').
                replace(new RegExp('lng', 'gm'), '"lng"');
            flightPlanCoordinates = JSON.parse(flightPlanCoordinates);

            var poly = new google.maps.Polyline({
                path: flightPlanCoordinates,
                geodesic: true,
                strokeColor: this.color,
                strokeOpacity: 1.0,
                strokeWeight: this.thick
            });
            poly.setMap(map);
        });
    }
}

