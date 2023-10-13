import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../../store/users";
import Loader from "../../pages/loader/loader";
import "./accountParts.css";

const PersonalInfo = () => {
  const user = useSelector(getCurrentUserData());
  if (user) {
    return (
      <section className="personal-info">
        <div className="form-register-row personal-info-row">
          <div className="input-text-wrapper">
            <p className="input-text-field">{user.name}</p>
          </div>
          <div className="input-text-wrapper ">
            <p className="input-text-field">{user.surname}</p>
          </div>
        </div>
        <div className="form-register-row personal-info-row">
          <div className="input-text-wrapper">
            <p className="input-text-field">{user.phone}</p>
          </div>
          <div className="input-text-wrapper">
            <p className="input-text-field">{user.email}</p>
          </div>
        </div>
      </section>
    );
  }
  return <Loader />;
};

export default PersonalInfo;
