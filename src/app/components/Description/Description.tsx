import React from "react";
import styles from "./Description.module.css"

type Props = {
    text: string,
}

const Description = ({ text }: Props) => {
  return (
    <div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Description;
