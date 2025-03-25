import React from "react";
import styles from "./EnterNameField.module.css";

type Props = {
  title: any;
};

const EnterNameField = ({ title }: Props) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <input type="text" className={styles.input} />
      <div className={styles.validationsWrapper}>
        <div className={styles.validations}>
          <p className={styles.validations}> minimum 2 symbol</p>
          <img src="./check.svg" alt="check-icon" />
        </div>
        <div className={styles.validations}>
          <p className={styles.validations}> maximum 255 symbol</p>
          <img src="./check.svg" alt="check-icon" />
        </div>
      </div>
    </div>
  );
};

export default EnterNameField;
