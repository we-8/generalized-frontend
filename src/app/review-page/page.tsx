"use client";
import React, { useState } from "react";
import "./ReviewPage.css";

interface AppState {
  rating: number | null;
  header: string;
  comment: string;
}

const Review: React.FC = () => {
  const [state, setState] = useState<AppState>({
    rating: null,
    header: "",
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingSelect = (value: number) => {
    setState((prevState) => ({ ...prevState, rating: value }));
  };

  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, header: e.target.value }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState((prevState) => ({ ...prevState, comment: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!state.rating) {
      alert("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      // Dummy backend endpoint - replace with your actual endpoint
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: state.rating,
          header: state.header,
          comment: state.comment,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        console.log("Review submitted successfully!");
        console.log("Rating:", state.rating, "Header:", state.header, "Comment:", state.comment);
        
        // Reset form after successful submission
        setState({
          rating: null,
          header: "",
          comment: "",
        });
        
        alert("Thank you for your review!");
      } else {
        throw new Error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
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
              placeholder="Add a review title..."
              value={state.header}
              onChange={handleHeaderChange}
              maxLength={100}
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
      </div>
    </div>
  );
};

export default Review;