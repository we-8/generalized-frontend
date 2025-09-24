'use client'
import React, { useRef, useState, useEffect } from 'react';
import '../../styles/components-css/LatestProducts.css';
import { test3 } from '@/assets';
import { TitleL } from '../Title/Title';
import { OrderNow2 } from '../CommonButtons/CommonButtons';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// Type definitions
interface BackendProduct {
  id?: string;
  product_name: string;
  product_description: string;
  product_features: string;
  product_price: string;
  availability_status: string;
  product_image: string;
  category: string;
  special_offers: boolean;
  whats_new: boolean;
}

interface TransformedLatestProduct {
  id?: string;
  productName: string;
  new_price: string;
  description: string;
  image: any;
  features: string;
  availability: string;
}

const LatestProducts = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [products, setProducts] = useState<TransformedLatestProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products with whats_new: true
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://139.59.65.41/v1/products/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data: BackendProduct[] = await response.json();
        
        // DEBUG: Log the actual response to see what fields are coming from backend
        console.log('Latest Products - Backend response:', data);
        console.log('Latest Products - First product:', data[0]);
        console.log('Latest Products - Fields in first product:', Object.keys(data[0] || {}));
        
        // Check if whats_new field exists in the response
        if (data.length > 0) {
          const hasWhatsNewField = 'whats_new' in data[0];
          console.log('Has whats_new field:', hasWhatsNewField);
          
          if (!hasWhatsNewField) {
            console.warn('whats_new field is missing from API response!');
            // TEMPORARY FIX: Since backend doesn't return whats_new field,
            // we'll show first 5 products as latest products for now
            
            const latestProducts = data.slice(0, 5);
            
            const transformedProducts: TransformedLatestProduct[] = latestProducts.map((product: BackendProduct) => ({
              id: product.id,
              productName: product.product_name,
              new_price: `Rs ${product.product_price}`,
              description: product.product_description,
              image: product.product_image ? `http://139.59.65.41/${product.product_image}` : test3,
              features: product.product_features,
              availability: product.availability_status
            }));
            
            setProducts(transformedProducts);
            return;
          }
        }
        
        // Filter products that have whats_new: true (original logic)
        const latestProducts = data.filter((product: BackendProduct) => {
          console.log(`Product: ${product.product_name}, whats_new: ${product.whats_new}`);
          return product.whats_new === true;
        });
        
        console.log('Filtered latest products:', latestProducts);
        
        // Transform the data to match your component structure
        const transformedProducts: TransformedLatestProduct[] = latestProducts.map((product: BackendProduct) => ({
          id: product.id,
          productName: product.product_name,
          new_price: `Rs ${product.product_price}`,
          description: product.product_description,
          // Use correct server path for product images
          image: product.product_image ? `http://139.59.65.41/${product.product_image}` : test3,
          features: product.product_features,
          availability: product.availability_status
        }));
        
        setProducts(transformedProducts);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        console.error('Error fetching latest products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  const settings = {
    infinite: products.length > 1, // Only infinite if more than 1 product
    speed: 500,
    arrows: false,
    slidesToShow: Math.min(3, products.length), // Don't show more slides than products
    slidesToScroll: 1, // Changed to 1 for better control
    pauseOnHover: true,
    autoplay: false, // Disable autoplay to prevent issues
    swipeToSlide: true,
    variableWidth: false, // Ensure consistent width
    responsive: [
      { 
        breakpoint: 1440, 
        settings: { 
          slidesToShow: Math.min(2, products.length), 
          slidesToScroll: 1, 
          infinite: products.length > 2,
          initialSlide: 0
        }
      },
      { 
        breakpoint: 1024, 
        settings: { 
          slidesToShow: Math.min(2, products.length), 
          slidesToScroll: 1, 
          infinite: products.length > 2,
          initialSlide: 0
        } 
      },
      { 
        breakpoint: 768, 
        settings: { 
          slidesToShow: Math.min(2, products.length), 
          slidesToScroll: 1, 
          initialSlide: 0 
        } 
      },
      { 
        breakpoint: 600, 
        settings: { 
          slidesToShow: 1, 
          slidesToScroll: 1, 
          initialSlide: 0 
        } 
      },
      { 
        breakpoint: 480, 
        settings: { 
          slidesToShow: 1, 
          slidesToScroll: 1, 
          initialSlide: 0 
        } 
      },
    ],
  };

  // Loading state
  if (loading) {
    return (
      <div className='app__latestProducts--main-div'>
        <TitleL title="What's New"/>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading latest products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className='app__latestProducts--main-div'>
        <TitleL title="What's New"/>
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          <p>Error loading latest products: {error}</p>
        </div>
      </div>
    );
  }

  // No products state
  if (products.length === 0) {
    return (
      <div className='app__latestProducts--main-div'>
        <TitleL title="What's New"/>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No new products available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='app__latestProducts--main-div'>
      <TitleL title="What's New"/>
      
      {products.length === 1 ? (
        // Single product - render without slider
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <div className='app__latestProduct--item-div' style={{ maxWidth: '400px', width: '100%' }}>
            <div className='item__card'>
              <Image 
                className='product-image' 
                src={products[0].image} 
                alt="new product image"
                width={300}
                height={200}
                unoptimized
                style={{ objectFit: 'cover' }}
              />
              <p className='static__p'>{products[0].productName}</p>
              <div className='static__div'>
                <p className='static__div-title'>{products[0].productName}</p>
                <p className='static__div-description'>
                  {products[0].description.length > 140 ? 
                    (products[0].description.slice(0, 140) + '...') : 
                    (products[0].description)
                  }
                </p>
                <p className='static__div-price'>{products[0].new_price}</p>
                <OrderNow2 title='Order Now'/>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Multiple products - render with slider
        <>
          <button className='prev-buttonL' onClick={() => sliderRef.current?.slickPrev()}>
            <IoIosArrowBack color="#FFCF2C" fontWeight={600} size={40}/>
          </button>
          
          {/* Key prop added to force re-render when products change */}
          <Slider key={products.length} ref={sliderRef} {...settings}>
            {products.map((product: TransformedLatestProduct, index: number) => (
              <div className='app__latestProduct--item-div' key={product.id || index}>
                <div className='item__card'>
                  <Image 
                    className='product-image' 
                    src={product.image} 
                    alt="new product image"
                    width={300}
                    height={200}
                    unoptimized
                    style={{ objectFit: 'cover' }}
                  />
                  <p className='static__p'>{product.productName}</p>
                  <div className='static__div'>
                    <p className='static__div-title'>{product.productName}</p>
                    <p className='static__div-description'>
                      {product.description.length > 140 ? 
                        (product.description.slice(0, 140) + '...') : 
                        (product.description)
                      }
                    </p>
                    <p className='static__div-price'>{product.new_price}</p>
                    <OrderNow2 title='Order Now'/>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          
          <button className='next-buttonL' onClick={() => sliderRef.current?.slickNext()}>
            <IoIosArrowForward color="#FFCF2C" fontWeight={600} size={40}/>
          </button>
        </>
      )}
    </div>
  );
};

export default LatestProducts;