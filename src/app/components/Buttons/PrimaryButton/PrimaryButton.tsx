import React from "react";
import styles from "./PrimaryButton.module.css";

const PrimaryButton = (props: any) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.title}
    </button>
  );
};

export default PrimaryButton;
