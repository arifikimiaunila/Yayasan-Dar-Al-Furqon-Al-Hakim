<!DOCTYPE html>
<html lang="in">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
 		@routes(nonce: Vite::cspNonce())
        @vite(['resources/css/app.css', 'resources/ts/app.ts'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
