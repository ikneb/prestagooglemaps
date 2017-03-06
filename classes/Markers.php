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
            'id_map' => array('type' => self::TYPE_INT),
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

    public static function getAllDefaultIcon()
    {
        $all_ikon = scandir(_PS_MODULE_DIR_ . 'prestagooglemaps/views/image/marker-icon');
        $array = array_flip($all_ikon);
        unset($array['.']);
        unset($array['..']);
        $all_ikon = array_flip($array);
        $type = array('.png', '.svg', '.jpg', '.icon');
        for ($i = 2; $i < count($all_ikon) + 2; $i++) {
            if ($all_ikon[$i]) {
                $all_ikon[$i] = str_replace($type, '', $all_ikon[$i]);
            }
        }
        return $all_ikon;
    }

    public function saveOrUpdateMarkers($src = false)
    {
        $name = Tools::getValue('name') ? Tools::getValue('name') : '';
        $id_map = Tools::getValue('id_map') ? Tools::getValue('name') : '';
        $coordinates = Tools::getValue('coordinates') ? Tools::getValue('coordinates') : '';
        $icon = Tools::getValue('icon');
        $method = Tools::getValue('method') ? Tools::getValue('method') : '';
        $label_text = Tools::getValue('label_text') ? Tools::getValue('label_text') : '';
        $window_text = Tools::getValue('window_text') ? Tools::getValue('window_text') : '';
        $animate = Tools::getValue('animate') ? Tools::getValue('animate') : '';
        $link = Tools::getValue('link') ? Tools::getValue('link') : '';
        $script = Tools::getValue('script') ? Tools::getValue('script') : '';

        if ($method == 1 && $src != false) {
            $icon = $src;
        }

        $sql = '';


        return $method;
    }
}