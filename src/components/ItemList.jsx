import styles from "./ItemList.module.css";
import axios from "axios";
import { useState } from "react";
import { Edit } from "./Edit.jsx";

const ItemList = ({ question, index, questions, setQuestions }) => {
  const [upForm, setUpForm] = useState(false);
  const [warning, setWarning] = useState(false);

  const deleteQuestion = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/api/pat/${id}`
      );
      const anatQuestions = questions.filter((item) => item.id !== id);
      setQuestions([...anatQuestions]);
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <>
      <li className={styles.item}>
        <div className={styles.header}>
          <i
            className="fa-solid fa-pen pen"
            onClick={() => setUpForm(!upForm)}
          ></i>
          <i
            className="fa-solid fa-xmark xmark"
            onClick={() => setWarning(!warning)}
          ></i>
        </div>
        {!upForm && (
          <>
            <div className={styles.title}>
              {index + 1}. {question.title}
            </div>
            <div className={styles.description}>{question.description}</div>
          </>
        )}
        {upForm && (
          <Edit
            questions={questions}
            question={question}
            upForm={upForm}
            setQuestions={setQuestions}
            setUpForm={setUpForm}
          />
        )}
      </li>
      {warning && (
        <div className={styles.warning} onClick={() => setWarning(!warning)}>
          <div className={styles.box}>
            <div className={styles.question}>
              Вы хотите правда удалить элемент?
            </div>
            <div className={styles.answer}>
              <button onClick={() => deleteQuestion(question.id)}>Да</button>
              <button onClick={() => setWarning(!warning)}>Нет</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { ItemList };
