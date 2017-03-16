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
`position` int(5) NOT NULL,
`widht` int(5) NOT NULL,
`height` int(5) NOT NULL,
`coord` varchar(250) NOT NULL,
`zoom` int(5) NOT NULL,
PRIMARY KEY (`id_maps_areas`)
)";

$sql[] = "CREATE TABLE IF NOT EXISTS `" . _DB_PREFIX_ . "markers` (
`id_marker` int(11) NOT NULL AUTO_INCREMENT,
`id_map` int(11) ,
`name_marker` varchar(100) NOT NULL,
`coordinates` text NOT NULL,
`icon` varchar(255) NOT NULL,
`method` int(3) NOT NULL,
`label_text` text NOT NULL,
`window_text` text NOT NULL,
`animation` varchar(50) NOT NULL,
`link` varchar(255) NOT NULL,
`script` text NOT NULL,
PRIMARY KEY (`id_marker`)
)";

$sql[] = "CREATE TABLE IF NOT EXISTS `" . _DB_PREFIX_ . "polylines` (
`id_polyline` int(11) NOT NULL AUTO_INCREMENT,
`id_map` int(11) ,
`name_polyline` varchar(100) NOT NULL,
`coordinates` text NOT NULL,
`thick` int(5) NOT NULL,
`color` varchar(50) NOT NULL,
PRIMARY KEY (`id_polylines`)
)";