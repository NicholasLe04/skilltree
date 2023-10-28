import React from "react";
import "./TreeCard.css";

function TreeCard({ title, author, upvotes, downvotes, treeImageURL }) {
    return (
        <div className="treeCardRoot">
            <div className="treeCardDesc">
                <div className="treeCardTitle">{title}</div>
                <div className="treeCardAuthor">by: {author}</div>
                <div className="treeCardRating">
                    <div className="treeCardUpvotes">
                        <div>upvotes</div>
                        <div>{upvotes}</div>
                    </div>
                    <div className="treeCardDownvotes">
                        <div>downvotes</div>
                        <div>{downvotes}</div>
                    </div>
                </div>
            </div>
            <img src={treeImageURL}></img>
        </div>)
}

export default TreeCard;