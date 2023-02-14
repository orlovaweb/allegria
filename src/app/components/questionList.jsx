import React from "react";
import PropTypes from "prop-types";
import "./questionList.css";

const QuestionList = ({ questions, toggleQuestion, selectedQuestion }) => {
  return (
    <ul>
      {questions.map((item, index) => (
        <li key={item.id} className="question-box">
          <div className="question" onClick={() => toggleQuestion(index)}>
            <h5 className="question-text">{item.question}</h5>
            <div
              className={
                "question-btn" +
                (selectedQuestion === index ? " opened" : " closed")
              }
            ></div>
          </div>

          <p className={"answer" + (selectedQuestion === index ? " show" : "")}>
            {item.answer}
          </p>
        </li>
      ))}
    </ul>
  );
};
QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  toggleQuestion: PropTypes.func.isRequired,
  selectedQuestion: PropTypes.number.isRequired,
};
export default QuestionList;
