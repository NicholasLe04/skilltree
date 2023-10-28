import React from "react";
import "./TreeCard.css";

function TreeCard({ title, author, upvotes, downvotes, treeImageURL }) {
    return (
        <div className="tree-card-root">
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