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
    public $position;
    public $size;
    public $widht;
    public $height;
    public $coord;
    public $zoom;
    public $place_map;


    /**
     * @see ObjectModel::$definition
     */
    public static $definition = array(
        'table' => 'maps_areas',
        'primary' => 'id_maps_areas',
        'multilang' => false,
        'fields' => array(
            'id_maps_areas' => array('type' => self::TYPE_INT),
            'name' => array('type' => self::TYPE_STRING),
            'position' => array('type' => self::TYPE_INT),
            'size' => array('type' => self::TYPE_INT),
            'widht' => array('type' => self::TYPE_INT),
            'height' => array('type' => self::TYPE_INT),
            'coord' => array('type' => self::TYPE_STRING),
            'zoom' => array('type' => self::TYPE_INT),
            'place_map' => array('type' => self::TYPE_INT)
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

    public function getAllPolylines() {

        $sql = "SELECT * FROM " . _DB_PREFIX_ . "polylines WHERE id_map=" . $this->id_maps_areas."";

        $polylines = Db::getInstance()->executeS($sql);

        if ($polylines) {
            return $polylines;
        }
        return false;
    }

    public static function getAllMap($plase_map) {
        $sql = "SELECT * FROM " . _DB_PREFIX_ . "maps_areas WHERE place_map=". $plase_map;
        $maps = Db::getInstance()->executeS($sql);
        if ($maps) {
            return $maps;
        }
        return false;
    }
}