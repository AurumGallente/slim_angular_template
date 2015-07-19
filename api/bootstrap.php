<?php

require_once "vendor/autoload.php";

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

$isDevMode = true;
$paths = array("/src");
$dbParams = array(
    'driver' => 'pdo_mysql',
    'user' => 'root',
    'password' => '',
    'dbname' => 'slimapi',
);
$config = Setup::createAnnotationMetadataConfiguration(array(__DIR__."/src/"), $isDevMode, null, null, true); 
// just add null, null, false at the end
$entityManager = EntityManager::create($dbParams, $config);
