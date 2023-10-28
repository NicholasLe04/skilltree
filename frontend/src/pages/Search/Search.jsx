import Navbar from "../components/Navbar"
import { useSearchParams } from "react-router-dom";
import TreeCard from "../components/TreeCard";
import "./Search.css"

function Search() {
    // const [query, setQuery] = useState()
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get("q");
    const results = [ // query here
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
            <div className="search-trees">
                {results.map((e) => <TreeCard title={e.title} author={e.author} upvotes={e.upvotes} downvotes={e.downvotes} treeImageURL={e.treeImageURL} />)}
            </div>
        </>
    )
}

export default Search