"use client";
import React, { useState } from "react";
import "./ReviewPage.css";

interface AppState {
  rating: number | null;
  comment: string;
}

const Review: React.FC = () => {
  const [state, setState] = useState<AppState>({
    rating: null,
    comment: "",
  });

  const handleRatingSelect = (value: number) => {
    setState((prevState) => ({ ...prevState, rating: value }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState((prevState) => ({ ...prevState, comment: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Rating:", state.rating, "Comment:", state.comment);
    // Add your form submission logic here
  };

  return (
    <div className="main">
      <div className="feedback-container">
        <h1>How do you feel about this product?</h1>
        <p>
          Your input is valuable in helping us better understand your needs and
          tailor our services accordingly
        </p>

        {/* Rating emojis */}
        <div className="rating-container">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              className={`emoji-btn ${
                state.rating === value ? "selected" : ""
              }`}
              onClick={() => handleRatingSelect(value)}
            >
              {value === 1 && "😠"}
              {value === 2 && "😞"}
              {value === 3 && "😐"}
              {value === 4 && "😊"}
              {value === 5 && "😄"}
            </button>
          ))}
        </div>

        {/* Comment textarea */}
        <textarea
          className="comment-box"
          placeholder="Add a comment..."
          value={state.comment}
          onChange={handleCommentChange}
        />

        {/* Submit button */}
        <button className="submit-btn" onClick={handleSubmit}>
          Submit now
        </button>
      </div>
    </div>
  );
};

export default Review;
