var labels = '';
var labelIndex = 0;
var map;
var LatLngList = [];
var files;
var markers = [];
var poly;
var polies = [];
var coord_poly = [];


function initMap() {
    var myLatlng = {lat: 51.508530, lng: -0.076132};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: myLatlng
    });

    renderMarkers(map);
    renderPoly(map);
    addListenerForAddMarkers();
}

function renderMarkers(map) {
    if (markers_set.length > 0) {
        jQuery.each(markers_set, function () {
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
        if (markers.length > 0 && typeof coord_set === 'undefined') {
            var latlngbounds = new google.maps.LatLngBounds();
            markers.forEach(function (latLng) {
                latlngbounds.extend(latLng.getPosition());
            });
            map.setCenter(latlngbounds.getCenter());
            map.fitBounds(latlngbounds);
        } else if (coord_set != undefined && zoom_set != undefined) {
            var latLng = coord_set.split(',');
            map.setCenter(new google.maps.LatLng(parseFloat(latLng[0]), parseFloat(latLng[1])));
            map.setZoom(Number(zoom_set));
        }
    }
}

/**
 *  Render polylines on admin page
 */
function renderPoly(map) {
    if (markers_set.length > 0) {
        jQuery.each(polylines_set, function () {
            var flightPlanCoordinates = '[' + this.coordinates + ']';
            flightPlanCoordinates = flightPlanCoordinates.replace(new RegExp('lat', 'gm'), '"lat"');
            flightPlanCoordinates = flightPlanCoordinates.replace(new RegExp('lng', 'gm'), '"lng"');
            //flightPlanCoordinates = flightPlanCoordinates.replace(new RegExp('([0-9.]+)','gm'), '$1');
            flightPlanCoordinates = JSON.parse(flightPlanCoordinates);

            console.log(flightPlanCoordinates);
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

function getMarker(newLi) {
    jQuery.ajax({
        type: 'POST',
        url: '/modules/prestagooglemaps/ajax.php',
        data: {ajax: 'get_all_markers'},
        success: function (data) {
            var all_marker_name = JSON.parse(data);
            jQuery.each(all_marker_name, function () {
                jQuery(newLi).find('.marker__default-icon').append('<option value="' + this + '.png">' + this + '</option>');
            });
        }
    });
}


function addListenerForAddMarkers() {
    google.maps.event.addListener(map, 'click', function (event) {
        $('.marker__title').remove();
        var newLi = document.createElement('div');
        addMarker(event.latLng, map);
        id_marker = markers.length - 1;
        newLi.innerHTML =
            '<div class="panel" data-id="' + id_marker + '" data-coord="' +
            event.latLng.lat().toFixed(3) + ',' + event.latLng.lng().toFixed(3) + '"><h3>Marker</h3>' +
            '<form enctype="multipart/form-data" class="upload-img"  id="upload-img" method="post">' +
            '<div class="form-group"><label class="col-md-4 control-label"><span>Name</span></label>' +
            '<input type="hidden" name="id_map" value="' + $('#maps-template').attr('data-id') + '">' +
            '<input type="hidden" name="id_marker">' +
            '<input type="hidden" name="coordinates" value="' +
            event.latLng.lat().toFixed(3) + ',' + event.latLng.lng().toFixed(3) + '">' +
            '<input type="text" name="name" class="form-control marker__name"></div>' +
            '<div class="form-group method-wrapp"><label class="col-md-4 control-label"><span>Icon</span></label>' +
            '<select name="method" class="marker__method">' +
            '<option value="0">Default</option>' +
            '<option value="1">Download</option>' +
            '<option value="2">Icons</option>' +
            '</select></div>' +
            '<div class="form-group no-display method"><label class="col-md-4 control-label"><span></span></label>' +
            '<select name="icon" class="marker__default-icon">' +
            '</select></div>' +
            '<div class="form-group no-display download" id="img">' +
            '<div class="download-form">' +
            '<button type="submit" class="upload_image_button button">Upload</button>' +
            '<button type="submit" class="remove_image_button button">&times;</button>' +
            '<input id="my_file" class="custom-file-input" type="file" name="my_file"></div>' +
            '<img class="img"  src="/modules/prestagooglemaps/views/image/default.png" width="116px" height="116px"/>' +
            '</div>' +
            '<div class="form-group action-wrap"><label class="col-md-4 control-label"><span>Action</span></label>' +
            '<select name="action" class="marker__action">' +
            '<option value="0">Select</option>' +
            '<option value="1">Title hover</option>' +
            '<option value="2">Info window(click)</option>' +
            '<option value="3">Animate effect(click)</option>' +
            '<option value="4">Link(click)</option>' +
            '<option value="5">Custom script(click)</option>' +
            '</select></div>' +
            '<div class="panel-footer"><button type="submit" class="btn btn-default pull-right"' +
            'name=""><i class="process-icon-save marker__save"></i> Save</button>' +
            '<a href="" class="btn btn-default"><i class="process-icon-cancel marker__remove-panel">' +
            '</i></a>' +
            '</div></form></div>';
        markers__list.appendChild(newLi);
        getMarker(newLi);
        $(newLi).find('.panel').attr('data-id', id_marker);

    });
}

jQuery(document).load(function () {

});


$(document).ready(function () {


    /**
     * Change map name
     */
    $('body').on('click', '.update_name', function (e) {
        e.preventDefault();
        var name = $('.map_name').val();
        var id_map = $(this).closest('.maps-template').attr('data-id');

        $.ajax({
            type: 'POST',
            url: '/modules/prestagooglemaps/ajax.php',
            data: {
                ajax: 'update_name',
                name: name,
                id_map: id_map
            },
            success: function (data) {
                if (data) {
                    $('.alert-success').removeClass('no-display');
                    setTimeout(function () {
                        $('.alert-success').addClass('no-display');
                    }, 2500);
                } else {
                    $('.alert-danger').removeClass('no-display');
                    setTimeout(function () {
                        $('.alert-danger').addClass('no-display');
                    }, 2500);
                }
            }
        });
    });

    /**
     * Change map name
     */
    $('body').on('keyup', '.map_name', function (e) {
        e.preventDefault();
        var name = $(this).val();
        $(this).closest('#main').find('.page-title').html('Edit: ' + name);
    });


    $('body').on('click', '.marker__default-icon', function (e) {
        e.preventDefault();
        var img = $(this).val();
        var id = $(this).closest('.panel').attr('data-id');

        if (img == 'default') {
            markers[id].setIcon();
        } else {
            var icon = {
                url: '/modules/prestagooglemaps/views/image/marker-icon/' + img,
                scaledSize: new google.maps.Size(50, 50)
            };
            markers[id].setIcon(icon);
        }
    });

    $('body').on('click', '#maps-template .nav-tabs a', function (e) {
        e.preventDefault();
        if ($(this).closest('li').hasClass('disabled')) {
            return false;
        }
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
     * Select method icon change
     */
    $('body').on('click', '.marker__method', function () {
        var _this = $(this);
        var val = _this.val();
        if (val == 1) {
            _this.closest('.panel').find('.download').removeClass('no-display');
            _this.closest('.panel').find('.method').addClass('no-display');
        } else if (val == 2) {
            _this.closest('.panel').find('.method').removeClass('no-display');
            _this.closest('.panel').find('.download').addClass('no-display');
        }
    });

    $('body').on('change', '.custom-file-input', function (evt) {
        var _this = $(this);
        var id = _this.closest('.panel').attr('data-id');
        var files = evt.target.files;
        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();

            reader.onload = (function (theFile) {
                return function (e) {
                    var span = document.createElement('span');
                    _this.closest('.panel').find('.img').remove();
                    span.innerHTML = ['<img class="img" src="', e.target.result,
                        '" title="', escape(theFile.name), '" width="116px" height="116px"/>'].join('');
                    _this.closest('.panel').find('#img').append(span);
                    var icon = {
                        url: e.target.result,
                        scaledSize: new google.maps.Size(35, 35)
                    };
                    markers[id].setIcon(icon);
                };
            })(f);

            reader.readAsDataURL(f);
        }
    })


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
                        '<textarea class="marker__title" name="label_text"></textarea>' +
                        '<div class="marker__remove col-md-4"><a href="title" title="Delete" class="delete">' +
                        '<i class="icon-trash"></i> Delete</a></div></div>'
                    );
                }
                break;
            case '2':
                if (!_this.closest('.panel').find('.isset-click').hasClass('isset-click')) {
                    _this.closest('.panel').find('.action-wrap').after(
                        '<div class="form-group"><label class="col-md-4 control-label"><span>Info Window</span></label>' +
                        '<textarea  class=" isset-click marker__window" name="window_text"></textarea>' +
                        '<div class="marker__remove col-md-4"><a title="Delete" class="delete">' +
                        '<i class="icon-trash"></i> Delete</a></div></div>'
                    );
                }
                break;
            case '3':
                if (!_this.closest('.panel').find('.isset-click').hasClass('isset-click')) {
                    _this.closest('.panel').find('.action-wrap').after(
                        '<div class="form-group"><label class="col-md-4 control-label"><span>Animation</span></label>' +
                        '<select class="marker__animation isset-click" name="animate">' +
                        '<option value="0">Select animation effect</option>' +
                        '<option value="BOUNCE">BOUNCE</option>' +
                        '<option value="DROP">DROP</option>' +
                        '</select><div class="marker__remove col-md-4"><a title="Delete" class="delete">' +
                        '<i class="icon-trash"></i> Delete</a></div></div>'
                    );
                }
                break;
            case '4':
                if (!_this.closest('.panel').find('.isset-click').hasClass('isset-click')) {
                    _this.closest('.panel').find('.action-wrap').after(
                        '<div class="form-group"><label class="col-md-4 control-label"><span>Redirect link</span></label>' +
                        '<input type="text" name="link" class="form-control marker__link isset-click">' +
                        '<div class="marker__remove col-md-4"><a href="link" title="Delete" class="delete">' +
                        '<i class="icon-trash"></i> Delete</a></div></div>'
                    );
                }
                break;
            case '5':
                if (!_this.closest('.panel').find('.isset-click').hasClass('isset-click')) {
                    _this.closest('.panel').find('.action-wrap').after(
                        '<div class="form-group"><label class="col-md-4 control-label"><span>Script</span></label>' +
                        '<textarea  name="script" class="marker__script"></textarea>' +
                        '<div class="marker__remove col-md-4"><a  title="Delete" class="delete">' +
                        '<i class="icon-trash"></i> Delete</a></div></div>'
                    );
                }
                break;
        }
    });


    /**
     * Add action when hover and render title marker
     */
    $('body').on('keyup', '.marker__title', function (e) {
        e.preventDefault();
        var id = $(this).closest('.panel').attr('data-id');
        var value = $(this).val();
        markers[id].setTitle(value);
    });

    /**
     * Add listener whit window on click marker
     */
    $('body').on('keyup', '.marker__window', function (e) {
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
                    setTimeout(function () {
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
     * Save or update marker
     */
    jQuery('body').on('submit', '.upload-img', function (e) {
        e.preventDefault();

        var _this = $(this);

        var formData = new FormData($(this)[0]);
        formData.append('ajax', 'save_marker');
        $.ajax({
            type: 'POST',
            url: baseDir + 'modules/prestagooglemaps/ajax.php',
            data: formData,
            async: false,
            success: function (data) {
                if (data) {
                    _this.find('input[name="id_marker"]').attr('value', data);
                }
                if (data) {
                    $('.alert-success').removeClass('no-display');
                    setTimeout(function () {
                        $('.alert-success').addClass('no-display');
                    }, 2500);
                } else {
                    $('.alert-danger').removeClass('no-display');
                    setTimeout(function () {
                        $('.alert-danger').addClass('no-display');
                    }, 2500);
                }
            },
            cache: false,
            contentType: false,
            processData: false
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
        var _this = $(this);
        var id = _this.closest('.panel').attr('data-id');
        var id_marker = _this.closest('.panel').find('input[name="id_marker"]').val();
        var id_map = _this.closest('.maps-template').attr('data-id');
        jQuery.ajax({
            type: 'POST',
            url: baseDir + 'modules/prestagooglemaps/ajax.php',
            data: {
                ajax: 'remove_marker',
                id_marker: id_marker,
                id_map: id_map,
            },
            success: function (data) {
                _this.closest('.panel').remove();
                markers[id].setMap(null);
            }
        });


    });


    $('body').on('click', '.polylines__add', function (e) {
        e.preventDefault();
        $(this).closest('.maps-template').find('.dis-pol').addClass('disabled');
        var newLi = document.createElement('div');
        newLi.innerHTML =
            '<div class="panel"><h3></i>Marker</h3>' +
            '<form enctype="multipart/form-data" class="poly-save-form" method="post">' +
            '<div class="form-group"><label class="col-md-4 control-label"><span>Name of the line</span></label>' +
            '<input type="hidden" name="id_polyline">' +
            '<input type="hidden" name="coordinates">' +
            '<input type="hidden" name="id_map" value="' + $('#maps-template').attr('data-id') + '">' +
            '<input type="text" name="name" class="form-control"></div>' +
            '<div class="form-group"><label class="col-md-4 control-label"><span>Thickness of the line</span></label>' +
            '<input type="number" name="thick" class="form-control polyline__thick" value="2"></div>' +
            '<div class="form-group"><label class="col-md-4 control-label"><span>Color</span></label>' +
            '<select name="select" class="polyline__color">' +
            '<option value="#000000">Black</option>' +
            '<option value="#FF0000">Red</option>' +
            '<option value="#0000F0">Blue</option>' +
            '<option value="#008000">Green</option>' +
            '<option value="#808080">Gray</option>' +
            '</select></div>' +
            '<div class="panel-footer"><button type="submit" class="btn btn-default pull-right polyline__save"' +
            'name=""><i class="process-icon-save"></i> Save</button>' +
            '<a href="" class="btn btn-default polyline__remove"><i class="process-icon-cancel">' +
            '</i> Cancel</a>' +
            '</div></form></div>';

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
            $(newLi).find('.panel').attr('data-coord', coord_poly);
            $(newLi).find('input[name="coordinates"]').attr('value', coord_poly);

        });
        $(newLi).find('.panel').attr('data-id', polies.length);
        polies.push(poly);
        $('.polylines__add').addClass('no-display');

    });

    /**
     *   Save polylines
     */
    $('body').on('submit', '.poly-save-form', function (e) {
        e.preventDefault();
        var _this = $(this);
        _this.closest('.maps-template').find('.dis-pol').removeClass('disabled');
        switchBetveenPolyMark()
        $('.polylines__add').removeClass('no-display');
        var formData = new FormData($(this)[0]);
        formData.append('ajax', 'save_poly');
        $.ajax({
            type: 'POST',
            url: baseDir + 'modules/prestagooglemaps/ajax.php',
            data: formData,
            async: false,
            success: function (data) {
                console.log(data);
                if (data) {
                    _this.find('input[name="id_polyline"]').attr('value', data);
                }
                if (data) {
                    $('.alert-success').removeClass('no-display');
                    setTimeout(function () {
                        $('.alert-success').addClass('no-display');
                    }, 2500);
                } else {
                    $('.alert-danger').removeClass('no-display');
                    setTimeout(function () {
                        $('.alert-danger').addClass('no-display');
                    }, 2500);
                }
            },
            cache: false,
            contentType: false,
            processData: false
        });

    });

    $('body').on('click', '.polyline__remove', function (e) {
        e.preventDefault();
        $(this).closest('.maps-template').find('.dis-pol').removeClass('disabled');
        switchBetveenPolyMark();
        var id = $(this).closest('.panel').attr('data-id');
        var id_polyline = $(this).closest('.panel').find('input[name="id_polyline"]').val();
        $('.polylines__add').removeClass('no-display');
        polies[id].setMap(null);
        jQuery(this).closest('.panel').remove();
        $.ajax({
            type: 'POST',
            url: baseDir + 'modules/prestagooglemaps/ajax.php',
            data: {
                ajax: 'remove_poly',
                id_polyline: id_polyline
            },
            success: function (data) {
                console.log(data);

            }
        });

    });

    $('body').on('keyup', '.polyline__thick', function () {
        var thick = $(this).val();
        poly.setOptions({strokeWeight: thick});
    });

    $('body').on('click', '.polyline__color', function () {
        var color = $(this).val();
        poly.setOptions({strokeColor: color});
    });

    $('body').on('click', '.remove_image_button', function (e) {
        e.preventDefault();
        var button = $(this);
        var id = button.closest('.panel').attr('data-id');
        button.closest('.panel').find('.img').attr('src', '/modules/prestagooglemaps/views/image/default.png');
        markers[id].setIcon();
    });


    //setting
    $('body').on('click', '.setting__save', function () {
        var position = $('input[name="render_map"]:checked').val();
        var id_map = $(this).closest('.maps-template').attr('data-id');
        var height = $('input[name="height"]').val();
        var widht = $('input[name="widht"]').val();

        if (position == 2) {
            var center = map.getCenter();
            var coord = center.lat() + ',' + center.lng();
            var zoom = map.getZoom();
        }

        $.ajax({
            type: 'POST',
            url: baseDir + 'modules/prestagooglemaps/ajax.php',
            data: {
                ajax: 'save_setting',
                position: position,
                id_map: id_map,
                height: height,
                widht: widht,
                coord: coord,
                zoom: zoom
            },
            success: function (data) {
                if (data) {
                    $('.alert-success').removeClass('no-display');
                    setTimeout(function () {
                        $('.alert-success').addClass('no-display');
                    }, 2500);
                } else {
                    $('.alert-danger').removeClass('no-display');
                    setTimeout(function () {
                        $('.alert-danger').addClass('no-display');
                    }, 2500);
                }
            }
        });

    });


});
