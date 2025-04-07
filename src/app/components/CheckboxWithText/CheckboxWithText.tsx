"use client";
import React from "react";
import { TagColor } from "../../types";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import styles from "./CheckboxWithText.module.css";

type Props = {
  color?: TagColor;
  hasImage?: boolean;
  text: string;
  isChecked: boolean;
  onChange: () => void;
};

const CheckboxWithText = ({
  color = "purple",
  hasImage = false,
  text,
  isChecked,
  onChange,
}: Props) => {
  return (
    <div className={styles.container}>
      <CustomCheckbox
        color={color}
        isChecked={isChecked}
        handleChange={onChange}
      />
      <div className={styles.textContainer}>
        {hasImage && (
          <img width={28} height={28} src="/avatar.svg" alt="avatar" />
        )}
        <span>{text}</span>
      </div>
    </div>
  );
};

export default CheckboxWithText;
