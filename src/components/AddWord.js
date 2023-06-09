import {useState} from "react";
import axios from "axios";

const AddWord = ({reload, setReload}) => {
    const [showAddWord, setShowAddWord] = useState(false);
    const [word, setWord] = useState("");
    const [meaning, setMeaning] = useState("");
    const [error, setError] = useState("");

    const showAddWordHandler = () => {
        setShowAddWord(true);
    };
    const hideAddWordHandler = () => {
        setShowAddWord(false);
    };

    const addWordHandler = async () => {
        if (showAddWord) {
            try {
                const response = await axios.post("http://localhost:5000/add-word", {word, meaning});
                setWord("");
                setMeaning("");
                setError("");
                setShowAddWord(false);
                setReload((preVal)=>preVal+1);
            } catch (err) {
                setError(err.response.data.message);
            }
        } else {
            showAddWordHandler();
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-2 mt-[100px]">
            <span className="text-red-600">{error}</span>
            <div style={{height: showAddWord ? "100px" : "0"}}
                 className="overflow-hidden flex transition-all flex-col justify-center items-center gap-2">
                <input value={word} onChange={(e) => {
                    setWord(e.target.value);
                }} className="w-[400px] p-2 outline-0 text-black" type="text" placeholder="word"/>
                <input value={meaning} onChange={(e) => {
                    setMeaning(e.target.value);
                }} className="w-[400px] p-2 outline-0 text-black" type="text" placeholder="meaaning"/>
            </div>
            <button onClick={addWordHandler}
                    className="bg-green-600 hover:bg-green-500 rounded-md transitiion-all w-[400px] p-2">Add
            </button>
            <button onClick={hideAddWordHandler} style={{display: showAddWord ? "block" : "none"}}><i
                className="fa fa-times border py-1 px-2  text-white"></i></button>
        </div>
    );
};

export default AddWord;