<?php

$term = $_GET["term"];

//First call
//$wikicall = file_get_contents("https://es.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=$term&srwhat=text&srlimit=2");

//Second call
$wikicall = file_get_contents("https://es.wikipedia.org/w/api.php?action=query&format=json&titles=$term&generator=links&prop=categories");
echo $wikicall;



 ?>
