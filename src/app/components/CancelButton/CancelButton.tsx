import React from "react";
import styles from "./CancelButton.module.css";

type Props = {
  text: string;
  onClick: () => void;
};

const CancelButton = ({ text, onClick }: Props) => {
  return (
    <div>
      <button className={styles.button} type="button" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default CancelButton;
