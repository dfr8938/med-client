import styles from "./FormModule.module.css";
import axios from "axios";

const FormModule = ({
  questionsArray,
  setAllQuestionsArray,
  valueTitle,
  valueDescription,
  setValueTitle,
  setValueDescription,
  clickClose,
  setClickClose,
}) => {
  const createQuestion = async (title, description) => {
    const { data } = await axios.post(`http://localhost:3001/api/pat`, {
      title,
      description,
    });
    const allQuestionsArray = questionsArray;
    setAllQuestionsArray([{ ...data }, ...allQuestionsArray]);

    setClickClose(!clickClose);

    setValueTitle("");
    setValueDescription("");
  };

  const onSubmitFormCreate = async (e) => {
    e.preventDefault();
    return createQuestion(valueTitle, valueDescription);
  };

  return (
    <>
      {clickClose && (
        <div className={styles.form_module}>
          <form className={styles.form} onSubmit={onSubmitFormCreate}>
            <i
              className="fa-solid fa-xmark"
              onClick={() => setClickClose(!clickClose)}
            ></i>
            <h2>Добавить вопрос</h2>
            <div className={styles.form_box_row}>
              <input
                value={valueTitle}
                onChange={(e) => setValueTitle(e.target.value)}
                type="text"
                placeholder="введите заголовок"
              />
              <textarea
                value={valueDescription}
                onChange={(e) => setValueDescription(e.target.value)}
                rows="14"
                cols="10"
                placeholder="введите описание"
              />
              <div className={styles.attention}>
                * - форматирование (перенос на новую строку, списки и т.д.)
                поддерживается в описании
              </div>
              <button>Добавить</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export { FormModule };
