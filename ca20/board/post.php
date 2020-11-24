<?php
$banned_chars = array("<",">");

$pfp = $_GET["pfp"];
$name = $_GET["name"];
$message = $_GET["message"];

$current = file_get_contents("board.html");
$message = str_replace($banned_chars, "", $message);

$text = "<!--top-->\n<div id= post><img class=post_image src=pfp" . $pfp . ".png> " . $name . ":<br>" . $message . "</div>";

$current = str_replace("<!--top-->", $text, $current);

file_put_contents("messages", "[" . $pfp . "]" . $name .": " . $message . "\n", FILE_APPEND);
file_put_contents("board.html",$current);
?>
