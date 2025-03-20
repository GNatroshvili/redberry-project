import React from "react";
import Styles from "./AddEmployeeButton.module.css";

const AddEmployeeButton = (props: any) => {
  return (
    <div className={Styles.addition}>
      <img src="/addition-icon.svg" alt="addition-icon" />
      <p className={Styles.additionName}>{props.title}</p>
    </div>
  );
};

export default AddEmployeeButton;
