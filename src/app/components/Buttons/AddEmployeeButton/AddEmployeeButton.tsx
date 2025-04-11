import React from "react";
import Styles from "./AddEmployeeButton.module.css";

type Props = {
  title: string;
};

const AddEmployeeButton = ({ title }: Props) => {
  return (
    <div className={Styles.addition}>
      <img src="/addition-icon.svg" alt="addition-icon" />
      <p className={Styles.additionName}>{title}</p>
    </div>
  );
};

export default AddEmployeeButton;
