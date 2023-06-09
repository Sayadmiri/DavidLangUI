import {useEffect, useState} from "react";
import axios from "axios";
import Words from "./components/Words";
import AddWord from "./components/AddWord";
import Filter from "./components/Filter";

const App = () => {
    const [reload, setReload] = useState(1);
    const [words, setWords] = useState([]);
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        const getWords = async () => {
            try {
                let fetchedWords = await axios.get("http://localhost:5000/");
                fetchedWords.data = fetchedWords.data.filter(w => w.word.includes(filter) || w.meaning.includes(filter));
                setWords(fetchedWords.data);
            } catch (err) {
                console.log("error " + err);
            }
        };
        getWords();
    }, [reload, filter]);


    return (
        <div className="text-white">
            <AddWord reload={reload} setReload={setReload}/>
            <Filter filter={filter} setFilter={setFilter}/>
            <Words words={words} reload={reload} setReload={setReload}/>
        </div>
    );
};
export default App;
