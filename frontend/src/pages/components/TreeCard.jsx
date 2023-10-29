import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TreeCard.css";

function TreeCard({ id, title, author, upvotes, downvotes, treeImageURL }) {
    const navigate = useNavigate()
    const [upvotesLocal, setUpvotes] = useState(upvotes)
    const [downvotesLocal, setDownvotes] = useState(downvotes)

    return (
        <div className="tree-card-root grow" onClick={() => {
            navigate(`/tree/${id}`)
        }}>
            <div className="tree-card-desc">
                <div className="tree-card-title">{title}</div>
                <div className="tree-card-author">by: {author}</div>
                <div className="tree-card-rating">
                    <div className="tree-card-upvotes">
                        <div div onClick={(e) => {
                            e.stopPropagation()
                            axios.put(`/tree/upvote/${id}`)
                            setUpvotes(upvotesLocal + 1)
                        }}>upvotes</div>
                        <div>{upvotesLocal}</div>
                    </div>
                    <div className="tree-card-downvotes">
                        <div onClick={(e) => {
                            e.stopPropagation()
                            axios.put(`/tree/downvote/${id}`)
                            setDownvotes(downvotesLocal + 1)

                        }}>downvotes</div>
                        <div>{downvotesLocal}</div>
                    </div>
                </div>
            </div>
            <img src={treeImageURL}></img>
        </div>
    )
}

export default TreeCard;