import React from "react";
import "./CommentsList.css";
import { CiStar } from "react-icons/ci";

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
};

const CommentsList = ({ comments }) => {
    if (!comments || comments.length === 0) {
        return <div className="comments-empty">No comments yet.</div>;
    }
    return (
        <div className="comments-list">
            <h3 className="comments-title">Customer Reviews</h3>
            {comments.map((comment, idx) => (
                <div className="comment-card" key={idx}>
                    <div className="comment-header">
                        <span className="comment-reviewer">{comment.reviewerName}</span>
                        <span className="comment-date">{formatDate(comment.date)}</span>
                        <span className="comment-rating">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <CiStar key={i} className={i < comment.rating ? "star filled" : "star"} />
                            ))}
                        </span>
                    </div>
                    <div className="comment-body">{comment.comment}</div>
                </div>
            ))}
        </div>
    );
};

export default CommentsList; 