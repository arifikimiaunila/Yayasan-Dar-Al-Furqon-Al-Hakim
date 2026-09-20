import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { initProgressBar } from '@/Layouts/ts-js part/progressbar';
import TexEditor from '@/Components/TexEditor';
import Admin1 from '@/Layouts/Admin1';
import BlueButton from '@/Components/Parts/BlueButton';

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
      <Head title="Buat Artikel" />
      <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Create New Post</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Judul</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2 text-sm sm:text-base"
              maxLength={100}
              required
            />
          </div>

          {/* Body menggunakan TexEditor */}
          <div>
            <label className="block text-sm font-medium mb-1">Artikel</label>
            <TexEditor
              {...({
                value: body,
                onChange: (value: any) => setBody(value),
              } as any)}
            />
          </div>

          {/* Published Toggle Switch */}
          <div>
            <label className="block text-sm font-medium mb-2">Published</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="sr-only peer"
              />
              {/* Track */}
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
              {/* Thumb */}
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-5 transition-transform"></div>
              {/* Label True/False */}
              <span className="ml-3 text-sm text-gray-700">
                {published ? 'True' : 'False'}
              </span>
            </label>
          </div>

          {/* Submit button dengan BlueButton */}
          {/* Submit button dengan BlueButton */}
<div className="flex flex-col sm:flex-row gap-3">
  <BlueButton href={route('post.create')} as="a" method="get">
    Simpan
  </BlueButton>
</div>

        </form>
      </div>
    </Admin1>
  );
};

export default PostCreate;
