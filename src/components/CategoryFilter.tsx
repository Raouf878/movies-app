import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Icon from './common/Icon';

const CategoryFilter: React.FC = () => {
  const { selectedCategories } = useSelector((state: RootState) => state.movies);

  if (selectedCategories.length === 0) {
    return <div className="category-filter">No category selected</div>;
  }

  return (
    <div className="category-filter">
      
      {selectedCategories.map(category => (
        <div key={category} className="category-filter-card selected">
          {category}
          <Icon name={`${category}`} width={30} height={30} />
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
