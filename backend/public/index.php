<?php
require_once '../init.php';

use lib\Request;
use lib\Router;


$router = new Router(new Request);

$router->get('/', "\Controller\LoginController@login");


$router->get('/oracle', function ($request) {
  new lib\Oracle();
});

$router->post('/login', "\Controller\LoginController@login");
$router->post('/logout', "\Controller\LoginController@logout");
//telcos
$router->get('/user-intelco-list', "\Controller\TelcoController@userIntelcoList");
$router->get('/user-outtelco-list', "\Controller\TelcoController@userOutTelcoList");
$router->get('/user-mapuser-list', "\Controller\TelcoController@userMapUserList");
$router->get('/get-telcos-mapusers', "\Controller\TelcoController@getTelcosMapusers");
//stakeholder 

$router->get('/stakeholder-list', "\Controller\StakeholderController@StakeHolderList");
$router->get('/stakeholder-route-mapping', "\Controller\StakeholderController@StakeHolderRouteMapping");
$router->post('/update-masking-route', "\Controller\StakeholderController@updateMaskingRoute");
//routes
$router->get('/route-list', "\Controller\RoutesController@Routes");
$router->post('/get-routes-by-ids', "\Controller\RoutesController@getRoutesByIds");
