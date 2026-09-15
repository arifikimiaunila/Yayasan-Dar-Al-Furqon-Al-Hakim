import React from 'react';
import App from '../../Layouts/App';

interface Video {
  no_video: string;
  title: string;
  youtube_id: string;
  created_at: string;
}

interface Props {
  video: Video;
}

const VideoPlayer: React.FC<Props> = ({ video }) => {
  return (
    <App>
      <div className="flex flex-col items-center space-y-4">
        {/* Judul video */}
        <h2 className="text-lg font-semibold text-blue-600">
          {video.no_video} - {video.title}
        </h2>

        {/* YouTube video player */}
        <div className="w-full max-w-2xl aspect-video">
          <iframe
            className="w-full h-full rounded"
            src={`https://www.youtube.com/embed/${video.youtube_id}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Metadata */}
        <div className="text-sm text-gray-600">
          <p>Youtube ID: {video.youtube_id}</p>
          <p>Created at: {video.created_at}</p>
        </div>
      </div>
    </App>
  );
};

export default VideoPlayer;
