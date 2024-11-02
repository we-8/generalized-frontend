'use client'
import React,{useState} from 'react'
import SearchBar from '../SearchBar/SearchBar';

const ProductSection = () => {
  const [searchInput,setSearchInput] = useState('')
  return (
    <div>
      <div className="app__product--filter-div section__padding">
        <div className="app__product--filter-search">
          <SearchBar value={searchInput} onChange={setSearchInput}/>
        </div>
      </div>
    </div>
  )
}

export default ProductSection;