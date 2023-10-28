import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import TreeCard from "../components/TreeCard";
import "./Profile.css"
import axios from "axios";
import DefaultPfp from "../../assets/images/default-pfp.png"
import { useParams } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState({})
    const [trees, setTrees] = useState([])
    const { username } = useParams();

    useEffect(() => {
        axios.get(`http://127.0.0.1:6969/user/${username}`)
            .then(res => {
                setUser(res.data)
                console.log(res.data)
                axios.get(`http://127.0.0.1:6969/tree/user/${username}`)
                    .then(res => {
                        setTrees(res.data)
                    })
                    .catch(err => {
                        setTrees([])
                    })
            })
            .catch(err => {
                setUser({
                    username: "User Not Found :(",
                    verified: false,
                    description: ""
                })
                setTrees([])
            })
    }, [username])

    const verified = user.verified
    const name = user.username
    const desc = user.description

    const pfpURL = DefaultPfp;
  
    return (
        <>
            <Navbar />
            <div className="profile-body">
                <div className="profile-hero">
                    <img src={pfpURL} className="profile-pfp"></img>
                    <div className="profile-header">
                        <div className="profile-name">{name}{verified ? (<div className="profile-verif"><img src="https://static.vecteezy.com/system/resources/thumbnails/011/858/556/small/green-check-mark-icon-with-circle-tick-box-check-list-circle-frame-checkbox-symbol-sign-png.png" width={45} height={45} /></div>) : null}</div>
                        <div className="profile-desc">{desc}</div>
                    </div>
                </div>
                <div className="profile-tree-text">Trees</div>
                <div className="profile-trees">
                    {trees.map((e) => <TreeCard id={e.skilltree_id} title={e.skill} author={e.username} upvotes={e.upvotes} downvotes={e.downvotes} treeImageURL={e.treeImageURL} />)}
                </div>
            </div >
        </>
    )
}

export default Profile;