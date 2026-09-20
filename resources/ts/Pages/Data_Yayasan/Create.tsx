import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { route } from "ziggy-js";
import BlueButton from "@/Components/Parts/BlueButton";
import SuperAdmin from "@/Layouts/SuperAdmin";
import { initProgressBar } from '@/Layouts/ts-js part/progressbar';

initProgressBar();

const DataYayasanForm: React.FC = () => {
  const [formData, setFormData] = useState({
    alamat: "",
    email: "",
    garis_lintang: "",
    garis_bujur: "",
    no_telp1: "",
    no_telp2: "",
    no_fax: "",
    no_wa: "",
    youtube: "",
    facebook: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <SuperAdmin>
      <Head title="Buat Data Yayasan" />
      <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white shadow rounded">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Buat Data Yayasan</h2>

        {/* Warning syarat validasi */}
        <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 text-sm sm:text-base">
          <strong>Perhatian:</strong> Pastikan data sesuai syarat berikut:
          <ul className="list-disc list-inside mt-2">
            <li>Alamat: wajib, maksimal 1000 karakter</li>
            <li>Email: wajib, format email valid</li>
            <li>Garis lintang & bujur: wajib, angka</li>
            <li>No. Telp 1: wajib, angka</li>
            <li>No. Telp 2, Fax, WA: opsional, angka</li>
            <li>Youtube & Facebook: opsional, format URL http/https</li>
          </ul>
        </div>

        <form
          action={route("data_yayasan.create")}
          method="POST"
          className="space-y-4"
        >
          <div>
            <label htmlFor="alamat" className="block font-semibold">
              Alamat
            </label>
            <textarea
              name="alamat"
              id="alamat"
              rows={3}
              className="w-full border rounded p-2"
              required
              value={formData.alamat}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full border rounded p-2"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Grid otomatis jadi 1 kolom di mobile, 2 kolom di layar >= sm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="garis_lintang" className="block font-semibold">
                Garis Lintang
              </label>
              <input
                type="number"
                step="0.01"
                name="garis_lintang"
                id="garis_lintang"
                className="w-full border rounded p-2"
                required
                value={formData.garis_lintang}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="garis_bujur" className="block font-semibold">
                Garis Bujur
              </label>
              <input
                type="number"
                step="0.01"
                name="garis_bujur"
                id="garis_bujur"
                className="w-full border rounded p-2"
                required
                value={formData.garis_bujur}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Input lainnya */}
          <div>
            <label htmlFor="no_telp1" className="block font-semibold">
              No. Telp 1
            </label>
            <input
              type="number"
              name="no_telp1"
              id="no_telp1"
              className="w-full border rounded p-2"
              required
              value={formData.no_telp1}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="no_telp2" className="block font-semibold">
              No. Telp 2
            </label>
            <input
              type="number"
              name="no_telp2"
              id="no_telp2"
              className="w-full border rounded p-2"
              value={formData.no_telp2}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="no_fax" className="block font-semibold">
              No. Fax
            </label>
            <input
              type="number"
              name="no_fax"
              id="no_fax"
              className="w-full border rounded p-2"
              value={formData.no_fax}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="no_wa" className="block font-semibold">
              No. WA
            </label>
            <input
              type="number"
              name="no_wa"
              id="no_wa"
              className="w-full border rounded p-2"
              value={formData.no_wa}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="youtube" className="block font-semibold">
              YouTube
            </label>
            <input
              type="url"
              name="youtube"
              id="youtube"
              className="w-full border rounded p-2"
              placeholder="https://youtube.com/..."
              value={formData.youtube}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="facebook" className="block font-semibold">
              Facebook
            </label>
            <input
              type="url"
              name="facebook"
              id="facebook"
              className="w-full border rounded p-2"
              placeholder="https://facebook.com/..."
              value={formData.facebook}
              onChange={handleChange}
            />
          </div>

          {/* BlueButton responsif */}
          <div className="flex justify-end">
            <BlueButton
              href={route("data_yayasan.create")}
              method="post"
              as="button"
            >
              Simpan
            </BlueButton>
          </div>
        </form>
      </div>
    </SuperAdmin>
  );
};

export default DataYayasanForm;
