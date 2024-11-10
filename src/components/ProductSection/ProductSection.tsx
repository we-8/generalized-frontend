'use client'
import React,{useState} from 'react'
import SearchBar from '../SearchBar/SearchBar';
import { AddtoCart } from '../CommonButtons/CommonButtons';
import '../../styles/components-css/ProductSection.css';
import { test3 } from '@/assets';
import Image from 'next/image';

const ProductSection = () => {
  const [searchInput,setSearchInput] = useState('')

  const products = [
    { productName: 'Cashews', new_price: 'Rs 2450', description: 'A dialog is a 23234 32432 dfdgfg  gfgdf gdf gdfg fd  type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made...', image: test3 },
    { productName: 'Almonds', new_price: 'Rs 3500', description: 'A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made...', image: test3 },
    { productName: 'Almonds1', new_price: 'Rs 3500',description: 'A dialog is a type of modal  gdfg dgf dgd fgfdg dfgfd gdf gdfg gdfg window that appears in front of app content to provide critical information, or prompt for a decision to be made...', image: test3 },
    { productName: 'Almonds2', new_price: 'Rs 3500', description: 'A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made...', image: test3 },
    { productName: 'Almonds3', new_price: 'Rs 3500', description: 'Apearovide critical information, or prompt for a decision to be made...', image: test3 },
  
  ];

  return (
    <div className='app__product--main-div'>
      <div className="app__product--filter-div section__padding">
        <div className="app__product--filter-search">
          <SearchBar value={searchInput} onChange={setSearchInput}/>
        </div>
        <div className='app__product--filter-tags'></div>
      </div>
      <div className='app__product--product-section section__padding'>
        {products.map((product, index) =>(
          <div className='app__product--single-product' key={index}>
            <Image className='single-product-img' src={product.image} alt="product image"/>
            <div className='single-product-details'>
              <p className='single-product-name'>{product.productName}</p>
              <p className='single-product-description'>{product.description.length>80 ? (product.description.slice(0,80)+'...'):(product.description)}</p>
              <p className='single-product-price'>{product.new_price}.00</p>
            </div>
            <AddtoCart title="Add to Cart"/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductSection;