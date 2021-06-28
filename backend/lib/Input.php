<?php
namespace lib;


class Input
{
    //static keywor use for using a class without creating object
    public static function exists($type = 'post') {
        if (strtolower($_SERVER['REQUEST_METHOD']) == strtolower($type)) {
            return true;
        }
        return false;
    }

    public static function get($item) {
        $data = '';
        if (isset($_POST[$item])) {
            $data =  $_POST[$item];
        } else if(isset($_GET[$item])) {
            $data = $_GET[$item];
        }
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    public static function filled($key) {
        return self::get($key) != '' ? true : false;
    }
}