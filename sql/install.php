<?php
/**
 * 2017 WeeTeam
 *
 * @author    WeeTeam
 * @copyright 2016 WeeTeam
 * @license   http://www.gnu.org/philosophy/categories.html (Shareware)
 */

$sql = array();

$sql[] = "CREATE TABLE IF NOT EXISTS `" . _DB_PREFIX_ . "maps_areas` (
`id_maps_areas` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(100) NOT NULL,
PRIMARY KEY (`id_maps_areas`)
)";