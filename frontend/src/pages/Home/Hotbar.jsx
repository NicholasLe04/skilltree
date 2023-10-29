import React, { createRef, useEffect, useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Hotbar.css';
import TreeCard from '../components/TreeCard';

function Hotbar({ category, refz }) {

    console.log(category)

    const refe = createRef();

    const [treeCard, setTreeCard] = useState([])
    useEffect(() => {
        axios.get(`http://127.0.0.1:6969/tree/tag/${category.toLowerCase()}`)
            .then((res) => {
                setTreeCard(res.data)
            })
            .catch((err) => {
                setTreeCard([])
            })
    }, [])

    const zCard = [
        {
            title: "z",
            author: "goombus",
            upvotes: "6",
            downvotes: "9",
            treeImageURL: "",
        },
        {
            title: "z",
            author: "goombus",
            upvotes: "6",
            downvotes: "9",
            treeImageURL: "",
        },
        {
            title: "z",
            author: "goombus",
            upvotes: "6",
            downvotes: "9",
            treeImageURL: "",
        },
        {
            title: "z",
            author: "goombus",
            upvotes: "6",
            downvotes: "9",
            treeImageURL: "",
        },
        {
            title: "z",
            author: "goombus",
            upvotes: "6",
            downvotes: "9",
            treeImageURL: "",
        },
        {
            title: "z",
            author: "goombus",
            upvotes: "6",
            downvotes: "9",
            treeImageURL: "",
        },
        {
            title: "z",
            author: "goombus",
            upvotes: "6",
            downvotes: "9",
            treeImageURL: "",
        },
    ]


    const scroll = (scrollOffset) => {
        refe.current.scrollLeft += scrollOffset;
    };

    return (
        <div className="hotbar" ref={refz}>
            <h4 className="header" style={{ marginLeft: '60px' }}>{category}</h4>
            <div className='arrowwrap'>
                <button className="leftb" onClick={() => scroll(255)}>{">"}</button>
                <div className='treecube' ref={refe}>
                    {treeCard.map((e) => <TreeCard title={e.title} author={e.author} upvotes={e.upvotes} downvotes={e.downvotes} treeImageURL={e.treeImageURL} />)}
                </div>
                <button className="rightb" onClick={() => scroll(-255)}>{"<"}</button>
            </div>
        </div>
    );
}

export default Hotbar;
