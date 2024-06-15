export interface Movie {
    id: string;
    title: string;
    category: string;
    likes: number;
    dislikes: number;
  }
  
export interface MoviesState {
    movies: Movie[];
    status: 'idle' | 'loading' | 'failed';
    selectedCategories: string[];
    currentPage: number;
    itemsPerPage: number;
  }
  export interface MovieCardProps {
    movie: Movie;
    onDelete: () => void;
  }