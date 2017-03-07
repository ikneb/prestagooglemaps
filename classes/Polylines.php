<?php

/**
 * 2017 WeeTeam
 *
 * @author    WeeTeam
 * @copyright 2016 WeeTeam
 * @license   http://www.gnu.org/philosophy/categories.html (Shareware)
 */
class Polylines extends ObjectModel
{
    public $id_polyline;
    public $id_map;
    public $name_polyline;
    public $coordinates;
    public $thick;
    public $color;


    /**
     * @see ObjectModel::$definition
     */
    public static $definition = array(
        'table' => 'polylines',
        'primary' => 'id_polyline',
        'multilang' => false,
        'fields' => array(
            'id_polyline' => array('type' => self::TYPE_INT),
            'id_map' => array('type' => self::TYPE_INT),
            'name_polyline' => array('type' => self::TYPE_STRING),
            'coordinates' => array('type' => self::TYPE_STRING),
            'thick' => array('type' => self::TYPE_INT),
            'color' => array('type' => self::TYPE_STRING),
        ),
    );
}