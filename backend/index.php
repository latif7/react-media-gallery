<?php
require_once 'init.php';

use lib\Request;
use lib\Router;


$router = new Router(new Request);


$router->get('/get-images', "\Controller\GalleryController@getAllImages");
$router->post('/upload', "\Controller\GalleryController@upload");
$router->post('/update-image', "\Controller\GalleryController@update");
$router->get('/get-image', "\Controller\GalleryController@getImage");
