import React, { useEffect } from 'react';
import { useState } from 'react';
import './Hotbar.css';
import TreeCard from '../components/TreeCard';

function Hotbar({ category, refz }) {

    const [treeCard, setTreeCard] = useState([])
    useEffect(() => {
        axios.get(`ttp://127.0.0.1:6969/tree/skill/${category.toLowerCase()}`)
            .then((res) => {
                setTreeCard(res.data)
            })
            .catch((err) => {
                setTreeCard([])
            })
    }, [])

    return (
        <div className="hotbar" ref={refz}>
            <h4 style={{ marginLeft: '60px' }}>{category}</h4>
            <div className='treecube'>
                {treeCard.map((e) => <TreeCard title={e.title} author={e.author} upvotes={e.upvotes} downvotes={e.downvotes} treeImageURL={e.treeImageURL} />)}
            </div>
        </div>
    );
}

export default Hotbar;
