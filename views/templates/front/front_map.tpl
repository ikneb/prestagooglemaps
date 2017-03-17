<script>
    var map_set = "{$map_set|escape:'htmlall':'UTF-8'}";
    var markers_set = "{$markers_set|escape:'htmlall':'UTF-8'}";
    var polies_set = "{$polies_set|escape:'htmlall':'UTF-8'}";
    var map;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: {$myLatlng|escape:'htmlall':'UTF-8'}
        });
    }
</script>
<script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCByLB65AuBykaj_lFmuiZWrIRYXvLLvJI&callback=initMap"
        async defer>
</script>
<div class="map__wrapper">

    <div id="map" {if $this_map.size == 0}style="width: 100%; height: 300px"{else}style="width: {$this_map.widht}px; height: {$this_map.height}px"{/if}></div>
</div>