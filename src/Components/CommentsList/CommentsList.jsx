import React, { useContext, useState } from "react";
import "./CommentsList.css";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { ProductContext } from "../../Context/ProductContext";

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
};

const CommentsList = ({ comments }) => {
    const { selectedProduct, addProductReview } = useContext(ProductContext);
    const [review, setReview] = useState({
        reviewerName: "",
        comment: "",
        rating: 0,
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleStarClick = (star) => {
        setReview((prev) => ({ ...prev, rating: star }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await addProductReview({
                productId: selectedProduct.id,
                newReview: {
                    ...review,
                    date: new Date().toISOString(),
                },
            });
            setReview({ reviewerName: "", comment: "", rating: 0 });
        } catch (err) {
            setError("Failed to add review.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="comments-list">
            <form className="add-comment-form" onSubmit={handleSubmit}>
                <h4 className="add-comment-title">Add a Review</h4>
                <input
                    className="add-comment-input"
                    type="text"
                    placeholder="Your name"
                    value={review.reviewerName}
                    onChange={e => setReview({ ...review, reviewerName: e.target.value })}
                    required
                />
                <textarea
                    className="add-comment-textarea"
                    placeholder="Your comment"
                    value={review.comment}
                    onChange={e => setReview({ ...review, comment: e.target.value })}
                    required
                />
                <div className="add-comment-rating">
                    {[1,2,3,4,5].map((star) => (
                        star <= review.rating ?
                            <FaStar
                                key={star}
                                className="comment-star filled clickable"
                                onClick={() => handleStarClick(star)}
                                size={28}
                            />
                        :
                            <CiStar
                                key={star}
                                className="comment-star clickable"
                                onClick={() => handleStarClick(star)}
                                size={28}
                            />
                    ))}
                    <span className="add-comment-rating-label">{review.rating} / 5</span>
                </div>
                <button className="add-comment-btn" type="submit" disabled={submitting}>
                    {submitting ? "Submitting..." : "Add Review"}
                </button>
                {error && <div className="add-comment-error">{error}</div>}
            </form>
            <h3 className="comments-title">Customer Reviews</h3>
            {comments && comments.length > 0 ? (
                comments.map((comment, idx) => (
                    <div className="comment-card" key={idx}>
                        <div className="comment-header">
                            <span className="comment-reviewer">{comment.reviewerName}</span>
                            <span className="comment-date">{formatDate(comment.date)}</span>
                            <span className="comment-rating">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    i < comment.rating ?
                                        <FaStar key={i} className="comment-star filled" size={28} />
                                    :
                                        <CiStar key={i} className="comment-star" size={28} />
                                ))}
                            </span>
                        </div>
                        <div className="comment-body">{comment.comment}</div>
                    </div>
                ))
            ) : (
                <div className="comments-empty">No comments yet.</div>
            )}
        </div>
    );
};

export default CommentsList; 