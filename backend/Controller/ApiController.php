<?php

namespace Controller;

use lib\DB;

class ApiController
{
    protected $statusCode = 200;

    public function errorResponse($statusCode, $message, $errors = [])
    {
        return $this->response([
            'status' => "FAILED",
            "status_code" => $statusCode,
            "message" => $message,
            "errors" => $errors,
            "data" => [],
        ]);
    }

    public function successResponse($message,  $data = [])
    {
        return $this->response([
            'status' => "SUCCESS",
            "status_code" => 200,
            "message" => $message,
            "errors" => [],
            "data" => $data,
        ]);
    }


    public function response($data)
    {
        http_response_code(200);
        header("Content-type:application/json");
        return json_encode($data);
    }
}
