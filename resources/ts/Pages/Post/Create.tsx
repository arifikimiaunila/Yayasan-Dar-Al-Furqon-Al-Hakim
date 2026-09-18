import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { initProgressBar } from '@/Layouts/ts-js part/progressbar';
import TexEditor from '@/Components/TexEditor';
import Admin1 from '@/Layouts/Admin1';

initProgressBar(); // dari progressbar.ts

const PostCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [published, setPublished] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.post(route('post.store'), {
      title,
      body,
      published,
    });
  };

  return (
    <Admin1>
    <Head title='Buat Artikel'/>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Judul</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
              maxLength={100}
              required
            />
          </div>

          {/* Body menggunakan Texditor */}
          <div>
            <label className="block text-sm font-medium mb-1">Artikel</label>
            <TexEditor
              {...({
                value: body,
                onChange: (value: any) => setBody(value),
              } as any)}
            />
          </div>

          {/* Published checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              id="published"
            />
            <label htmlFor="published">Published</label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Simpan
          </button>
        </form>
      </div>
    </Admin1>
  );
};

export default PostCreate;