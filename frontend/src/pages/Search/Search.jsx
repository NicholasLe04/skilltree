import Navbar from "../components/Navbar"
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import TreeCard from "../components/TreeCard";
import axios from "axios";
import "./Search.css"
import { useEffect } from "react";

function searchData(queryParam) {
    let tempData1
    let tempData2

    axios.get(`http://127.0.0.1:6969/tree/skill/${queryParam}`)
        .then(res => {
            tempData1 = res.data
        })
        .catch(err => {
            tempData1 = []
        })
    axios.get(`http://127.0.0.1:6969/tree/tag/${queryParam}`)
        .then(res => {
            tempData2 = res.data
        })
        .catch(err => {
            tempData2 = []
        })

    const res = tempData1.concat(tempData2)
    console.log(res)
    return res
}

function Search() {
    const [data, setData] = useState([]);
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get("q");

    useEffect(() => {
        setData(searchData(queryParam))
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