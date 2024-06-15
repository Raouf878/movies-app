import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MovieList from './components/MovieList/MovieList';
import CategoryFilter from './components/CategoryFilter';
import './App.css';

import HomePage from './components/HomePage';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <HomePage/>
        <CategoryFilter />
        <MovieList />
        <Footer/>
      </div>
    </Provider>
  );
};

export default App;
