import React from "react";
import styles from "./PrimaryButton.module.css";

interface PrimaryButtonProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick} disabled={props.disabled}>
      {props.title}
    </button>
  );
};

export default PrimaryButton;
