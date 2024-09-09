<?php
$collect = router('datayayasan.showcookies');
foreach($collect as $cookie_name=>$cookie_value){
setcookie($cookie_name, $cookie_value, time()++(86400*30), "/");
}
?>
<!DOCTYPE html>
<html lang="in">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
 		@routes(nonce: Vite::cspNonce())
        @viteReactRefresh
        @vite(['resources/ts/app.ts', resources/css/index.css, 'resources/ts/Pages/{$page['component']}.tsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
