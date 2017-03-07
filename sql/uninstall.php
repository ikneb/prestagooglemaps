<?php
/**
 * 2017 WeeTeam
 *
 * @author    WeeTeam
 * @copyright 2016 WeeTeam
 * @license   http://www.gnu.org/philosophy/categories.html (Shareware)
 */

$sql = array();
$sql[] = 'DROP TABLE IF EXISTS `' . _DB_PREFIX_ . 'maps_areas`;';
$sql[] = 'DROP TABLE IF EXISTS `' . _DB_PREFIX_ . 'markers`;';
$sql[] = 'DROP TABLE IF EXISTS `' . _DB_PREFIX_ . 'polylines`;';
