import React from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  return (
    <div className="menu-search-div">
      <span>Menu</span>
      <div className='search-box' onClick={()=>navigate('/search/menu')}>
        <div>Search for dishes</div>
      </div>
    </div>
  )
}

export default SearchBar