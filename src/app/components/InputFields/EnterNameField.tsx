import React from "react";
import styles from "./EnterNameField.module.css";
import Image from "next/image";
import { useFormikContext } from "formik";
import classNames from "classnames";

interface Props {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
}

interface FormValues {
  [key: string]: string; 
}

const EnterNameField = ({ title, value, onChange, type, name }: Props) => {
  const { errors, touched } = useFormikContext<FormValues>();
  const hasError = touched[name] && !!errors[name];
  const isTooShort = value.length > 0 && value.length < 2;
  const isTooLong = value.length > 255;
  const isValidLength = value.length >= 2 && value.length <= 255;

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>

      <div className={styles.inputWrapper}>
        <input
          type={type}
          className={classNames(styles.input, {
            [styles.inputError]: isTooShort || isTooLong || hasError, // Use hasError here
            [styles.inputValid]: isValidLength,
          })}
          value={value}
          onChange={onChange}
          name={name}
        />
        <Image
          src="/verified.svg"
          alt="verified"
          width={18}
          height={18}
          className={styles.verified}
        />
      </div>

      <div className={styles.validationsWrapper}>
        <div
          className={classNames(styles.validations, {
            [styles.validText]: value.length >= 2,
            [styles.errorText]: isTooShort,
          })}
        >
          <img
            src={
              value.length >= 2
                ? "/green-check.svg"
                : isTooShort
                ? "/red-check.svg"
                : "/check.svg"
            }
            alt="check-icon"
          />
          <p>მინიმუმ 2 სიმბოლო</p>
        </div>
        <div
          className={classNames(styles.validations, {
            [styles.validText]: value.length <= 255 && value.length > 0,
            [styles.errorText]: isTooLong,
          })}
        >
          <img
            src={
              value.length > 0 && value.length <= 255
                ? "/green-check.svg"
                : isTooLong
                ? "/red-check.svg"
                : "/check.svg"
            }
            alt="check-icon"
          />
          <p>მაქსიმუმ 255 სიმბოლო</p>
        </div>
        {hasError && <p className={styles.formError}>{errors[name]}</p>}{" "}
      </div>
    </div>
  );
};

export default EnterNameField;
