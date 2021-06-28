<?php


namespace lib;

class Log
{
    /**
     * @param $log
     */
    private static function write($log)
    {
        try {
            if (true) {
                $folder_name = rtrim(Config::get('log_path'),'/') .'/'. date('Ym')."/";

                if (!file_exists($folder_name)) {
                    mkdir($folder_name, 0775, true);
                }

                $date = date('YmdH');
                $filename = $folder_name . $date . ".log";
                $logtime = date('H:i:s');
                $logwritedata = "[" . $logtime . " ] " . $log . "\r\n";
                $fh = fopen($filename, 'a');// or die("can't open file");
                fwrite($fh, $logwritedata);
                fclose($fh);
            }
        } catch (\Exception $exception) {
            //
        }

    }

    /**
     * @param $message
     */
    public static function info($log)
    {
        $log = "INFO:: ".$log;
        self::write($log);
    }

    /**
     * @param $message
     */
    public static function error($log)
    {
        $log = "ERROR:: ".$log;
        self::write($log);
    }
}
