// "use client";

// import React, { useState } from "react";
// import styles from "./InputField.module.css";


// interface InputFieldProps {
//   title: string;
//   width: string;
//   height: string;
// }

// const InputField: React.FC<InputFieldProps> = ({ title, width, height }) => {
//   const isDescription = title === "აღწერა";
//   const [input, setInput] = useState("");

//   return (
//     <div className={styles.container}>
//       <label className={styles.label}>
//         {title} {title === "სათაური" && <span>*</span>}
//       </label>
//       {isDescription ? (
//         <textarea
//           value={input}
//           onChange={(e) => {
//             setInput(e.target.value);
//             console.log(input);
//           }}
//           className={styles.textarea}
//           style={{ width, height }}
//         />
//       ) : (
//         <input
//           value={input}
//           onChange={(e) => {
//             setInput(e.target.value);
//             console.log(input);
//           }}
//           type="text"
//           className={styles.inputField}
//           style={{ width, height }}
//         />
//       )}
//       <div className={styles.validationsWrapper}>
//         <p className={styles.validations}>მინიმუმ 2 სიმბოლო</p>
//         <p className={styles.validations}>მაქსიმუმ 255 სიმბოლო</p>
//       </div>
//     </div>
//   );
// };

// export default InputField;
"use client";

import React, { useState } from "react";
import styles from "./InputField.module.css";

interface InputFieldProps {
  title: string;
  width: string;
  height: string;
  onInputChange?: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ title, width, height, onInputChange }) => {
  const isDescription = title === "აღწერა";
  const [input, setInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInput(newValue);
    if (onInputChange) {
      onInputChange(newValue); 
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {title} {title === "სათაური" && <span>*</span>}
      </label>
      {isDescription ? (
        <textarea
          value={input}
          onChange={handleChange}
          className={styles.textarea}
          style={{ width, height }}
        />
      ) : (
        <input
          value={input}
          onChange={handleChange}
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
