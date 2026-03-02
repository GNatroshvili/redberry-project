import React from "react";
import Styles from "./AddEmployeeButton.module.css";

type Props = {
  title: string;
  onClick?: () => void;
};

const AddEmployeeButton = ({ title, onClick }: Props) => {
  return (
    <div className={Styles.addition} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
      <img src="/addition-icon.svg" alt="addition-icon" />
      <p className={Styles.additionName}>{title}</p>
    </div>
  );
};

export default AddEmployeeButton;
