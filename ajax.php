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

switch (Tools::getValue('ajax')) {

    case 'save_marker':
        $src ='';
        if (isset($_FILES['my_file'])) {
            if ($_FILES['my_file']['size'] > 500000) {
                die(false);
            }
            $date = date('H:i:s');
            $unique = md5($date);
            $target_file = _PS_IMG_DIR_ . $unique . '_' . basename($_FILES['my_file']['name']);
            $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
            $check = getimagesize($_FILES['my_file']['tmp_name']);

            if ($check === false) {
                die(false);//check size
            }

            $src = move_uploaded_file($_FILES['my_file']['tmp_name'], $target_file) ?
                _PS_BASE_URL_ . '/img/'.$unique . '_' . basename($_FILES['my_file']['name']): '';
        }
        echo Markers::saveMarkers($src);
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

}
/*
print_r($_FILES);

print_r($_POST);*/