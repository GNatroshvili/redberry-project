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

type Props = {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
};

const EnterNameField = ({ title, value, onChange, type, name }: Props) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          className={styles.input}
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
        <div className={styles.validations}>
          <p className={styles.validations}> მინიმუმ 2 სიმბოლო</p>
          <img src="./check.svg" alt="check-icon" />
        </div>
        <div className={styles.validations}>
          <p className={styles.validations}> მაქსიმუმ 255 სიმბოლო</p>
          <img src="./check.svg" alt="check-icon" />
        </div>
      </div>
    </div>
  );
};

export default EnterNameField;
