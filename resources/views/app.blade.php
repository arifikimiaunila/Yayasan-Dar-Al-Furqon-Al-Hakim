<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia><link rel="icon" type="image/x-icon" href="{{asset('favicon.ico');}}">Yayasan Dar Al Furqon Al Hakim</title>
    @routes
        @vite(['resources/js/app.ts', 'resources/js/Pages/{$page['component']}.vue', 'resources/sass/bulma.sass'])
        @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
