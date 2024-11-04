import "./SearchInput.css";

const SearchInput = ({ inputEl, searchTerm, getSearchTerm, questions }) => {
  return (
    <div className="input-search-box">
      <input
        className="input-search"
        ref={inputEl}
        value={searchTerm}
        onChange={getSearchTerm}
        type="text"
        placeholder="введите вопрос..."
      />
      <div className="questions">{<div>[{questions.length}]</div>}</div>
    </div>
  );
};

export default SearchInput;
