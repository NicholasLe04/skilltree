import Navbar from "../components/Navbar"
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import TreeCard from "../components/TreeCard";
import axios from "axios";
import "./Search.css"
import { useEffect } from "react";

function Search() {
    const [data, setData] = useState([]);
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get("q");

    useEffect(() => {
        axios.get(`http://127.0.0.1:6969/tree/skill/${queryParam}`)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                setData([])
            })
    }, [queryParam])

    return (
        <>
            <Navbar />
            <div className="search-trees">
                {data.map((e) => <TreeCard id={e.skilltree_id} title={e.skill} author={e.username} upvotes={e.upvotes} downvotes={e.downvotes} treeImageURL={e.treeImageURL} />)}
            </div>
        </>
    )
}

export default Search