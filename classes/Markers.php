<?php
/**
 * 2017 WeeTeam
 *
 * @author    WeeTeam
 * @copyright 2016 WeeTeam
 * @license   http://www.gnu.org/philosophy/categories.html (Shareware)
 */


class Markers extends ObjectModel
{
    public $id_marker;
    public $id_map;
    public $name_marker;
    public $coordinates;
    public $icon;
    public $method;
    public $label_text;
    public $window_text;
    public $animation;
    public $link;
    public $script;


    /**
     * @see ObjectModel::$definition
     */
    public static $definition = array(
        'table' => 'markers',
        'primary' => 'id_marker',
        'multilang' => false,
        'fields' => array(
            'id_marker' => array('type' => self::TYPE_INT),
            'id_maps' => array('type' => self::TYPE_INT),
            'name_marker' => array('type' => self::TYPE_STRING),
            'coordinates' => array('type' => self::TYPE_STRING),
            'icon' => array('type' => self::TYPE_STRING),
            'method' => array('type' => self::TYPE_STRING),
            'label_text' => array('type' => self::TYPE_STRING),
            'window_text' => array('type' => self::TYPE_STRING),
            'animation' => array('type' => self::TYPE_STRING),
            'link' => array('type' => self::TYPE_STRING),
            'script' => array('type' => self::TYPE_STRING)
        ),
    );

}