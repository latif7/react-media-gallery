<?php

namespace lib;

use lib\Exception\RouteNotFoundException;
use lib\IRequest;
use Firebase\JWT;

class Router
{
    private $request;
    private $supportedHttpMethods = array(
        "GET",
        "POST",
        "OPTIONS"
    );
    private $isCheckAuth = false;

    function __construct(IRequest $request)
    {
        $this->request = $request;
    }

    function __call($name, $args)
    {
        list($route, $method) = $args;

        if (!in_array(strtoupper($name), $this->supportedHttpMethods)) {
            $this->invalidMethodHandler();
        }

        $this->{strtolower($name)}[$this->formatRoute($route)] = $method;
    }

    public function auth()
    {
        $this->isCheckAuth = true;
        return $this;
    }
    private function checkAuth()
    {


        if (!(isset($_SERVER['HTTP_AUTHORIZATION']) && preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches))) {
            return false;
        }
        $jwt = $matches[1];

        if (!$jwt) {
            return false;
        }

        $secretKey  = config("key");
        $token = JWT::decode($jwt, $secretKey, ['HS512']);
        $now = new \DateTimeImmutable();
        $serverName = "localhost";

        if (
            $token->iss !== $serverName ||
            $token->nbf > $now->getTimestamp() ||
            $token->exp < $now->getTimestamp()
        ) {
            return false;
        }

        return true;
    }


    /**
     * Removes trailing forward slashes from the right of the route.
     * @param route (string)
     */
    private function formatRoute($route)
    {
        $result = rtrim($route, '/');
        if ($result === '') {
            return '/';
        }
        return $result;
    }

    private function invalidMethodHandler()
    {
        header("{$this->request->serverProtocol} 405 Method Not Allowed");
    }

    private function defaultRequestHandler()
    {
        header("{$this->request->serverProtocol} 404 Not Found");
    }

    /**
     * Resolves a route
     */
    function resolve()
    {
        $path =  isset($this->request->pathInfo) ? $this->request->pathInfo : '/';
        if (strtolower($this->request->requestMethod) == "options") {
            return '';
        }
        $methodDictionary = $this->{strtolower($this->request->requestMethod)};



        $formatedRoute = $this->formatRoute($path);
        if (!isset($methodDictionary[$formatedRoute])) {
            throw new RouteNotFoundException("Route Not Found", 404);
        }
        $method = $methodDictionary[$formatedRoute];

        if (is_null($method)) {
            $this->defaultRequestHandler();
            return;
        }


        if (is_callable($method)) {
            return call_user_func_array($method, array($this->request));
        } else {
            $methodPart = explode("@", $method);
            $controllerName = isset($methodPart[0]) ? $methodPart[0] : null;
            $method = isset($methodPart[1]) ? $methodPart[1] : null;

            $controller = new $controllerName();

            return $controller->{$method}($this->request);
        }
    }

    function __destruct()
    {
        echo $this->resolve();
    }
}
