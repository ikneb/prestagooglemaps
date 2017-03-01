var labels = '';
var labelIndex = 0;
var map;
var markers = [];
var LatLngList = [];
var files;
var poly;
var polies = [];
var coord_poly = [];


function initMap() {
    var myLatlng = {lat: 51.508530, lng: -0.076132};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: myLatlng
    });
    addListenerForAddMarkers();
}

function addListenerForAddMarkers() {
    google.maps.event.addListener(map, 'click', function (event) {
        $('.marker__title').remove();
        var newLi = document.createElement('div');
        id_marker = addMarker(event.latLng, map) - 1;//asdasdasdasdasdasssssssssssssssssssssssssssssssssssssssssssssssssssssss_ID
        newLi.innerHTML =
            '<div class="panel"><h3></i>Marker</h3>' +
            '<p>This information must be provided when you report an issue on our bug tracker or forum.</p>' +
            '<div class="panel-footer"><button type="submit" class="btn btn-default pull-right"' +
            'name=""><i class="process-icon-save"></i> Save</button>' +
            '<a href="" class="btn btn-default"><i class="process-icon-cancel">' +
            '</i> Cancel</a>' +
            '</div></div>';
        markers__list.appendChild(newLi);
    });
}

function addMarker(location, map) {
    var marker = new google.maps.Marker({
        position: location,
        label: labels[labelIndex++ % labels.length],
        map: map,
    });
    return markers.push(marker);
}

function switchBetveenPolyMark() {
    map.setOptions({draggableCursor: 'url(http://maps.google.com/mapfiles/openhand.cur), move'});
    google.maps.event.clearListeners(map, 'click');
    addListenerForAddMarkers();
}

function getPathVariableCode(line) {
    var codeStr = '';
    var pathArr = line.getPath();
    for (var i = 0; i < pathArr.length; i++) {
        codeStr += '    {lat: ' + pathArr.getAt(i).lat() + ', lng: ' + pathArr.getAt(i).lng() + '}';
        if (i !== pathArr.length - 1) {
            codeStr += ',\n';
        }
    }

    return codeStr;
};

$(document).ready(function () {
    $('body').on('click', '#maps-template .nav-tabs a', function (e) {
        e.preventDefault();
        var _this = $(this);
        var link = _this.attr('href');
        $('.tab').addClass('no-display');
        $(link).removeClass('no-display');
        _this.closest('.nav-tabs').find('.active').removeClass('active');
        _this.closest('li').addClass('active');

        switch (link) {
            case '#polylines__list':
                switchBetveenPolyMark();
                $('.polylines__add').removeClass('no-display');

                break;
            case '#markers__list' :
                break;
        }
    });

    $('body').on('click', '.polylines__add', function (e) {
        e.preventDefault();
        var newLi = document.createElement('div');
        newLi.innerHTML =
            '<div class="panel"><h3></i>Marker</h3>' +
            '<div class="form-group row"><label class="col-md-3">Thickness of the line</label><input type="number" name="thick" class="form-control col-md-4" ></div>' +
            '<div class="panel-footer"><button type="submit" class="btn btn-default pull-right polyline__save"' +
            'name=""><i class="process-icon-save"></i> Save</button>' +
            '<a href="" class="btn btn-default polyline__remove"><i class="process-icon-cancel">' +
            '</i> Cancel</a>' +
            '</div></div>';

        polylines__list.appendChild(newLi);

        poly = new google.maps.Polyline({
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            editable: true
        });
        map.setOptions({draggableCursor: 'crosshair'});
        poly.setMap(map);
        google.maps.event.clearListeners(map, 'click');
        map.addListener('click', function (event) {

            var path = poly.getPath();
            path.push(event.latLng);
            coord_poly = getPathVariableCode(poly);

        });
        $('.polylines__add').addClass('no-display');

    });

    $('body').on('click', '.polyline__save', function (e) {
        e.preventDefault();
        switchBetveenPolyMark()
        $('.polylines__add').removeClass('no-display');
        console.log(coord_poly);
    });

    $('body').on('click', '.polyline__remove', function (e) {
        e.preventDefault();
        switchBetveenPolyMark()
        $('.polylines__add').removeClass('no-display');

    });
});