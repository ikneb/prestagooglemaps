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
    public $id_polylines;
    public $id_map;
    public $name_polylines;
    public $coordinates;
    public $thick;
    public $color;


    /**
     * @see ObjectModel::$definition
     */
    public static $definition = array(
        'table' => 'polylines',
        'primary' => 'id_polylines',
        'multilang' => false,
        'fields' => array(
            'id_polylines' => array('type' => self::TYPE_INT),
            'id_map' => array('type' => self::TYPE_INT),
            'name_polylines' => array('type' => self::TYPE_STRING),
            'coordinates' => array('type' => self::TYPE_STRING),
            'thick' => array('type' => self::TYPE_INT),
            'color' => array('type' => self::TYPE_STRING),
        ),
    );
}