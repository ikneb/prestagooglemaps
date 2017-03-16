<?php
/**
 * 2017 WeeTeam
 *
 * @author    WeeTeam
 * @copyright 2016 WeeTeam
 * @license   http://www.gnu.org/philosophy/categories.html (Shareware)
 */

require_once(dirname(__FILE__) . '../../../config/config.inc.php');
require_once(dirname(__FILE__) . '../../../init.php');
require_once(dirname(__FILE__) . '/classes/MapsAreas.php');
require_once(dirname(__FILE__) . '/classes/Markers.php');
require_once(dirname(__FILE__) . '/classes/Polylines.php');

switch (Tools::getValue('ajax')) {

    case 'save_marker':
        $src = false;
        $id_marker = Tools::getValue('id_marker') ? Tools::getValue('id_marker') : '';

        $name = Tools::getValue('name') ? Tools::getValue('name') : '';
        $id_map = Tools::getValue('id_map') ? Tools::getValue('id_map') : '';
        $coordinates = Tools::getValue('coordinates') ? Tools::getValue('coordinates') : '';
        $icon = Tools::getValue('icon');
        $method = Tools::getValue('method') ? Tools::getValue('method') : '';

        $label_text = Tools::getValue('label_text') ? Tools::getValue('label_text') : '';
        $window_text = Tools::getValue('window_text') ? Tools::getValue('window_text') : '';
        $animate = Tools::getValue('animate') ? Tools::getValue('animate') : '';
        $link = Tools::getValue('link') ? Tools::getValue('link') : '';
        $script = Tools::getValue('script') ? Tools::getValue('script') : '';

        if (isset($_FILES['my_file']['name'])) {
            if ($_FILES['my_file']['size'] > 500000) {
                die(false);
            }
            $date = date('H:i:s');
            $unique = md5($date);
            $target_file = _PS_IMG_DIR_ . $unique . '_' . basename($_FILES['my_file']['name']);
            $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
            /*$check = getimagesize($_FILES['my_file']['tmp_name']);

            if ($check === false) {
                die(false);//check size
            }*/

            $src = move_uploaded_file($_FILES['my_file']['tmp_name'], $target_file) ?
                _PS_BASE_URL_ . '/img/'.$unique . '_' . basename($_FILES['my_file']['name']): '';
            if ($method == 1) {
                $icon = $src;
            }
        }

        if(empty($id_marker)){
            $marker = new Markers();
        } else {
            $marker = new Markers($id_marker);
        }
        $marker->name_marker = $name;
        $marker->id_map = $id_map;
        $marker->coordinates = $coordinates;
        $marker->icon = $icon;
        $marker->method = $method;
        $marker->label_text = $label_text;
        $marker->window_text = $window_text;
        $marker->animation = $animate;
        $marker->link = $link;
        $marker->script = $script;

        if(empty($id_marker)){
            $marker->add();
        } else {
            $marker->update();
        }

        echo $marker->id;
        break;
    case 'update_name':
        $map = new MapsAreas(Tools::getValue('id_map'));
        $map->name = Tools::getValue('name');
        if (!$map->update()) {
            echo false;
        }
        echo true;
        break;
    case 'get_all_markers':
        $all_ikon = Markers::getAllDefaultIcon();
        echo json_encode($all_ikon);
        break;
    case 'remove_marker':
        $marker = new Markers(Tools::getValue('id_marker'));
        $marker->delete();
        break;
    case 'save_poly':
        $id = Tools::getValue('id_polyline') ? Tools::getValue('id_polyline') : '';
        if($id){
            $poly = new Polylines($id);
        } else {
            $poly = new Polylines();
        }

        $poly->id_map = Tools::getValue('id_map') ?  Tools::getValue('id_map'): '';
        $poly->name_polyline = Tools::getValue('name') ?  Tools::getValue('name'): '';
        $poly->coordinates = Tools::getValue('coordinates') ?  htmlspecialchars(Tools::getValue('coordinates')): '';
        $poly->thick = Tools::getValue('thick') ?  Tools::getValue('thick'): '';
        $poly->color = Tools::getValue('color') ?  Tools::getValue('color'): '';

        if($id){
            $poly->update();
        } else {
            $poly->add();
        }
        echo $poly->id;
        break;
    case 'remove_poly':
        $poly = new Polylines(Tools::getValue('id_polyline'));
        if ($poly->delete()) {
            echo true;
        }
        break;
    case 'save_setting':

            $map = new MapsAreas(Tools::getValue('id_map'));
            $map->position = Tools::getValue('position');
            $map->widht = Tools::getValue('widht');
            $map->height = Tools::getValue('height');
            $map->coord = Tools::getValue('coord') ? Tools::getValue('coord'): '';
            $map->zoom = Tools::getValue('zoom') ? Tools::getValue('zoom') : 0;
            if($map->update()){
                echo true;
            }
        break;

}
