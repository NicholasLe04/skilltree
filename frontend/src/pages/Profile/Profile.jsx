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
            <div className="profileBody">
                <div className="profileHero">
                    <img src={pfpURL} className="profilePfp"></img>
                    <div className="profileHeader">
                        <div className="profileName">{name}</div>
                        <div className="profileDesc">{desc}</div>
                    </div>
                </div>
                <div className="profileTreeText">Trees</div>
                <div className="profileTrees">
                    {treeCards.map((e) => <TreeCard title={e.title} author={e.author} upvotes={e.upvotes} downvotes={e.downvotes} treeImageURL={e.treeImageURL} />)}
                </div>
            </div >
        </>
    )
}

export default Profile;