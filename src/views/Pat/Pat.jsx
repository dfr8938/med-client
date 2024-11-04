import styles from "./Pat.module.css";
import SearchInput from "../../components/SearchInput.jsx";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {List} from "../../components/List.jsx";
import {FormModule} from "../../components/FormModule.jsx";

const Pat = () => {

    const [questions, setQuestions] = useState([]);

    const [valueTitle, setValueTitle] = useState("");
    const [valueDescription, setValueDescription] = useState("");

    const [clickClose, setClickClose] = useState(false);

    const getAllQuestion = async () => {
        const { data } = await axios.get(`http://localhost:3001/api/pat`);
        setQuestions(data);
    };

    useEffect(() => {
        getAllQuestion();
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const ref = useRef("");

    const searchHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm !== "") {
            const newQuestion = questions.filter((question) => {
                return Object.values(question)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            });
            setSearchResult(newQuestion);
        } else {
            setSearchResult(questions);
        }
    };

    const getSearchTerm = () => {
        searchHandler(ref.current.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <SearchInput inputEl={ref} searchTerm={searchTerm}
                             getSearchTerm={getSearchTerm}
                             questions={searchTerm.length < 1 ? questions : searchResult}/>
                <i className="fa-solid fa-plus plus" onClick={() => setClickClose(!clickClose)}></i>
            </div>
            <List
                setQuestions={setQuestions}
                allQuestionsArray={questions}
                setClickClose={setClickClose}
                questions={searchTerm.length < 1 ? questions : searchResult}/>
            <FormModule
                questionsArray={questions}
                setAllQuestionsArray={setQuestions}
                clickClose={clickClose}
                setClickClose={setClickClose}
                valueTitle={valueTitle}
                valueDescription={valueDescription}
                setValueTitle={setValueTitle}
                setValueDescription={setValueDescription}
            />
        </div>
    );
};

export {Pat};