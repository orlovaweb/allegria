import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { removeLetter } from "../../store/letters";
import displayDate from "../../utils/displayDate";
import "./letter.css";

const Letter = ({ letter }) => {
  const dispatch = useDispatch();
  const { name, email, text, type, _id, date } = letter;
  const handleDelete = () => {
    dispatch(removeLetter(_id));
  };
  return (
    <>
      <div className="letter">
        <div className="letter-content">
          <div>
            <p className="letter-date">{displayDate(date)}</p>
          </div>
          <div>
            <p>
              <span>Имя: </span> {name}
            </p>
          </div>
          <div>
            <p>
              <span>Почта: </span> {email}
            </p>
          </div>
          <div>
            <p>
              <span>Текст: </span> {text}
            </p>
          </div>
        </div>
        <div className="letter-bage">
          {type === "question" ? "вопрос" : "предложение"}
        </div>
        <div className="letter-mail">
          <a href={`mailto:${email}`}>Ответить</a>
        </div>
        <div className="letter-close" onClick={handleDelete}></div>
      </div>
    </>
  );
};
Letter.propTypes = {
  letter: PropTypes.object
};
export default Letter;
