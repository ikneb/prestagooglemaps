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

    public function __construct(){
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
        /*$id_provider = Tools::getValue('id_providers');
        $provider = $id_provider ? Providers::getCurrentProvider($id_provider) : false;

        $this->context->smarty->assign(
            array(
                'id_providers' => $provider ? $provider['id_providers'] : '',
                'name' => $provider ? $provider['name'] : '',
                'description' => $provider ? $provider['description'] : '',
                'email' => $provider ? $provider['email'] : '',
                'token' => $this->token,
                'product_id' => (int)Tools::getValue('id_product')
            )
        );*/
        parent::renderForm();
        return $this->context->smarty->fetch(
            _PS_MODULE_DIR_ . 'prestagooglemaps/views/templates/admin/maps_template.tpl'
        );
    }
}