import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleLike, toggleDislike } from '../store/Movies/MoviesSlice';
import { Movie } from '../types/movies';
import { MovieCardProps } from '../types/movies';


const MovieCard: React.FC<MovieCardProps> = ({ movie, onDelete }) => {
  const dispatch = useDispatch();

  return (
    <div className="movie-card">
      <h3><strong>{movie.title}</strong></h3>
      <p>Category: {movie.category}</p>
      <div className="like-dislike-container">
        <div className="like-section" onClick={() => dispatch(toggleLike(movie.id))}>
          
<span role="img" aria-label="thumbs up">👍</span> {movie.likes}
        </div>
        <div className="dislike-section" onClick={() => dispatch(toggleDislike(movie.id))}>
          <span role="img" aria-label="thumbs down">👎</span> {movie.dislikes}
        </div>
      </div>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default MovieCard;










