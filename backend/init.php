<?php

error_reporting(E_ALL); //to show errors
ini_set('display_errors', TRUE); //Sets the value of a configuration option
ini_set('display_startup_errors', TRUE);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//set timezone
date_default_timezone_set('Asia/Dhaka');


//set base path
define('BASE_PATH', realpath(dirname(__FILE__)));
$GLOBALS['config'] = require_once BASE_PATH . '/config.php';


function my_autoloader($class)
{
    $filename = BASE_PATH . DIRECTORY_SEPARATOR . str_replace('\\', '/', $class) . '.php';
    if (file_exists($filename)) {
        require_once($filename);
    }
}

spl_autoload_register('my_autoloader');
require_once "helpers/helpers.php";
