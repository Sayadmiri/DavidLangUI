import {useEffect, useState} from "react";
import axios from "axios";
import Word from "./Word";

const Words = ({words,setReload}) => {



    return (
        <ul className="px-[50px] py-8 flex flex-col justify-center items-center gap-[20px]">
            {words.map(word => (
                <Word key={word.id} word={word} setReload={setReload} />
            ))}
        </ul>
    );
};

export default Words;