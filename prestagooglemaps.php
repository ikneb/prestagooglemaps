<?php

/**
 * 2016 WeeTeam
 *
 * @author    WeeTeam <info@weeteam.net>
 * @copyright 2017 WeeTeam
 * @license   http://www.gnu.org/philosophy/categories.html (Shareware)
 */
class PrestaGoogleMaps extends Module
{

    public function __construct()
    {
        include_once(_PS_MODULE_DIR_ . 'prestagooglemaps/classes/MapsAreas.php');

        if (!defined('_PS_MODULE_DIR_')) {
            define('_PS_MODULE_DIR_', _PS_ROOT_DIR_ . DIRECTORY_SEPARATOR . 'modules' . DIRECTORY_SEPARATOR);
        }

        $this->name = 'prestagooglemaps';
        $this->tab = 'administration';
        $this->version = '1.0.0';
        $this->bootstrap = true;
        parent::__construct();
        $this->page = basename(__FILE__, '.php');
        $this->displayName = $this->l('Google Maps');
        $this->description = $this->l('Google Maps');
        $this->description_big = '';
        $this->author = 'Weeteam';
//        $this->module_key = 'f6e24f90f11de18aca6fe9a87d02210d';
//        $this->context->smarty->addTemplateDir($this->local_path . 'views/templates/admin', 1);
    }

    public function install()
    {
        if (!parent::install()
            || !$this->registerHook('displayFooter')
        ) {
            return false;
        }

        $this->installDb();

        $parent_tab = new Tab();
        $parent_tab->name[$this->context->language->id] = $this->l('Google Maps');
        $parent_tab->class_name = 'AdminPrestaGoogle';
        $parent_tab->id_parent = 0; // Home tab
        $parent_tab->module = $this->name;
        $parent_tab->add();

        $tab = new Tab();
        $tab->name[$this->context->language->id] = $this->l('Google Maps');
        $tab->class_name = 'AdminPrestaGoogleMaps';
        $tab->id_parent = $parent_tab->id;
        $tab->module = $this->name;
        $tab->add();

        return true;
    }


    public function installDb(){
        $sql = array();
        include(dirname(__FILE__) . '/sql/install.php');
        foreach ($sql as $s) {
            if (!Db::getInstance()->execute($s)) {
                return false;
            }
        }
        return true;
    }

    public function uninstall()
    {
        $sql = array();
        include(dirname(__FILE__) . '/sql/uninstall.php');
        foreach ($sql as $s) {
            if (!Db::getInstance()->execute($s)) {
                return false;
            }
        }

        if (!parent::uninstall() ||
            !$this->deleteTab()
        ) {
            return false;
        }


        return true;
    }

    public function deleteTab()
    {
        if (version_compare(_PS_VERSION_, '1.7.0', '>=') === true) {
            $id_tab = Tab::getIdFromClassName('AdminPrestaGoogleMaps');
            $tab = new Tab($id_tab);

            $id_parent_tab = Tab::getIdFromClassName('AdminPrestaGoogle');
            $parent_tab = new Tab($id_parent_tab);
            if ($tab->delete() && $parent_tab->delete()) {
                return true;
            }
        } else {
            $id_tab = Tab::getIdFromClassName('AdminPrestaGoogleMaps');
            $tab = new Tab($id_tab);
            if ($tab->delete()) {
                return true;
            }
        }
    }

    public function hookDisplayFooter () {

    }
}