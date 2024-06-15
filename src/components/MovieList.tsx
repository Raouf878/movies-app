import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchMovies, setCurrentPage, setItemsPerPage, setSelectedCategories, deleteMovie } from '../store/Movies/MoviesSlice';
import MovieCard from './MovieCard';
import CategoryFilter from './CategoryFilter';
import Icon from './common/Icon';
import './MovieList.css';

const MovieList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, status, selectedCategories, currentPage, itemsPerPage } = useSelector((state: RootState) => state.movies);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setItemsPerPage(Number(e.target.value)));
  };

  const handleCategoryChange = (category: string) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    dispatch(setSelectedCategories(newSelectedCategories));
  };

  const handleDeleteMovie = (id: string) => {
    dispatch(deleteMovie(id));
  };

  const filteredMovies = selectedCategories.length > 0
    ? movies.filter(movie => selectedCategories.includes(movie.category))
    : movies;

  const paginatedMovies = filteredMovies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="movies-main">
      <div className="top-controls">
        
        <button className="filter-button" onClick={() => setIsModalOpen(true)}>
          <Icon name="filter" width={20} height={20} />
        </button>
        <select className='selectNumber' onChange={handleItemsPerPageChange} value={itemsPerPage}>
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
        </select>
      </div>

      <div className="movie-list">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error loading movies</p>}
        {paginatedMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onDelete={() => handleDeleteMovie(movie.id)} />
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * itemsPerPage >= filteredMovies.length}>Next</button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Select Categories</h3>
            <button className="close-button" onClick={() => setIsModalOpen(false)}>Close</button>
            <div className="category-options">
              {Array.from(new Set(movies.map(movie => movie.category))).map(category => (
                <label key={category} className="custom-radio">
                  <input
                    type="checkbox"
                    name="category"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span className="checkmark"></span>
                  {category}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
