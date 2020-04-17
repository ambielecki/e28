<?php
    $conn = new PDO('mysql:host=e28-db;dbname=e28', 'root', 'root');
    $status = $conn->getAttribute(PDO::ATTR_CONNECTION_STATUS);

    echo $status . ' from web-2';
