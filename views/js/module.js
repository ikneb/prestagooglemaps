var labels = '';
var labelIndex = 0;
var map;
var markers = [];
var LatLngList = [];
var files;
var poly;
var polies=[];


function initMap() {
    var myLatlng = {lat: 51.508530, lng: -0.076132};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: myLatlng
    });
    addListenerForAddMarkers(myLatlng);
}

function  addListenerForAddMarkers(myLatlng){
    google.maps.event.addListener(map, 'click', function (event) {
        var newLi = document.createElement('li');

        id_marker = addMarker(event.latLng, map) - 1;
        newLi.innerHTML =
            '<button class="marker__remove button button-primary">Delete marker</button>';
        markers__list.appendChild(newLi);
       /* getMarker(newLi);*/

        /*clickDownlosd();*/

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

$(document).ready(function(){
    $('body').on('click', '#maps-template .nav-tabs a', function(e){
        e.preventDefault();
        var _this = $(this);
        var link = _this.attr('href');
        $('.tab').addClass('no-display');
        $(link).removeClass('no-display');

        _this.closest('.nav-tabs').find('.active').removeClass('active');
        _this.closest('li').addClass('active');
    });

});