import React from 'react';
import App from "../../Layouts/App";

interface PostProps {
  title: string;
  body: string;
  published: boolean;
  published_at?: string | null;
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  return (
    <App>
      <div className="max-w-3xl mx-auto p-6">
        {post.published ? (
          <div>
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-1">Dibuat oleh Admin</p>
            {post.published_at && (
              <p className="text-gray-600 mb-4">
                Diterbitkan pada {new Date(post.published_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            )}
            <div className="prose max-w-none">
              <p>{post.body}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-red-600">
              Halaman sedang diperbaiki
            </h2>
          </div>
        )}
      </div>
    </App>
  );
};

export default Post;
