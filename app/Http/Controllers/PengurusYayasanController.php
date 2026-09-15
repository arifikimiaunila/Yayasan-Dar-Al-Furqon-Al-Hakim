<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePengurusYayasanRequest;
use App\Models\pengurus_yayasans;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PengurusYayasanController extends Controller
{
    public function index()
    {
        $pengurus = pengurus_yayasans::query()->latest('id_pengurus')->paginate(20);

        return Inertia::render('Pengurus/Index', [
            'pengurus' => $pengurus,
        ]);
    }

   public function show(Request $request, int $id_pengurus): Response
    {
    $pengurus = pengurus_yayasans::query()->where('id_pengurus', $id_pengurus)->firstOrFail();

    // Jika ada query string download=1, maka kirim file foto
    if ($request->has('download')) {
        $fileName = $pengurus->link_foto;
        $filePath = resource_path("ts/photos/{$fileName}");

        if (!file_exists($filePath)) {
            abort(404, 'Foto tidak ditemukan.');
        }

        return response()->download($filePath, $fileName, [
            'Content-Type' => mime_content_type($filePath),
        ]);
    }

    // Default: render halaman Inertia
    return inertia('Pengurus/Show', [
        'pengurus' => $pengurus,
        'link_foto' => route('pengurus.show', ['id_pengurus' => $id_pengurus, 'download' => 1]),
    ]);
    }

   public function choose_one(int $id_pengurus): Response
{
    $data = pengurus_yayasans::query()->where('id_pengurus', $id_pengurus)->firstOrFail();

    return Inertia::render('Pengurus/Choose', [
        'pengurus' => $data,
    ]);
}

    public function create(): Response
    {
    return Inertia::render('Pengurus/Create');
    }

   public function store(StorePengurusYayasanRequest $request): RedirectResponse
{
    // Ambil semua data validasi
    $data = $request->validated();

    // Jika ada file foto diupload
    if ($request->hasFile('link_foto')) {
        $file = $request->file('link_foto');

        // Ambil nama file dari input admin (misalnya field 'nama_file')
        // Jika tidak ada, gunakan nama asli file upload
        $fileName = $request->input('nama_file') 
            ? $request->input('nama_file') . '.' . $file->getClientOriginalExtension()
            : $file->getClientOriginalName();

        // Simpan ke folder resources/ts/photos
        $file->move(resource_path('ts/photos'), $fileName);

        // Simpan nama file ke kolom link_foto
        $data['link_foto'] = $fileName;
    }

    // Buat data pengurus yayasan
    pengurus_yayasans::create($data);

    return redirect()->route('home')->with('message', 'Pengurus yayasan berhasil dibuat.');
    }

    public function edit(): Response
{
    $pengurus = pengurus_yayasans::query()
        ->select(['id_pengurus', 'nama'])
        ->latest('id_pengurus')
        ->get();

    return Inertia::render('Pengurus/Edit', [
        'pengurus' => $pengurus,
    ]);
}

   public function update(StorePengurusYayasanRequest $request, int $id_pengurus): RedirectResponse
{
    $pengurus = pengurus_yayasans::query()->where('id_pengurus', $id_pengurus)->firstOrFail();
    $data = $request->validated();

    // Jika ada file foto baru diupload
    if ($request->hasFile('link_foto')) {
        $file = $request->file('link_foto');

        // Hapus file foto lama jika ada
        if ($pengurus->link_foto) {
            $oldFilePath = resource_path("ts/photos/{$pengurus->link_foto}");
            if (File::exists($oldFilePath)) {
                File::delete($oldFilePath);
            }
        }

        // Gunakan nama file dari input admin (misalnya field 'nama_file'), jika tidak ada pakai nama asli
        $fileName = $request->input('nama_file')
            ? $request->input('nama_file') . '.' . $file->getClientOriginalExtension()
            : $file->getClientOriginalName();

        // Simpan file baru ke folder resources/ts/photos
        $file->move(resource_path('ts/photos'), $fileName);

        // Update kolom link_foto dengan nama file baru
        $data['link_foto'] = $fileName;
    } elseif ($request->boolean('hapus_foto')) {
        // Jika admin memilih untuk menghapus foto tanpa mengganti
        if ($pengurus->link_foto) {
            $oldFilePath = resource_path("ts/photos/{$pengurus->link_foto}");
            if (File::exists($oldFilePath)) {
                File::delete($oldFilePath);
            }
        }
        $data['link_foto'] = null;
    }

    // Update data pengurus yayasan
    $pengurus->update($data);

    return redirect()->route('pengurus_yayasan.show', $id_pengurus)->with('message', 'Pengurus yayasan berhasil diupdate.');
    }

    public function destroy(int $id_pengurus): RedirectResponse
{
    $pengurus = pengurus_yayasans::query()->where('id_pengurus', $id_pengurus)->firstOrFail();

    // Jika ada file foto, hapus dari folder resources/ts/photos
    if ($pengurus->link_foto) {
        $filePath = resource_path("ts/photos/{$pengurus->link_foto}");
        if (File::exists($filePath)) {
            File::delete($filePath);
        }
    }

    // Hapus data pengurus dari database
    $pengurus->delete();

    return redirect()->route('home')->with('message', 'Pengurus yayasan berhasil dihapus beserta file foto terkait.');
}
}
