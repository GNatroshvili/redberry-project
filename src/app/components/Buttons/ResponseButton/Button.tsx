import React from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

const Button = (props: any) => {
  return (
    <div>
      <button 
        className={clsx(styles.button, props.className)} 
        onClick={props.onClick}
      >
        <img src="/arrow.svg" alt="" className={styles.img} />
        {props.title}
      </button>
    </div>
  );
};

export default Button;
