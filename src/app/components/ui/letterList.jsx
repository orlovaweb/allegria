import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { getLetters } from "../../store/letters";
import Letter from "./letter";
import "./letter.css";
const LetterList = () => {
  const letters = useSelector(getLetters()) || [];
  if (letters) {
    const sortedLetters = _.orderBy(letters, "date", "asc");
    return (
      <>
        <h3 className="letters-title">Вопросы и предложения</h3>
        {letters.length === 0 ? (
          <p className="no-letters">
            Пока нет вопросов и предложений. Как только появятся, Вы увидите их
            тут!
          </p>
        ) : (
          <div className="letter-table">
            {sortedLetters.map((letter) => (
              <Letter letter={letter} key={letter._id} />
            ))}
          </div>
        )}
      </>
    );
  }
  return "Loading...";
};

export default LetterList;
