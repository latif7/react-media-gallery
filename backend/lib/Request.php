<?php

namespace lib;

use lib\IRequest;
use lib\Validator;

class Request implements IRequest
{
    private $params = [];
    private $files = [];

    function __construct()
    {
        $this->bootstrapSelf();
        $this->setProperty();
    }

    private function bootstrapSelf()
    {
        foreach ($_SERVER as $key => $value) {
            $this->{$this->toCamelCase($key)} = $value;
        }
    }

    private function toCamelCase($string)
    {
        $result = strtolower($string);

        preg_match_all('/_[a-z]/', $result, $matches);

        foreach ($matches[0] as $match) {
            $c = str_replace('_', '', strtoupper($match));
            $result = str_replace($match, $c, $result);
        }

        return $result;
    }

    public function getBody()
    {
        if ($this->requestMethod === "GET") {
            return;
        }

        if ($this->requestMethod == "POST") {

            $jsonData = json_decode(file_get_contents("php://input"));

            if ($jsonData) {
                $data = $jsonData;
            } else {
                $data = $_POST;
            }

            $body = array();
            foreach ($data as $key => $value) {
                $body[$key] = filter_input(INPUT_POST, $key, FILTER_SANITIZE_SPECIAL_CHARS);
            }

            return $body;
        }
    }

    public function all()
    {
        return $this->params;
    }

    public function setProperty()
    {
        $params = $_REQUEST;
        $this->files = $_FILES;


        $jsonData = json_decode(file_get_contents("php://input"), true);

        if ($jsonData) {
            $params = $jsonData;
        }

        $requestParams = array();
        foreach ($params as $key => $value) {
            if (!is_array($value)) {
                $value = filter_var($params[$key], FILTER_SANITIZE_SPECIAL_CHARS);
            }

            $requestParams[$key] = $value;
            $this->{$key} = $value;
        }
        $requestParams = array_merge($this->files, $requestParams);
        return $this->params = $requestParams;
    }

    public function input($key)
    {
        return isset($this->params[$key]) ? $this->params[$key] : "";
    }

    public function filled($key)
    {
        return isset($this->params[$key]) && !empty($this->params[$key]) ? true : false;
    }

    public function validate($rules)
    {
        $validator = new Validator();
        return $validator->checkValidation($this->params, $rules);
    }

    public function file($name)
    {
        return isset($this->files[$name]) ? $this->files[$name] : null;
    }

    public function hasFile($name)
    {
        return isset($this->files[$name]);
    }
}
