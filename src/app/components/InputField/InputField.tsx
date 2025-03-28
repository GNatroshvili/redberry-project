// "use client";

// import React from "react";
// import styles from "./InputField.module.css";

// interface InputFieldProps {
//   title: string;
//   width: string;
//   height: string;
// }

// const InputField: React.FC<InputFieldProps> = ({ title, width, height }) => {
//   return (
//     <div className={styles.container}>
//       <label className={styles.label}>
//         {title} {title === "სათაური" && <span>*</span>}
//       </label>
//       <input
//         type="text"
//         className={styles.inputField}
//         style={{ width, height }} 
//       />
//       <div className={styles.validationsWrapper}>
//         <p className={styles.validations}>მინიმუმ 2 სიმბოლო</p> 
//         <p className={styles.validations}>მაქსიმუმ 255 სიმბოლო</p>
//       </div>
//     </div>
//   );
// };

// export default InputField;

"use client";

import React from "react";
import styles from "./InputField.module.css";

interface InputFieldProps {
  title: string;
  width: string;
  height: string;
}

const InputField: React.FC<InputFieldProps> = ({ title, width, height }) => {
  const isDescription = title === "აღწერა";

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {title} {title === "სათაური" && <span>*</span>}
      </label>
      {isDescription ? (
        <textarea
          className={styles.textarea} 
          style={{ width, height }}
        />
      ) : (
        <input
          type="text"
          className={styles.inputField}
          style={{ width, height }}
        />
      )}
      <div className={styles.validationsWrapper}>
        <p className={styles.validations}>მინიმუმ 2 სიმბოლო</p> 
        <p className={styles.validations}>მაქსიმუმ 255 სიმბოლო</p>
      </div>
    </div>
  );
};

export default InputField;
