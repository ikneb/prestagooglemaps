<?php

/**
 * 2017 WeeTeam
 *
 * @author    WeeTeam
 * @copyright 2016 WeeTeam
 * @license   http://www.gnu.org/philosophy/categories.html (Shareware)
 */
class AdminPrestaGoogleMapsController extends ModuleAdminController
{

    public function __construct()
    {
        require_once(_PS_MODULE_DIR_ . 'prestagooglemaps/classes/Markers.php');

        $this->bootstrap = true;
        $this->required_database = true;
        $this->required_fields = array('name');
        $this->table = 'maps_areas';
        $this->className = 'MapsAreas';
        $this->lang = false;
        $this->context = Context::getContext();

        parent::__construct();

    }

    public function renderList()
    {
        $this->addRowAction('edit');
        $this->addRowAction('delete');
        $this->bulk_actions = array(
            'delete' => array(
                'text' => $this->l('Delete selected'),
                'confirm' => $this->l('Delete selected items?')
            )
        );

        $this->allow_export = false;

        $this->fields_list = array(
            'id_maps_areas' => array('title' => $this->l('ID'), 'align' => 'center', 'class' => 'fixed-width-xs'),
            'name' => array('title' => $this->l('Name'))
        );
        return parent::renderList();
    }

    public function renderForm()
    {

        $map = '';
        $markers = '';
        $polylines = '';
        $icons ='';
        $id_map = Tools::getValue('id_maps_areas');
        if (!$id_map) {
            $map = new MapsAreas();
            $map->name = 'New Map';
            $map->add();
        } else {
            $map = new MapsAreas($id_map);
            $markers = $map->getAllMarkers();
            $icons = Markers::getAllDefaultIcon();

        }
        Media::addJsDef(array('markers_set' => $markers));

        $this->context->smarty->assign(
            array(
                'icons' => $icons,
                'map' => $map,
                'polylines' => $polylines,
                'markers_set' => $markers,
            )
        );
        parent::renderForm();
        return $this->context->smarty->fetch(
            _PS_MODULE_DIR_ . 'prestagooglemaps/views/templates/admin/maps_template.tpl'
        );
    }

    public function setMedia()
    {
        parent::setMedia();
        $this->context->controller->addCSS(_PS_MODULE_DIR_ . 'prestagooglemaps/views/css/style.css', 'all');
        $this->context->controller->addJS(_PS_MODULE_DIR_ . 'prestagooglemaps/views/js/module.js');

    }

}