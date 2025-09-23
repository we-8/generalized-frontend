"use client";
import React, { useState, useEffect } from "react";
import "./ReviewPage.css";

interface AppState {
  rating: number | null;
  header: string;
  comment: string;
}

interface Product {
  product_id: string;
  product_name: string;
  product_description: string;
  product_features: string;
  product_price: string;
  availability_status: string;
  product_image: string;
  category: string;
  ratings: Array<{ rating_count: number }>;
}

const Review: React.FC = () => {
  const [state, setState] = useState<AppState>({
    rating: null,
    header: "",
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // Check for authentication token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token') || 
                 localStorage.getItem('authToken') || 
                 localStorage.getItem('access_token') || 
                 sessionStorage.getItem('token') ||
                 sessionStorage.getItem('authToken') ||
                 sessionStorage.getItem('access_token');
    
    console.log('Token found:', token); // Debug log
    console.log('All localStorage keys:', Object.keys(localStorage)); // Debug log
    
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      console.log('User is authenticated'); // Debug log
    } else {
      setIsAuthenticated(false);
      console.log('No token found, user not authenticated'); // Debug log
    }
    
    setIsCheckingAuth(false);
  }, []);

  const getAuthHeaders = () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (authToken) {
      // Use Token format for Django Token Authentication
      headers.Authorization = `Token ${authToken}`;
    }

    return headers;
  };

  const handleRatingSelect = (value: number) => {
    setState((prevState) => ({ ...prevState, rating: value }));
  };

  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, header: e.target.value }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState((prevState) => ({ ...prevState, comment: e.target.value }));
  };

  const fetchProducts = async (): Promise<Product[]> => {
    try {
      const response = await fetch("http://139.59.65.41/v1/products/", {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const productsData = await response.json();
          return productsData;
        } else {
          throw new Error("Server returned non-JSON response");
        }
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('authToken');
        setIsAuthenticated(false);
        throw new Error("Session expired. Please log in again.");
      } else {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const findProductByTitle = (products: Product[], title: string): Product | null => {
    return products.find(product => 
      product.product_name && title && 
      product.product_name.toLowerCase().trim() === title.toLowerCase().trim()
    ) || null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !authToken) {
      alert("Please log in to submit a review");
      return;
    }

    if (!state.rating) {
      alert("Please select a rating");
      return;
    }

    if (!state.header.trim()) {
      alert("Please enter a product title");
      return;
    }

    setIsSubmitting(true);

    try {
      const productsData = await fetchProducts();
      setProducts(productsData);

      const matchedProduct = findProductByTitle(productsData, state.header.trim());

      if (!matchedProduct) {
        alert(`Product "${state.header}" not found. Please check the product name.`);
        setIsSubmitting(false);
        return;
      }

      // Prepare payload - no email field, backend gets user from token
      const payload = {
        product: matchedProduct.product_id,
        rating: state.rating,
        title: state.header,
        comment: state.comment,
      };

      const response = await fetch("http://139.59.65.41/v1/ratings/", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          console.log("Review submitted successfully!", result);
        } else {
          console.log("Review submitted successfully!");
        }
        
        setState({
          rating: null,
          header: "",
          comment: "",
        });
        
        alert("Thank you for your review!");
      } else if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('authToken');
        setIsAuthenticated(false);
        alert("Session expired. Please log in again.");
      } else {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      if (error instanceof Error) {
        alert(`Failed to submit review: ${error.message}`);
      } else {
        alert("Failed to submit review. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((value) => (
      <button
        key={value}
        className={`star-btn ${state.rating && state.rating >= value ? "selected" : ""}`}
        onClick={() => handleRatingSelect(value)}
        type="button"
      >
        ★
      </button>
    ));
  };

  return (
    <div className="main">
      <div className="feedback-container">
        {isCheckingAuth ? (
          <div>
            <h1>Loading...</h1>
            <p>Checking authentication...</p>
          </div>
        ) : !isAuthenticated ? (
          <div className="auth-required">
            <h1>Authentication Required</h1>
            <p>Please log in to submit a review</p>
            <button 
              className="submit-btn" 
              onClick={() => {
                window.location.href = '/sign-in'; // Update this to your actual login route
              }}
            >
              Go to Login
            </button>
          </div>
        ) : (
          <>
            <h1>How do you feel about this product?</h1>
            <p>
              Your input is valuable in helping us better understand your needs and
              tailor our services accordingly
            </p>

            <form onSubmit={handleSubmit}>
              {/* Star Rating */}
              <div className="rating-container">
                <div className="stars-wrapper">
                  {renderStars()}
                </div>
              </div>

              {/* Review Header Input */}
              <div className="header-container">
                <input
                  type="text"
                  className="header-input"
                  placeholder="Enter product name..."
                  value={state.header}
                  onChange={handleHeaderChange}
                  maxLength={100}
                  required
                />
              </div>

              {/* Comment textarea */}
              <textarea
                className="comment-box"
                placeholder="Add a comment..."
                value={state.comment}
                onChange={handleCommentChange}
                maxLength={500}
              />

              {/* Submit button */}
              <button 
                className="submit-btn" 
                type="submit"
                disabled={isSubmitting || !state.rating}
              >
                {isSubmitting ? "Submitting..." : "Submit now"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Review;