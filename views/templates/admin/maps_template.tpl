<div class="container maps-template" id="maps-template" data-id="{$map->id}">
    <div class="row">
        <div class="alert alert-success no-display">
            <button type="button" class="close" data-dismiss="alert">×</button>
            Successful update
        </div>
        <div class="alert alert-danger no-display">
            <button type="button" class="close" data-dismiss="alert">×</button>
            Error! Try again later.
        </div>
    </div>
    <div class="row">
        <div class="form-group"><label class="col-md-1 control-label"><span>Name Map</span></label>

            <div class="col-md-6">
                <input type="text" name="map_name" class="form-control map_name " value="{$map->name}"></div>
            <button type="button" class="btn btn-primary update_name">Update name</button>
        </div>
    </div>
    <div class="row">
        <div class="map__wrapper">
            <script
                    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCByLB65AuBykaj_lFmuiZWrIRYXvLLvJI&callback=initMap"
                    async defer>
            </script>
            <div id="map"></div>
        </div>
    </div>
    <div class="row">
        <ul class="nav nav-tabs col-lg-12 nav-justified">
            <li class="active dis-pol"><a href="#markers__list">{l s='Markers' mod=autorestocking}</a></li>
            <li class="dis-pol"><a href="#polylines__list">{l s='Polylines' mod=autorestocking}</a></li>
            <li class="dis-pol"><a href="#setting">{l s='Setting' mod=autorestocking}</a></li>
        </ul>
    </div>
    <div class="row">
        <div class="nav-tab-content col-lg-12  col-md-12">
            <div id="markers__list" class=" tab col-lg-12 ">
                <h4 class="marker__title">{l s='If you want add marker, please click for map.' mod=autorestocking}</h4>
            </div>
            <div id="polylines__list" class="tab col-md-12  no-display">
                <button type="button" class="btn btn-primary polylines__add">Add new polyline</button>
            </div>
            <div id="setting" class="tab col-md-12  no-display">

                <div class="panel">
                    <h3>Setting</h3>

                    <div class="form-group">

                    </div>
                    <div class="panel-footer">
                        <button type="submit" class="btn btn-default pull-right" name="">
                            <i class="process-icon-save marker__save"></i> Save
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>