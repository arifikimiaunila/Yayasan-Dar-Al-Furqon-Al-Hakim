<!DOCTYPE html>
<html lang="in">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @routes(nonce: Vite::cspNonce())
        @vite(['resources/css/app.css', 'resources/ts/app.tsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @php
            $role = request()->cookie('user_role');
            $userId = request()->cookie('user_id');
        @endphp

        @if($role === 'admin1')
            <script>
                window.location.href = "{{ route('post.create') }}";
            </script>
        @elseif($role === 'admin2')
            <script>
                window.location.href = "{{ route('video.create') }}";
            </script>
        @elseif($role === 'superadmin')
            <script>
                window.location.href = "{{ route('data_yayasan.create') }}";
            </script>
        @endif

        @inertia
    </body>
</html>
