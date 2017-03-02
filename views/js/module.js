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
            '<div class="panel" data-id="'+id_marker+'"><h3></i>Marker</h3>' +
            '<div class="form-group"><label class="col-md-4 control-label"><span>Name</span></label>' +
            '<input type="text" name="name" class="form-control marker__name"></div>' +
            '<div class="form-group"><label class="col-md-4 control-label"><span>Icon</span></label>' +
            '<select name="method" class="marker__method">'+
            '<option value="0">Select</option>'+
            '<option value="1">Download</option>'+
            '<option value="2">Default</option>'+
            '</select></div>' +
            '<div class="form-group action-wrap"><label class="col-md-4 control-label"><span>Action</span></label>' +
            '<select name="action" class="marker__action">'+
            '<option value="0">Select</option>'+
            '<option value="1">Title hover</option>'+
            '<option value="2">Info window(click)</option>'+
            '<option value="3">Animate effect(click)</option>'+
            '<option value="4">Link(click)</option>'+
            '<option value="5">Custom script(click)</option>'+
            '</select></div>' +
            '<div class="panel-footer"><button type="submit" class="btn btn-default pull-right"' +
            'name=""><i class="process-icon-save marker__save"></i> Save</button>' +
            '<a href="" class="btn btn-default"><i class="process-icon-cancel marker__remove-panel">' +
            '</i></a>' +
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

    /**
     * Select action on the click for marker
     */
    jQuery(document).on('click', '.marker__action', function (e) {
        e.preventDefault();
        var _this = $(this);
        var select = _this.val();
        var id = _this.closest('.panel').attr('data-id');

        switch (select) {
            case '1':
                if (!_this.closest('.panel').find('.marker__title').hasClass('marker__title')) {
                    _this.closest('.panel').find('.action-wrap').after(
                        '<div class="form-group"><label class="col-md-4 control-label"><span>Title</span></label>' +
                        '<textarea  name="title" class="marker__title"></textarea>' +
                        '<div class="marker__remove col-md-4"><a href="title" title="Delete" class="delete">'+
                        '<i class="icon-trash"></i> Delete</a></div></div>'
                    );
                }
                break;
            case '2':
                if (!_this.closest('.panel').find('.isset-click').hasClass('isset-click')) {
                    _this.closest('.panel').find('.action-wrap').after(
                        '<div class="form-group"><label class="col-md-4 control-label"><span>Info Window</span></label>' +
                        '<textarea  name="window" class=" isset-click marker__window"></textarea>' +
                        '<div class="marker__remove col-md-4"><a title="Delete" class="delete">'+
                        '<i class="icon-trash"></i> Delete</a></div></div>'
                    );
                }
                break;
            case '3':
                if (!_this.closest('.panel').find('.isset-click').hasClass('isset-click')) {
                    _this.closest('.panel').find('.action-wrap').after(
                        '<div class="form-group"><label class="col-md-4 control-label"><span>Animation</span></label>' +
                        '<select name="action" class="marker__animation isset-click">'+
                        '<option value="0">Select animation effect</option>'+
                        '<option value="BOUNCE">BOUNCE</option>' +
                        '<option value="DROP">DROP</option>' +
                        '</select><div class="marker__remove col-md-4"><a title="Delete" class="delete">'+
                        '<i class="icon-trash"></i> Delete</a></div></div>'
                    );
                }
                break;
            case '4':
                if (!_this.closest('.panel').find('.isset-click').hasClass('isset-click')) {
                    _this.closest('.panel').find('.action-wrap').after(
                        '<div class="form-group"><label class="col-md-4 control-label"><span>Redirect link</span></label>' +
                        '<input type="text" name="link" class="form-control marker__link isset-click">'+
                        '<div class="marker__remove col-md-4"><a href="link" title="Delete" class="delete">'+
                        '<i class="icon-trash"></i> Delete</a></div></div>'
                    );
                }
                break;
            case '5':
                if (!_this.closest('.panel').find('.isset-click').hasClass('isset-click')) {
                    _this.closest('.panel').find('.action-wrap').after(
                        '<div class="form-group"><label class="col-md-4 control-label"><span>Script</span></label>' +
                        '<textarea  name="title" class="marker__script"></textarea>' +
                        '<div class="marker__remove col-md-4"><a  title="Delete" class="delete">'+
                        '<i class="icon-trash"></i> Delete</a></div></div>'
                    );
                }
                break;
        }
    });


    /**
     * Add action when hover and render title marker
     */
    $('body').on('keyup', '.marker__title', function(e){
        e.preventDefault();
        var id = $(this).closest('.panel').attr('data-id');
        var value = $(this).val();
        markers[id].setTitle(value);
    });

    /**
     * Add listener whit window on click marker
     */
    $('body').on('keyup', '.marker__window', function(e){
        e.preventDefault();
        var id = $(this).closest('.panel').attr('data-id');
        var value = $(this).val();
        var contentString = '<div>' + value + '</div>';
        google.maps.event.clearListeners(markers[id], 'click');
        google.maps.event.addListener(markers[id], 'click', function () {

            var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 300
            });
            infowindow.open(map, markers[id]);
        });
    });

    /**
     * Add listener whit animate effect on click marker
     */
    $('body').on('click', '.marker__animation', function (e) {
        e.preventDefault();
        var select = $(this).val();
        var id = $(this).closest('.panel').attr('data-id');

        switch (select) {
            case '0':
                markers[id].setAnimation();
                break;
            case 'BOUNCE':
                markers[id].addListener('click', function () {
                    markers[id].setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function(){
                        markers[id].setAnimation();
                    }, 2100);
                });
                break;
            case 'DROP':
                markers[id].addListener('click', function () {
                    markers[id].setAnimation(google.maps.Animation.DROP);
                });
                break;
            case '3':

                break;
        }
    });

    /**
     * Add listener whit redirect link on click marker
     */
    $('body').on('keyup', '.marker__link', function (e) {
        e.preventDefault();
        var id = $(this).closest('.panel').attr('data-id');
        var value = $(this).val();
        google.maps.event.clearListeners(markers[id], 'click');
        google.maps.event.addListener(markers[id], 'click', function () {
            window.open(value);
        });
    });


    /**
     * Add listener whit custom script on click marker
     */
    $('body').on('keyup', '.marker__script', function (e) {
        e.preventDefault();
        var id = $(this).closest('.panel').attr('data-id');
        var value = $(this).val();
        google.maps.event.clearListeners(markers[id], 'click');
        google.maps.event.addListener(markers[id], 'click', function () {
            eval(value);
        });
    });


    /**
     * Remove action  marker
     */
    $('body').on('click', '.marker__remove a', function (e) {
        e.preventDefault();
        var _this = $(this);
        var id = _this.closest('.panel').attr('data-id');
        var action = _this.attr('href');
        switch (action) {
            case 'title' :
                markers[id].setTitle();
                break;
            default :
                google.maps.event.clearListeners(markers[id], 'click');

        }
        _this.closest('.form-group').remove();
    });

    /**
     * Remove marker
     */
    jQuery(document).on('click', '.marker__remove-panel', function (e) {
        e.preventDefault();
        var id = $(this).closest('.panel').attr('data-id');
       /* var id_map_post = jQuery(this).closest('.marker__wrapper').attr('data-postid');*/
       $(this).closest('.panel').remove();
        markers[id].setMap(null);
        /*jQuery.ajax({
            type: 'POST',
            url: '/wp-content/plugins/googlmapsareas/ajax.php',
            data: {
                action: 'remove_marker',
                id_marker: id,
                id_map_post: id_map_post,
            },
            success: function (data) {
                process(data);
            }
        });*/

    });




    $('body').on('click', '.polylines__add', function (e) {
        e.preventDefault();
        var newLi = document.createElement('div');
        newLi.innerHTML =
            '<div class="panel"><h3></i>Marker</h3>' +
            '<div class="form-group"><label class="col-md-4 control-label"><span>Name of the line</span></label>' +
            '<input type="text" name="name" class="form-control"></div>' +
            '<div class="form-group"><label class="col-md-4 control-label"><span>Thickness of the line</span></label>' +
            '<input type="number" name="thick" class="form-control polyline__thick" value="2"></div>' +
            '<div class="form-group"><label class="col-md-4 control-label"><span>Color</span></label>' +
            '<select name="select" class="polyline__color">'+
            '<option value="#000000">Black</option>'+
            '<option value="#FF0000">Red</option>'+
            '<option value="#0000F0">Blue</option>'+
            '<option value="#008000">Green</option>'+
            '<option value="#808080">Gray</option>'+
            '</select></div>' +
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

    });

    $('body').on('click', '.polyline__remove', function (e) {
        e.preventDefault();
        switchBetveenPolyMark()
        $('.polylines__add').removeClass('no-display');
        poly.setMap(null);
        jQuery(this).closest('.panel').remove();
    });

    $('body').on('keyup', '.polyline__thick', function(){
        var thick = $(this).val();
        poly.setOptions({strokeWeight: thick});
    });

    $('body').on('click', '.polyline__color', function(){
        var color = $(this).val();
        poly.setOptions({strokeColor: color});
    });
});