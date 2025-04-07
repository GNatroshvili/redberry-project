import React from "react";
import styles from "./InputFile.module.css";

type Props = {
  text: string;
};

const InputFile = ({ text }: Props) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.input}
        type="submit"
        value={text}
        placeholder={text}
      />
    </div>
  );
};

export default InputFile;
