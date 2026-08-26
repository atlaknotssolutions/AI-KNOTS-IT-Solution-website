
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// CKEditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
  fetchTech,
  fetchCategories,
  createTech,
  updateTech,
  deleteTech,
  setFormValue,
  setFormImages,
  beginEdit,
  resetForm,
  clearError,
} from './techSlice/techSlice.js';

const TechNews = () => {
  const dispatch = useDispatch();

  const {
    items: techs,
    categories,
    form,
    editId,
    loading,
    tableLoading,
    deleteLoading,
    error,
  } = useSelector((state) => state.technology);

  // Preview Modal
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  // Image Management States
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);

  useEffect(() => {
    dispatch(fetchTech());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // ==================== PREVIEW ====================
  const openPreview = (row) => {
    setPreviewItem(row);
    setPreviewModalOpen(true);
  };

  const handleImageChange = (e) => {
    dispatch(setFormImages(e.target.files));
  };

  // ==================== SUBMIT ====================
   // ==================== SUBMIT ====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append('link', form.link);

    // New Images
    if (form.images?.length > 0) {
      for (let i = 0; i < form.images.length; i++) {
        formData.append('images', form.images[i]);
      }
    }

    // Images to Remove
    if (imagesToRemove.length > 0) {
      formData.append('imagesToRemove', JSON.stringify(imagesToRemove));
    }

    try {
      const action = editId
        ? updateTech({ id: editId, formData })
        : createTech(formData);

      await dispatch(action).unwrap();   // ← Better error handling

      toast.success(editId ? 'Updated successfully!' : 'Created successfully!');

      dispatch(resetForm());
      setExistingImages([]);
      setImagesToRemove([]);
      dispatch(fetchTech());        // Refresh table

    } catch (err) {
      toast.error(err?.message || 'Update failed');
    }
  };
  const handleEdit = (row) => {
    dispatch(beginEdit(row));
    setExistingImages(row.images || []);
    setImagesToRemove([]);
    toast.info(`Editing: ${row.title}`);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this item?')) return;
    dispatch(deleteTech(id)).then((result) => {
      if (!result.error) toast.success('Deleted successfully');
    });
  };

  // Remove Existing Image
  const removeExistingImage = (imgUrl) => {
    setImagesToRemove((prev) => [...prev, imgUrl]);
    setExistingImages((prev) => prev.filter((img) => img !== imgUrl));
  };

  // Columns
  const columns = useMemo(() => [
    { name: 'No.', selector: (row, index) => index + 1, width: '80px' },
    { 
      name: 'Title', 
      selector: (row) => row.title, 
      sortable: true,
      wrap: true 
    },
    { 
      name: 'Category', 
      selector: (row) => row.category?.name || '—' 
    },
    {
      name: 'Link',
      cell: (row) => row.link ? (
        <a href={row.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Visit Link
        </a>
      ) : '—',
    },
    {
      name: 'Images',
      cell: (row) => (
        <div className="flex gap-2 flex-wrap">
          {row.images?.slice(0, 3).map((src, i) => (
            <img key={i} src={src} alt="" className="w-12 h-12 object-cover rounded border" />
          ))}
          {row.images?.length > 3 && <span className="text-xs text-gray-500">+{row.images.length - 3}</span>}
        </div>
      ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => openPreview(row)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
          >
            👁️ Preview
          </button>
          <button
            onClick={() => handleEdit(row)}
            disabled={loading}
            className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            disabled={deleteLoading[row._id]}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            {deleteLoading[row._id] ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      ),
      width: '280px'
    },
  ], [loading, deleteLoading]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ToastContainer position="top-right" autoClose={4000} theme="colored" />

      {/* ==================== FORM ==================== */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg mb-10 space-y-6">
        <h2 className="text-2xl font-bold">
          {editId ? 'Update Tech News' : 'Add Tech News'}
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => dispatch(setFormValue({ field: 'title', value: e.target.value }))}
          className="w-full border p-3 rounded focus:ring-2 focus:ring-indigo-500"
          required
          disabled={loading}
        />

        <select
          value={form.category}
          onChange={(e) => dispatch(setFormValue({ field: 'category', value: e.target.value }))}
          className="w-full border p-3 rounded focus:ring-2 focus:ring-indigo-500"
          required
          disabled={loading}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <input
          type="url"
          placeholder="https://..."
          value={form.link}
          onChange={(e) => dispatch(setFormValue({ field: 'link', value: e.target.value }))}
          className="w-full border p-3 rounded focus:ring-2 focus:ring-indigo-500"
          required
          disabled={loading}
        />

        <div>
          <label className="block mb-2 font-medium">Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={form.description || ''}
            onChange={(_, editor) => {
              dispatch(setFormValue({ field: 'description', value: editor.getData() }));
            }}
            config={{
              toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'undo', 'redo'],
              placeholder: 'Write your description here...',
            }}
            disabled={loading}
          />
        </div>

        {/* ==================== IMAGE UPLOAD ==================== */}
        <div>
          <label className="block mb-2 font-medium">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 w-full"
            disabled={loading}
          />

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2 text-gray-700">Existing Images:</p>
              <div className="flex flex-wrap gap-3">
                {existingImages.map((img, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={img}
                      alt="existing"
                      className="w-20 h-20 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(img)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Images Preview */}
          {form.images?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2 text-green-600">New Images to Upload:</p>
              <div className="flex flex-wrap gap-3">
                {Array.from(form.images).map((file, i) => (
                  <div key={i} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded border"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-3 rounded text-white font-medium ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {loading ? 'Processing...' : editId ? 'Update Tech News' : 'Create Tech News'}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => {
                dispatch(resetForm());
                setExistingImages([]);
                setImagesToRemove([]);
              }}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ==================== DATA TABLE ==================== */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {tableLoading ? (
          <div className="p-10 text-center min-h-[300px] flex flex-col items-center justify-center gap-4">
            <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full" />
            <p>Loading tech news...</p>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={techs}
            pagination
            highlightOnHover
            pointerOnHover
            responsive
            noDataComponent="No tech news found"
          />
        )}
      </div>

      {/* ==================== PREVIEW MODAL ==================== */}
      {previewModalOpen && previewItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-5 border-b flex justify-between items-center bg-white sticky top-0">
              <h2 className="text-2xl font-bold">Live Preview</h2>
              <button 
                onClick={() => setPreviewModalOpen(false)}
                className="text-4xl text-gray-400 hover:text-black"
              >
                ×
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {previewItem.images?.length > 0 && (
                <img
                  src={previewItem.images[0]}
                  alt={previewItem.title}
                  className="w-full h-80 object-cover rounded-2xl mb-6 shadow-md"
                />
              )}

              <h1 className="text-4xl font-bold mb-4">{previewItem.title}</h1>
              
              {previewItem.link && (
                <a href={previewItem.link} target="_blank" className="text-blue-600 hover:underline mb-6 block">
                  {previewItem.link}
                </a>
              )}

              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: previewItem.description || '' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechNews;