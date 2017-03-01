<div class="container maps-template" id="maps-template">
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
        <ul class="nav nav-tabs col-lg-12">
            <li class="active"><a href="#markers__list">{l s='Markers' mod=autorestocking}</a></li>
            <li><a href="#polylines">{l s='Polylines' mod=autorestocking}</a></li>
            <li><a href="#setting">{l s='Setting' mod=autorestocking}</a></li>
        </ul>
    </div>
    <div class="row">
        <div class="nav-tab-content col-lg-12 ">
            <div id="markers__list" class=" tab col-lg-12 ">
                <h4 class="marker__title">{l s='If you want add marker, please click for map.' mod=autorestocking}</h4>
            </div>
            <div id="polylines" class="tab col-md-12  no-display">
                <h4 class="polylines__title">{l s='If you want add polyline, please click and build on the map.' mod=autorestocking}</h4>
            </div>
            <div id="setting" class="tab col-md-12  no-display">
                <h1>setting</h1>
            </div>
        </div>

    </div>
</div>