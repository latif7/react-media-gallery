<?php
return [
    'db' => [
        "mysql" => [
            'host' => 'localhost',
            'user' => 'root',
            'password' => '12345678',
            'db_name' => 'getway_admin'
        ],
        "oracle" => [
            "host" => "192.168.68.78:1521/ORCL",
            "user" => "bulksmsplus",
            "password" => "bulksmsplus",
            "db_name" => "BULKSMSPLUS"
        ]
    ],
    "key" => "eGS6lzFqvvSQ85LbOxatm7Vk7mLhyzqaS34Q4o41ew=",

    "whitelisted_ips" => [
        "127.0.0.1",
        "::1",
        "192.168.91.153"
    ],
    "curl_operation_timeout" => 30,
    "curl_connection_timeout" => 20,
    "is_check_ip" => false,
    'incoming_token' => "1234kl55l7l7kwel3w23",
    'outgoing_token' => "23s402f843f02d38404s98032f9480202s34",
    'log_path' => "/var/www/html/dmgw/core/log",
    'channels' => [
        '1' => "viber"
    ]
];
