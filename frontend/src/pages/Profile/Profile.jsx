import Navbar from "../components/Navbar";
import React from "react";
import TreeCard from "../components/TreeCard";
import "./Profile.css"

function Profile() {

    // get profile based on username
    const name = "Oscar Crespo";
    const desc = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique vel eius qui fuga nesciunt esse consequatur labore in cumque doloribus. Eos architecto at eius voluptas aspernatur, consequuntur soluta ad ipsam.";
    const pfpURL = "https://i.ytimg.com/vi/TC0YgcDbHHM/maxresdefault.jpg";
    const treeCards = [
        {
            title: "bruh",
            author: "bruh",
            upvotes: 100,
            downvotes: 100,
            treeImageURL: "",
        },
        {
            title: "bruh",
            author: "bruh",
            upvotes: 100,
            downvotes: 100,
            treeImageURL: "",
        },
        {
            title: "bruh",
            author: "bruh",
            upvotes: 100,
            downvotes: 100,
            treeImageURL: "",
        },
        {
            title: "bruh",
            author: "bruh",
            upvotes: 100,
            downvotes: 100,
            treeImageURL: "",
        },
        {
            title: "bruh",
            author: "bruh",
            upvotes: 100,
            downvotes: 100,
            treeImageURL: "",
        },
    ]

    return (
        <>
            <Navbar />
            <div className="profile-body">
                <div className="profile-hero">
                    <img src={pfpURL} className="profile-pfp"></img>
                    <div className="profile-header">
                        <div className="profile-name">{name}</div>
                        <div className="profile-desc">{desc}</div>
                    </div>
                </div>
                <div className="profile-tree-text">Trees</div>
                <div className="profile-trees">
                    {treeCards.map((e) => <TreeCard title={e.title} author={e.author} upvotes={e.upvotes} downvotes={e.downvotes} treeImageURL={e.treeImageURL} />)}
                </div>
            </div >
        </>
    )
}

export default Profile;