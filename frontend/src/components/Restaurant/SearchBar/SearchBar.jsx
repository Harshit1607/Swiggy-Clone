import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css'; // Importing CSS module

const SearchBar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.menuSearchDiv}>
      <span>Menu</span>
      <div className={styles.searchBox} onClick={() => navigate('/search/menu')}>
        <div>Search for dishes</div>
      </div>
    </div>
  )
}

export default SearchBar;
