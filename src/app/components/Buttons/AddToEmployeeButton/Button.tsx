// components/AddToEmployeeButton.tsx
"use client";
import React from "react";
import styles from "./Button.module.css";

type Props = {
  title: string;
  onClick: () => void;
};

const AddToEmployeeButton = ({ title, onClick }: Props) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {title}
    </button>
  );
};

export default AddToEmployeeButton;
