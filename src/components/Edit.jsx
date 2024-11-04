import axios from "axios";
import { useState } from "react";

import styles from "./Edit.module.css";

const Edit = ({ questions, question, upForm, setUpForm, setQuestions }) => {
  const { id, title, description } = question;

  const [valueTitleUpdate, setValueTitleUpdate] = useState(`${title}`);
  const [valueDescriptionUpdate, setValueDescriptionUpdate] = useState(
    `${description}`
  );

  const updateQuestion = async (title, description) => {
    try {
      const { data } = await axios.put(`http://localhost:3001/api/pat/${id}`, {
        title,
        description,
      });

      const newQuestion = {
        title: valueTitleUpdate,
        description: valueDescriptionUpdate,
      };
      const newQuestions = questions.filter((question) => question.id !== id);

      setQuestions([{ ...newQuestion }, ...newQuestions]);
      setUpForm(!upForm);
    } catch (e) {
      console.error(e.message);
    }
  };

  const onSubmitFormUpdateQuestion = async (e) => {
    e.preventDefault();
    return updateQuestion(valueTitleUpdate, valueDescriptionUpdate);
  };

  return (
    <>
      {upForm ? (
        <form className={styles.form} onSubmit={onSubmitFormUpdateQuestion}>
          <h2>Изменить вопрос</h2>
          <input
            value={valueTitleUpdate}
            onChange={(e) => setValueTitleUpdate(e.target.value)}
            type="text"
            placeholder="title"
          />
          <textarea
            value={valueDescriptionUpdate}
            onChange={(e) => setValueDescriptionUpdate(e.target.value)}
            rows="20"
            cols="10"
            placeholder="answer"
          />
          <button>Изменить</button>
        </form>
      ) : null}
    </>
  );
};

export { Edit };
