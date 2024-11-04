import styles from "./List.module.css";
import { ItemList } from "./ItemList.jsx";

const List = ({
  questions,
  allQuestionsArray,
  setQuestions,
  setClickClose,
}) => {
  return (
    <ul className={styles.list}>
      {questions.map((question, index) => (
        <ItemList
          question={question}
          index={index}
          questions={allQuestionsArray}
          setQuestions={setQuestions}
          setClickClose={setClickClose}
        />
      ))}
    </ul>
  );
};

export { List };
