// import React from "react";
// import styles from "./EnterNameField.module.css";
// import Image from "next/image";

// type Props = {
//   title: any;
// };

// const EnterNameField = ({ title }: Props) => {
//   return (
//     <div className={styles.container}>
//       <p className={styles.title}>{title}</p>
//       <div className={styles.inputWrapper}>
//         <input type="text" className={styles.input} />
//         <Image
//           src="/verified.svg"
//           alt="verified"
//           width={18}
//           height={18}
//           className={styles.verified}
//         />
//       </div>

//       <div className={styles.validationsWrapper}>
//         <div className={styles.validations}>
//           <p className={styles.validations}> მინიმუმ 2 სიმბოლო</p>
//           <img src="./check.svg" alt="check-icon" />
//         </div>
//         <div className={styles.validations}>
//           <p className={styles.validations}> მაქსიმუმ 255 სიმბოლო</p>
//           <img src="./check.svg" alt="check-icon" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnterNameField;

import React from "react";
import styles from "./EnterNameField.module.css";
import Image from "next/image";
import { useFormikContext } from "formik";
import classNames from "classnames";

type Props = {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
};

const EnterNameField = ({ title, value, onChange, type, name }: Props) => {
  const { errors, touched } = useFormikContext<any>();
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
            [styles.inputError]: isTooShort || isTooLong,
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
      </div>
    </div>
  );
};

export default EnterNameField;