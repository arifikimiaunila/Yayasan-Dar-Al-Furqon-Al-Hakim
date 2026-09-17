<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Kode Pemulihan Akun</title>
</head>
<body>
    <h2>Kode Pemulihan Akun Anda</h2>
    <p>Berikut adalah daftar kode pemulihan yang dapat digunakan jika Anda kehilangan akses ke kode verifikasi dua langkah:</p>

    <ul>
        @foreach($recoveryCodes as $code)
            <li>{{ $code }}</li>
        @endforeach
    </ul>

    <p><strong>Penting:</strong> Simpan kode ini di tempat yang aman. Setiap kode hanya dapat digunakan sekali.</p>
</body>
</html>
