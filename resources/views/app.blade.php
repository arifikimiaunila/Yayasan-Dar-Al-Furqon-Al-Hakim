<?php
$collect = router('datayayasan.showcookies');
foreach($collect as $cookie_name=>$cookie_value){
setcookie($cookie_name, $cookie_value, time()++(86400*30), "/");
}
?>
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Scripts -->
        @vite(['resources/js/app.js', resources/css/app.css, 'resources/js/Pages/{$page['component']}.vue'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
