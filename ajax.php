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
        echo Tools::getValue('formData');
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