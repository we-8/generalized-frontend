'use client';
import React, { useRef, useState, useEffect } from 'react';
import '../../styles/components-css/SpecialOffer.css';
import { test2, Cashew } from '@/assets';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { OrderNow } from '../CommonButtons/CommonButtons';
import { TitleL } from '@/components';

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

interface TransformedSpecialProduct {
  id?: string;
  productName: string;
  new_price: string;
  old_price: string;
  description: string;
  image: any;
  features: string;
  availability: string;
}

const SpecialOffers = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [products, setProducts] = useState<TransformedSpecialProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate old price (assuming discount percentage)
  const calculateOldPrice = (currentPrice: string): string => {
    const price = parseFloat(currentPrice);
    const discountPercentage = 0.20; // 20% discount
    const oldPrice = price / (1 - discountPercentage);
    return Math.round(oldPrice).toString();
  };

  // Fetch products with special_offers: true
  useEffect(() => {
    const fetchSpecialOfferProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://139.59.65.41/v1/products/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data: BackendProduct[] = await response.json();
        
        // DEBUG: Log the actual response to see what fields are coming from backend
        console.log('Special Offers - Backend response:', data);
        console.log('Special Offers - First product:', data[0]);
        console.log('Special Offers - Fields in first product:', Object.keys(data[0] || {}));
        
        // Check if special_offers field exists in the response
        if (data.length > 0) {
          const hasSpecialOffersField = 'special_offers' in data[0];
          console.log('Has special_offers field:', hasSpecialOffersField);
          
          if (!hasSpecialOffersField) {
            console.warn('special_offers field is missing from API response!');
            // TEMPORARY FIX: Since backend doesn't return special_offers field,
            // we'll show first 5 products as special offers for now
            
            const specialProducts = data.slice(0, 5);
            
            const transformedProducts: TransformedSpecialProduct[] = specialProducts.map((product: BackendProduct) => ({
              id: product.id,
              productName: product.product_name,
              new_price: product.product_price,
              old_price: calculateOldPrice(product.product_price),
              description: product.product_description,
              image: product.product_image ? `http://139.59.65.41/${product.product_image}` : Cashew,
              features: product.product_features,
              availability: product.availability_status
            }));
            
            setProducts(transformedProducts);
            return;
          }
        }
        
        // Filter products that have special_offers: true (original logic)
        const specialProducts = data.filter((product: BackendProduct) => {
          console.log(`Product: ${product.product_name}, special_offers: ${product.special_offers}`);
          return product.special_offers === true;
        });
        
        console.log('Filtered special offer products:', specialProducts);
        
        // Transform the data to match your component structure
        const transformedProducts: TransformedSpecialProduct[] = specialProducts.map((product: BackendProduct) => ({
          id: product.id,
          productName: product.product_name,
          new_price: product.product_price,
          old_price: calculateOldPrice(product.product_price),
          description: product.product_description,
          // Use correct server path for product images
          image: product.product_image ? `http://139.59.65.41/${product.product_image}` : Cashew,
          features: product.product_features,
          availability: product.availability_status
        }));
        
        setProducts(transformedProducts);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        console.error('Error fetching special offer products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialOfferProducts();
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
      <div className="app__specialOffer--main-div">
        <TitleL title='Special Offers'/>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading special offers...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="app__specialOffer--main-div">
        <TitleL title='Special Offers'/>
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          <p>Error loading special offers: {error}</p>
        </div>
      </div>
    );
  }

  // No products state
  if (products.length === 0) {
    return (
      <div className="app__specialOffer--main-div">
        <TitleL title='Special Offers'/>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No special offers available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app__specialOffer--main-div">
      <TitleL title='Special Offers'/>
      
      {products.length === 1 ? (
        // Single product - render without slider
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <div className="app__specialOffer--item-div" style={{ maxWidth: '400px', width: '100%' }}>
            <div className='item-inside'>
              <p className='offer-title'>{products[0].productName}</p>
              <div className='offer-details'>
                <div className='offer-prices'>
                  <p className='offer-oldprice'><del>Rs {products[0].old_price}</del></p>
                  <p className='offer-newprice'>Rs {products[0].new_price}</p>
                  <OrderNow title="ORDER NOW"/>
                </div>
                <div className="app__specialOffer-img">
                  <Image 
                    className="specialOffer-image" 
                    src={products[0].image} 
                    alt={`${products[0].productName} special offer`}
                    width={160}
                    height={160}
                    unoptimized
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Multiple products - render with slider
        <>
          <button className='prev-button' onClick={() => sliderRef.current?.slickPrev()}>
            <IoIosArrowBack color="#FFCF2C" fontWeight={600} size={40}/>
          </button>
          
          {/* Key prop added to force re-render when products change */}
          <Slider key={products.length} ref={sliderRef} {...settings}>
            {products.map((product: TransformedSpecialProduct, index: number) => (
              <div className="app__specialOffer--item-div" key={product.id || index}>
                <div className='item-inside'>
                  <p className='offer-title'>{product.productName}</p>
                  <div className='offer-details'>
                    <div className='offer-prices'>
                      <p className='offer-oldprice'><del>Rs {product.old_price}</del></p>
                      <p className='offer-newprice'>Rs {product.new_price}</p>
                      <OrderNow title="ORDER NOW"/>
                    </div>
                    <div className="app__specialOffer-img">
                      <Image 
                        className="specialOffer-image" 
                        src={product.image} 
                        alt={`${product.productName} special offer`}
                        width={160} // Reduced size to match original
                        height={160}
                        unoptimized
                        style={{ objectFit: 'cover' }} // Ensure proper image scaling
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          
          <button className='next-button' onClick={() => sliderRef.current?.slickNext()}>
            <IoIosArrowForward color="#FFCF2C" fontWeight={600} size={40}/>
          </button>
        </>
      )}
    </div>
  );
};

export default SpecialOffers;