<?php
/**
 * 2017 WeeTeam
 *
 * @author    WeeTeam
 * @copyright 2016 WeeTeam
 * @license   http://www.gnu.org/philosophy/categories.html (Shareware)
 */


class MapsAreas extends ObjectModel
{
    public $id_maps_areas;
    public $name;

    /**
     * @see ObjectModel::$definition
     */
    public static $definition = array(
        'table' => 'maps_areas',
        'primary' => 'id_maps_areas',
        'multilang' => false,
        'fields' => array(
            'id_maps_areas' => array('type' => self::TYPE_INT),
            'name' => array('type' => self::TYPE_STRING)
        ),
    );


    public function getAllMarkers() {

        $sql = "SELECT * FROM " . _DB_PREFIX_ . "markers WHERE id_map=" . $this->id_maps_areas."";

        $markers = Db::getInstance()->executeS($sql);

        if ($markers) {
            return $markers;
        }
        return false;
    }

}