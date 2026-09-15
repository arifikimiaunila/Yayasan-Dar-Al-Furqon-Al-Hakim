import React from 'react';
import App from '../../Layouts/App';

interface Yayasan {
  alamat: string;
  email: string;
  garis_lintang: number;
  garis_bujur: number;
  no_telp1: string;
  no_telp2?: string;
  no_fax?: string;
  no_wa?: string;
  youtube?: string;
  facebook?: string;
}

interface Props {
  data: Yayasan;
}

const YayasanDetail: React.FC<Props> = ({ data }) => {
  return (
    <App>
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        {/* Alamat */}
        <div>
          <span className="font-semibold">Alamat: </span>
          <span>{data.alamat}</span>
        </div>

        {/* Email */}
        <div>
          <span className="font-semibold">Email: </span>
          <span>{data.email}</span>
        </div>

        {/* Nomor Telepon */}
        <div>
          <span className="font-semibold">No. Telp 1: </span>
          <span>{data.no_telp1}</span>
        </div>
        {data.no_telp2 && (
          <div>
            <span className="font-semibold">No. Telp 2: </span>
            <span>{data.no_telp2}</span>
          </div>
        )}

        {/* Fax */}
        {data.no_fax && (
          <div>
            <span className="font-semibold">No. Fax: </span>
            <span>{data.no_fax}</span>
          </div>
        )}

        {/* WhatsApp */}
        {data.no_wa && (
          <div>
            <span className="font-semibold">No. WA: </span>
            <span>{data.no_wa}</span>
          </div>
        )}

        {/* Youtube */}
        {data.youtube && (
          <div>
            <span className="font-semibold">YouTube: </span>
            <a
              href={data.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {data.youtube}
            </a>
          </div>
        )}

        {/* Facebook */}
        {data.facebook && (
          <div>
            <span className="font-semibold">Facebook: </span>
            <a
              href={data.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {data.facebook}
            </a>
          </div>
        )}

        {/* Google Map */}
        <div className="mt-6">
          <span className="font-semibold">Lokasi: </span>
          <div className="w-full h-96 mt-2 rounded overflow-hidden shadow">
            <iframe
              src={`https://www.google.com/maps?q=${data.garis_lintang},${data.garis_bujur}&hl=es;z=14&output=embed`}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </App>
  );
};

export default YayasanDetail;
