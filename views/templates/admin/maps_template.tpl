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
                {if $markers_set }
                    {foreach from=$markers_set item=marker name=marker}
                        <div class="panel" data-id="{$smarty.foreach.marker.iteration - 1}"
                             data-coord="{$marker.coordinates}"><h3>Marker</h3>

                            <form enctype="multipart/form-data" class="upload-img" id="upload-img" method="post">
                                <div class="form-group"><label class="col-md-4 control-label"><span>Name</span></label>
                                    <input type="hidden" name="id_map" value="{$marker.id_map}">
                                    <input type="hidden" name="id_marker" value="{$marker.id_marker}">
                                    <input type="hidden" name="coordinates" value="{$marker.coordinates}">
                                    <input type="text" name="name" class="form-control marker__name"
                                           value="{if $marker.name_marker}{$marker.name_marker}{/if}"></div>
                                <div class="form-group method-wrapp"><label
                                            class="col-md-4 control-label"><span>Icon</span></label>
                                    <select name="method" class="marker__method">
                                        <option value="0" {if $marker.method == 0}selected {/if}>Default</option>
                                        <option value="1" {if $marker.method == 1}selected {/if}>Download</option>
                                        <option value="2" {if $marker.method == 2}selected {/if}>Icons</option>
                                    </select></div>
                                <div class="form-group {if $marker.method != 2}no-display{/if} method"><label
                                            class="col-md-4 control-label"><span></span></label>
                                    <select name="icon" class="marker__default-icon">
                                        <option value="0">Default</option>
                                        {assign var=png value=".png"}
                                        {foreach from=$icons item=icon}
                                            {assign var=icon_png value="`$icon``$png`"}
                                            <option value="{$icon}.png"
                                                    {if $marker.icon == $icon_png}selected{/if}>{$icon}</option>
                                        {/foreach}
                                    </select></div>
                                <div class="form-group {if $marker.method != 1}no-display{/if} download" id="img">
                                    <div class="download-form">
                                        <button type="submit" class="upload_image_button button">Upload</button>
                                        <button type="submit" class="remove_image_button button">&times;</button>
                                        <input id="my_file" class="custom-file-input" type="file" name="my_file"></div>
                                    <img class="img"
                                         src="{if $marker.method == 1}{$marker.icon}{else}/modules/prestagooglemaps/views/image/default.png{/if}"
                                         width="116px" height="116px"/>
                                </div>
                                <div class="form-group action-wrap"><label
                                            class="col-md-4 control-label"><span>Action</span></label>
                                    <select name="action" class="marker__action">
                                        <option value="0">Select</option>
                                        <option value="1" {if $marker.label_text} selected {/if}>Title hover</option>
                                        <option value="2" {if $marker.window_text} selected {/if}>Info window(click)
                                        </option>
                                        <option value="3" {if $marker.animation} selected {/if}>Animate effect(click)
                                        </option>
                                        <option value="4" {if $marker.link} selected {/if}>Link(click)</option>
                                        <option value="5" {if $marker.script} selected {/if}>Custom script(click)
                                        </option>
                                    </select>
                                </div>
                                {if $marker.label_text}
                                    <div class="form-group"><label
                                                class="col-md-4 control-label"><span>Title</span></label>
                                        <textarea class="marker__title"
                                                  name="label_text">{$marker.label_text}</textarea>

                                        <div class="marker__remove col-md-4"><a href="title" title="Delete"
                                                                                class="delete">
                                                <i class="icon-trash"></i> Delete</a></div>
                                    </div>
                                {/if}
                                {if $marker.window_text}
                                    <div class="form-group"><label
                                                class="col-md-4 control-label"><span>Info Window</span></label>
                                        <textarea class=" isset-click marker__window"
                                                  name="window_text">{$marker.window_text}</textarea>

                                        <div class="marker__remove col-md-4"><a title="Delete" class="delete">
                                                <i class="icon-trash"></i> Delete</a></div>
                                    </div>
                                {elseif $marker.animation}
                                    <div class="form-group"><label class="col-md-4 control-label"><span>Animation</span></label>
                                        <select class="marker__animation isset-click" name="animate">
                                            <option value="0">Select animation effect</option>
                                            <option value="BOUNCE" {if $marker.animation == 'BOUNCE'}selected{/if}>
                                                BOUNCE
                                            </option>
                                            <option value="DROP" {if $marker.animation == 'DROP'}selected{/if}>DROP
                                            </option>
                                        </select>

                                        <div class="marker__remove col-md-4"><a title="Delete" class="delete">
                                                <i class="icon-trash"></i> Delete</a></div>
                                    </div>
                                {elseif $marker.link}
                                    <div class="form-group"><label
                                                class="col-md-4 control-label"><span>Redirect link</span></label>
                                        <input type="text" name="link" class="form-control marker__link isset-click"
                                               value="{$marker.link}">

                                        <div class="marker__remove col-md-4"><a href="link" title="Delete"
                                                                                class="delete">
                                                <i class="icon-trash"></i> Delete</a></div>
                                    </div>
                                {elseif $marker.script}
                                    <div class="form-group"><label
                                                class="col-md-4 control-label"><span>Script</span></label>
                                        <textarea name="script" class="marker__script">{$marker.script}</textarea>

                                        <div class="marker__remove col-md-4"><a title="Delete" class="delete">
                                                <i class="icon-trash"></i> Delete</a></div>
                                    </div>
                                {/if}
                                <div class="panel-footer">

                                    <button type="submit" class="btn btn-default pull-right" name="">
                                        <i class="process-icon-save marker__save"></i> Save
                                    </button>
                                    <a href="" class="btn btn-default"><i
                                                class="process-icon-cancel marker__remove-panel">
                                        </i></a>
                                </div>
                            </form>
                        </div>
                    {/foreach}
                {/if}
            </div>
            <div id="polylines__list" class="tab col-md-12  no-display">
                <button type="button" class="btn btn-primary polylines__add">Add new polyline</button>
                {if $polylines }
                    {foreach from=$polylines item=polyline name=polyline}
                        <div class="panel"><h3></i>Polyline</h3>
                        <form enctype="multipart/form-data" class="poly-save-form" method="post">
                            <div class="form-group"><label class="col-md-4 control-label"><span>Name of the line</span></label>
                                <input type="hidden" name="id_polyline" value="{$polyline.id_polyline}">
                                <input type="hidden" name="coordinates" value="{$polyline.coordinates}">
                                <input type="hidden" name="id_map" value="{$polyline.id_map}">
                                <input type="text" name="name" class="form-control" value="{$polyline.name_polyline}"></div>
                            <div class="form-group"><label class="col-md-4 control-label"><span>Thickness of the line</span></label>
                                <input type="number" name="thick" class="form-control polyline__thick" value="{$polyline.thick}"></div>
                            <div class="form-group"><label class="col-md-4 control-label"><span>Color</span></label>
                                <select name="select" class="polyline__color">
                                    <option value="#000000" {if $polyline.color == '#000000'}selected{/if}>Black</option>
                                    <option value="#FF0000" {if $polyline.color == '#FF0000'}selected{/if}>Red</option>
                                    <option value="#0000F0" {if $polyline.color == '#0000F0'}selected{/if}>Blue</option>
                                    <option value="#008000" {if $polyline.color == '#008000'}selected{/if}>Green</option>
                                    <option value="#808080" {if $polyline.color == '#808080'}selected{/if}>Gray</option>
                                    </select></div>
                            <div class="panel-footer"><button type="submit" class="btn btn-default pull-right polyline__save"
                                name=""><i class="process-icon-save"></i> Save</button>
                                <a href="" class="btn btn-default polyline__remove"><i class="process-icon-cancel">
                                        </i> Cancel</a>
                                </div></form></div>
                    {/foreach}
                {/if}
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