import React from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

interface ButtonProps {
  title: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, className, onClick }) => {
  return (
    <div>
      <button className={clsx(styles.button, className)} onClick={onClick}>
        <img src="/arrow.svg" alt="" className={styles.img} />
        {title}
      </button>
    </div>
  );
};

export default Button;
