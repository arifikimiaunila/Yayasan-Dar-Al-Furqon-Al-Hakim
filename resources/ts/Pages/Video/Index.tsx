import React, { useState } from 'react';
import App from '../../Layouts/App';

interface Video {
  no_video: string;
  title: string;
  youtube_id: string;
  published: boolean;
  created_at: string;
}

interface Props {
  videos: Video[];
}

const VideoTable: React.FC<Props> = ({ videos }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter hanya video yang published
  const publishedVideos = videos.filter((video) => video.published);

  // Hitung pagination
  const totalPages = Math.ceil(publishedVideos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVideos = publishedVideos.slice(startIndex, startIndex + itemsPerPage);

  return (
    <App>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <tbody>
            {currentVideos.map((video) => (
              <tr key={video.no_video} className="border-b">
                <td className="p-2">
                  <a href={`/video/show/${video.no_video}`} className="block">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-48 h-28 object-cover rounded"
                    />
                    <div className="mt-2 text-sm font-medium text-blue-600 hover:underline">
                      {video.no_video} - {video.title}
                    </div>
                  </a>
                  <div className="text-xs text-gray-500">{video.created_at}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </App>
  );
};

export default VideoTable;
