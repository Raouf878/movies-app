import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { movies$ } from '../../movies';
import { MoviesState } from '../../types/movies';
import { Movie } from '../../types/movies';



const initialState: MoviesState = {
  movies: [],
  status: 'idle',
  selectedCategories: [],
  currentPage: 1,
  itemsPerPage: 4,
};

export const fetchMovies = createAsyncThunk<Movie[]>('movies/fetchMovies', async () => {
  const response = await movies$;
  return response;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    deleteMovie: (state, action: PayloadAction<string>) => {
      const movieId = action.payload;
      const movie = state.movies.find(movie => movie.id === movieId);
      if (movie) {
        state.movies = state.movies.filter(movie => movie.id !== movieId);
        const categoryMovies = state.movies.filter(m => m.category === movie.category);
        if (categoryMovies.length === 0) {
          state.selectedCategories = state.selectedCategories.filter(c => c !== movie.category);
        }
      }
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const movie = state.movies.find(movie => movie.id === action.payload);
      if (movie) {
        movie.likes += 1;
      }
    },
    toggleDislike: (state, action: PayloadAction<string>) => {
      const movie = state.movies.find(movie => movie.id === action.payload);
      if (movie) {
        movie.dislikes += 1;
      }
    },
    setSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'idle';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {
  deleteMovie,
  toggleLike,
  toggleDislike,
  setSelectedCategories,
  setCurrentPage,
  setItemsPerPage,
} = moviesSlice.actions;

export default moviesSlice.reducer;
