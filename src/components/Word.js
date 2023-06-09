import axios from "axios";
import {useState} from "react";

const Word = ({word, reload, setReload}) => {
    const [editedWord, setEditedWord] = useState(word.word);
    const [editedMeaning, setEditedMeaning] = useState(word.meaning);
    const [showEdit, setShowEdit] = useState(false);
    const [error, setError] = useState("");
    const deleteHandler = async () => {
        await axios.post("http://localhost:5000/delete-word", {id: word.id});
        setReload((preVal) => preVal + 1);
    };

    const editHandler = async () => {
        if (editedWord !== word.word || editedMeaning !== word.meaning) {
            try {
                await axios.post("http://localhost:5000/edit-word", {
                    id: word.id,
                    word: editedWord,
                    meaning: editedMeaning
                });
                setShowEdit(false);
                setReload((preVal) => preVal + 1);
            } catch (err) {
                setError(err.response.data.message)
            }
        }else{
            setShowEdit(false)
        }
    };

    return (
        <li>
            <div className="border w-[400px] p-4 flex justify-between hover:bg-[#010c42] cursor-pointer">
                <div className="flex gap-4 text-[1.5rem]">
                    <button onClick={deleteHandler}><i className="fa fa-trash text-red-500"></i></button>
                    <button onClick={() => setShowEdit((preVal) => !preVal)}><i
                        className="fa fa-pencil text-yellow-300"></i></button>
                </div>
                <span className="text-[#ebe134]">
                    {word.meaning}
                    </span>
                <span className="text-[1.5rem]">
                    {word.word}
                    </span>
            </div>
            <div style={{height: showEdit ? "230px" : "0", padding: !showEdit && "0", border: !showEdit && "0"}}
                 className="transition-all overflow-hidden border w-[400px] p-4 flex flex-col">
                <span className="text-red-600 text-center my-2">{error}</span>
                <input type="text" onChange={(e) => setEditedWord(e.target.value)} value={editedWord}
                       className="mb-2 border outline-0 p-2 text-black"/>
                <input type="text" onChange={(e) => setEditedMeaning(e.target.value)} value={editedMeaning}
                       className="border outline-0 p-2 text-black"/>
                <div className="flex justify-end mt-4">
                    <button onClick={editHandler}><i
                        className="fa fa-check text-green-500 border border-green-500 hover:border-green-800 px-4 py-2"></i>
                    </button>
                    <button onClick={() => setShowEdit(false)}><i
                        className="fa fa-times text-red-500 border border-red-500 hover:border-red-800 px-4 py-2"></i>
                    </button>
                </div>
            </div>
        </li>
    );
};

export default Word;