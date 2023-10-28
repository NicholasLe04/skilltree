import Navbar from "../components/Navbar";
import React, { useEffect } from "react";
import TreeCard from "../components/TreeCard";
import "./Profile.css"
import DefaultPfp from "../../assets/images/default-pfp.png"
import { useParams } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState({})
    const { username } = useParams();

    useEffect(() => {
        axios.get(`http://127.0.0.1:6969/user/${username}`)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                setData({
                    username: "User Not Found :(",
                    verified: false,
                    description: ""
                })
            })
    }, [username])

    const verified = true;
    const name = "Oscar Crespo";
    const desc = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique vel eius qui fuga nesciunt esse consequatur labore in cumque doloribus. Eos architecto at eius voluptas aspernatur, consequuntur soluta ad ipsam.";
    const pfpURL = DefaultPfp;
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
                        <div className="profile-name">{name}{verified ? (<div className="profile-verif"><img src="https://static.vecteezy.com/system/resources/thumbnails/011/858/556/small/green-check-mark-icon-with-circle-tick-box-check-list-circle-frame-checkbox-symbol-sign-png.png" width={45} height={35} /></div>) : null}</div>
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