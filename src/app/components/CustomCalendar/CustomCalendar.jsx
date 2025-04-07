import React, { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "./flatpickr-overrides.css"; 
import styles from "./CustomCalendar.module.css";
import "./flatpickr-overrides.css";

const DatePicker = () => {
  const inputRef = useRef(null);
  const fpInstance = useRef(null);

  useEffect(() => {
    fpInstance.current = flatpickr(inputRef.current, {
      dateFormat: "d/m/Y",
      placeholder: "DD/MM/YYYY",
      onDayCreate: (dObj, dStr, fp, dayElem) => {
        if (dayElem.classList.contains("today")) {
          dayElem.style.background = "";
          dayElem.style.color = "";
        }
      },
    });

    return () => {
      fpInstance.current?.destroy();
    };
  }, []);

  return (
    <div className={styles.inputWrapper}>
      <img
        src="/calendarLine.svg"
        className={styles.calendarIcon}
        alt="Calendar"
        onClick={() => inputRef.current.focus()}
      />
      <input
        ref={inputRef}
        type="text"
        id="datePicker"
        className={styles.datePickerInput}
        placeholder="DD/MM/YYYY"
      />
    </div>
  );
};

export default DatePicker;
