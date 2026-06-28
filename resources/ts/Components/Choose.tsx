import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // or Next.js router

interface FormData {
  title: string;
  body: string;
  published: boolean;
  published_at: string;
}

interface FormErrors {
  title?: string;
  body?: string;
  published_at?: string;
}

export default function Choose() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [form, setForm] = useState<FormData>({
    title: '',
    body: '',
    published: false,
    published_at: new Date().toISOString().slice(0, 16),
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleTogglePublished = () => {
    setForm((prev) => ({
      ...prev,
      published: !prev.published,
    }));
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // TODO: Call your API endpoint to update the post
      // Example: await updatePost(form);
      console.log('Updating post:', form);
      // Then redirect on success
      // navigate('/post/edit');
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeletePost = async () => {
    if (confirm('Apakah Anda yakin ingin menghapus artikel ini secara permanen?')) {
      try {
        setIsProcessing(true);
        // TODO: Call your API endpoint to delete the post
        // Example: await deletePost(postId);
        console.log('Deleting post');
        // Then redirect on success
        // navigate('/post/edit');
      } catch (error) {
        console.error('Error deleting post:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Breadcrumb & Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/post/edit')}
          className="text-sm text-blue-600 hover:underline flex items-center mb-2 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Kembali ke Daftar Artikel
        </button>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Edit Artikel
        </h1>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <form onSubmit={handleUpdatePost} className="p-8 md:p-12 space-y-8">
          {/* Section 1: Title */}
          <div>
            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">
              Judul Artikel
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleInputChange}
              className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-xl font-bold"
              placeholder="Masukkan judul yang menarik..."
            />
            {errors.title && (
              <div className="text-red-500 text-xs mt-2 font-bold">
                {errors.title}
              </div>
            )}
          </div>

          {/* Section 2: Content */}
          <div>
            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">
              Isi Artikel
            </label>
            <textarea
              name="body"
              value={form.body}
              onChange={handleInputChange}
              rows={12}
              className="w-full px-5 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-serif text-lg leading-relaxed"
              placeholder="Tuliskan isi artikel Anda di sini..."
            ></textarea>
            {errors.body && (
              <div className="text-red-500 text-xs mt-2 font-bold">
                {errors.body}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-50">
            {/* Section 3: Publication Status */}
            <div>
              <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-4">
                Status Publikasi
              </label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={handleTogglePublished}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${
                    form.published ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md ${
                      form.published ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span
                  className={`font-bold text-sm transition-colors ${
                    form.published
                      ? 'text-green-600'
                      : 'text-gray-400'
                  }`}
                >
                  {form.published
                    ? 'PUBLISHED (Aktif)'
                    : 'DRAFT (Tersembunyi)'}
                </span>
              </div>
            </div>

            {/* Section 4: Published Date */}
            <div>
              <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2">
                Tanggal Terbit
              </label>
              <input
                type="datetime-local"
                name="published_at"
                value={form.published_at}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border-transparent rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-bold"
              />
              {errors.published_at && (
                <div className="text-red-500 text-xs mt-2 font-bold">
                  {errors.published_at}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleDeletePost}
              disabled={isProcessing}
              className="text-red-400 hover:text-red-600 font-bold text-sm transition-colors order-2 md:order-1 disabled:opacity-50"
            >
              Hapus Artikel Secara Permanen
            </button>

            <div className="flex items-center space-x-4 w-full md:w-auto order-1 md:order-2">
              <button
                type="button"
                onClick={() => navigate('/post/edit')}
                className="px-8 py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors"
              >
                Batal
              </button>

              {/* Update Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 md:flex-none px-10 py-4 bg-gray-900 text-white rounded-2xl font-black shadow-xl shadow-gray-200 hover:bg-blue-600 hover:shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center"
              >
                {isProcessing && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {isProcessing ? 'Memperbarui...' : 'Update Artikel'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
