// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   createTechApi,
//   getTechApi,
//   updateTechApi,
//   deleteTechApi,
//   getCategoriesApi,
// } from '../techApi.js';

// // ─── Thunks ──────────────────────────────────────────────────────

// export const fetchTech = createAsyncThunk(
//   'technology/fetchTech',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await getTechApi();
//       return res.data?.data || [];
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Failed to fetch tech news');
//     }
//   }
// );

// export const fetchCategories = createAsyncThunk(
//   'technology/fetchCategories',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await getCategoriesApi();
//       return res.data?.data || [];
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Failed to fetch categories');
//     }
//   }
// );

// export const createTech = createAsyncThunk(
//   'technology/createTech',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const res = await createTechApi(formData);
//       return res.data?.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Failed to create');
//     }
//   }
// );

// export const updateTech = createAsyncThunk(
//   'technology/updateTech',
//   async ({ id, formData }, { rejectWithValue }) => {
//     try {
//       const res = await updateTechApi(id, formData);
//       return res.data?.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Failed to update');
//     }
//   }
// );

// export const deleteTech = createAsyncThunk(
//   'technology/deleteTech',
//   async (id, { rejectWithValue }) => {
//     try {
//       await deleteTechApi(id);
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Failed to delete');
//     }
//   }
// );

// // ─── Slice + Reducer ─────────────────────────────────────────────

// const initialState = {
//   items: [],                    // renamed from techs → items (more generic)
//   categories: [],
//   form: {
//     title: '',
//     description: '',
//     category: '',
//     link: '',
//     images: [],                 // FileList
//   },
//   editId: null,
//   loading: false,
//   tableLoading: false,
//   deleteLoading: {},            // { [id]: boolean }
//   error: null,
// };

// const technologySlice = createSlice({
//   name: 'technology',
//   initialState,
//   reducers: {
//     setFormValue: (state, action) => {
//       const { field, value } = action.payload;
//       state.form[field] = value;
//     },
//     setFormImages: (state, action) => {
//       state.form.images = action.payload; // FileList
//     },
//     beginEdit: (state, action) => {
//       const item = action.payload;
//       state.editId = item._id;
//       state.form = {
//         title: item.title,
//         description: item.description,
//         category: item.category?._id || item.category || '',
//         link: item.link || '',
//         images: [], // can't prefill files
//       };
//     },
//     resetForm: (state) => {
//       state.editId = null;
//       state.form = { title: '', description: '', category: '', link: '', images: [] };
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },

//   extraReducers: (builder) => {
//     // ─── All specific .addCase() handlers FIRST ───
//     builder
//       // fetchTech
//       .addCase(fetchTech.pending, (state) => {
//         state.tableLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchTech.fulfilled, (state, action) => {
//         state.tableLoading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchTech.rejected, (state, action) => {
//         state.tableLoading = false;
//         state.error = action.payload;
//       })

//       // fetchCategories
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.categories = action.payload;
//       })

//       // deleteTech
//       .addCase(deleteTech.pending, (state, action) => {
//         state.deleteLoading[action.meta.arg] = true;
//       })
//       .addCase(deleteTech.fulfilled, (state, action) => {
//         state.deleteLoading[action.payload] = false;
//         state.items = state.items.filter((item) => item._id !== action.payload);
//       })
//       .addCase(deleteTech.rejected, (state, action) => {
//         state.deleteLoading[action.meta.arg] = false;
//         state.error = action.payload;
//       });

//     // ─── THEN the general .addMatcher() calls for create/update ───
//     builder
//       .addMatcher(
//         (action) =>
//           action.type.endsWith('/pending') &&
//           (action.type.includes('createTech') || action.type.includes('updateTech')),
//         (state) => {
//           state.loading = true;
//         }
//       )
//       .addMatcher(
//         (action) =>
//           action.type.endsWith('/fulfilled') &&
//           (action.type.includes('createTech') || action.type.includes('updateTech')),
//         (state) => {
//           state.loading = false;
//           state.editId = null;
//           state.form = { title: '', description: '', category: '', link: '', images: [] };
//         }
//       )
//       .addMatcher(
//         (action) =>
//           action.type.endsWith('/rejected') &&
//           (action.type.includes('createTech') || action.type.includes('updateTech')),
//         (state, action) => {
//           state.loading = false;
//           state.error = action.payload;
//         }
//       );
//   },
// });

// export const {
//   setFormValue,
//   setFormImages,
//   beginEdit,
//   resetForm,
//   clearError,
// } = technologySlice.actions;

// export default technologySlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createTechApi,
  getTechApi,
  updateTechApi,
  deleteTechApi,
  getCategoriesApi,
} from '../techApi.js';

// ─── Thunks ──────────────────────────────────────────────────────
export const fetchTech = createAsyncThunk(
  'technology/fetchTech',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getTechApi();
      return res.data?.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch tech news');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'technology/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCategoriesApi();
      return res.data?.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

export const createTech = createAsyncThunk(
  'technology/createTech',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createTechApi(formData);
      return res.data?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create');
    }
  }
);

export const updateTech = createAsyncThunk(
  'technology/updateTech',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await updateTechApi(id, formData);
      return res.data?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update');
    }
  }
);

export const deleteTech = createAsyncThunk(
  'technology/deleteTech',
  async (id, { rejectWithValue }) => {
    try {
      await deleteTechApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete');
    }
  }
);

// ─── Initial State ─────────────────────────────────────────────
const initialState = {
  items: [],
  categories: [],
  form: {
    title: '',
    description: '',
    category: '',
    link: '',
    images: [],           // New files (FileList)
  },
  editId: null,
  loading: false,
  tableLoading: false,
  deleteLoading: {},      // { [id]: true/false }
  error: null,
};

// ─── Slice ─────────────────────────────────────────────────────
const technologySlice = createSlice({
  name: 'technology',
  initialState,
  reducers: {
    setFormValue: (state, action) => {
      const { field, value } = action.payload;
      state.form[field] = value;
    },

    setFormImages: (state, action) => {
      state.form.images = action.payload; // FileList from input
    },

    beginEdit: (state, action) => {
      const item = action.payload;
      state.editId = item._id;
      state.form = {
        title: item.title || '',
        description: item.description || '',
        category: item.category?._id || item.category || '',
        link: item.link || '',
        images: [],                    // Important: Don't put old files here
      };
    },

    resetForm: (state) => {
      state.editId = null;
      state.form = {
        title: '',
        description: '',
        category: '',
        link: '',
        images: [],
      };
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch Tech
      .addCase(fetchTech.pending, (state) => {
        state.tableLoading = true;
        state.error = null;
      })
      .addCase(fetchTech.fulfilled, (state, action) => {
        state.tableLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTech.rejected, (state, action) => {
        state.tableLoading = false;
        state.error = action.payload;
      })

      // Fetch Categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })

      // Delete Tech
      .addCase(deleteTech.pending, (state, action) => {
        state.deleteLoading[action.meta.arg] = true;
      })
      .addCase(deleteTech.fulfilled, (state, action) => {
        state.deleteLoading[action.payload] = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteTech.rejected, (state, action) => {
        state.deleteLoading[action.meta.arg] = false;
        state.error = action.payload;
      })

      // Create & Update - Common Handlers
      .addMatcher(
        (action) =>
          action.type.endsWith('/pending') &&
          (action.type.includes('createTech') || action.type.includes('updateTech')),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('/fulfilled') &&
          (action.type.includes('createTech') || action.type.includes('updateTech')),
        (state) => {
          state.loading = false;
          state.editId = null;
          state.form = {
            title: '',
            description: '',
            category: '',
            link: '',
            images: [],
          };
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('/rejected') &&
          (action.type.includes('createTech') || action.type.includes('updateTech')),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  setFormValue,
  setFormImages,
  beginEdit,
  resetForm,
  clearError,
} = technologySlice.actions;

export default technologySlice.reducer;