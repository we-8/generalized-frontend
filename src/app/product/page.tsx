'use client'
import { Herobanner2 ,SearchBar} from "@/components";
import { hero3 } from "@/assets";
import React,{useState} from "react";

const Product = () => {
  const [searchInput,setSearchInput] = useState('')
  return (
    <div className="app__product--main-div">
      <div>
      <Herobanner2 backgroundImage={hero3} title="Our Products" description="Body text for your whole article or post. We’ll put in some lorem ipsum to show how a filled-out page might look:" />
      </div>
      <div className="app__product--filter-div">
        <div className="app__product--filter-search">
          <SearchBar value={searchInput} onChange={setSearchInput}/>
        </div>
      </div>
    </div>
  )
}

export default Product;