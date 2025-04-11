import React from "react";
import styles from "./PrimaryButton.module.css";

interface PrimaryButtonProps {
  title: string;
  onClick?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.title}
    </button>
  );
};

export default PrimaryButton;
