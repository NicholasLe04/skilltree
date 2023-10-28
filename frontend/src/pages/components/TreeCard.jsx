import React from "react";
import { useNavigate } from "react-router-dom";
import "./TreeCard.css";

function TreeCard({ id, title, author, upvotes, downvotes, treeImageURL }) {
    const navigate = useNavigate()
    return (
        <div className="tree-card-root" onClick={() => {
            navigate(`/tree/${id}`)
        }}>
            <div className="tree-card-desc">
                <div className="tree-card-title">{title}</div>
                <div className="tree-card-author">by: {author}</div>
                <div className="tree-card-rating">
                    <div className="tree-card-upvotes">
                        <div>upvotes</div>
                        <div>{upvotes}</div>
                    </div>
                    <div className="tree-card-downvotes">
                        <div>downvotes</div>
                        <div>{downvotes}</div>
                    </div>
                </div>
            </div>
            <img src={treeImageURL}></img>
        </div>
    )
}

export default TreeCard;