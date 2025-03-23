// import * as React from "react";
// import TextField from "@mui/material/TextField";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// const theme = createTheme({
//   components: {
//     MuiDatePicker: {
//       styleOverrides: {
//         root: {
//           '& .MuiDatePickerDay-day.Mui-selected': {
//             backgroundColor: 'purple !important',
//             '&:hover': {
//               backgroundColor: '#6a1b9a !important'
//             }
//           }
//         }
//       }
//     }
//   }
// });

// export default function CustomDatePicker() {
//   const [value, setValue] = React.useState(null);

//   return (
//     <ThemeProvider theme={theme}>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DatePicker
//           label="Select Date"
//           value={value}
//           onChange={(newValue) => setValue(newValue)}
//           renderInput={(params) => <TextField {...params} />}
//           sx={{
//             '& .MuiDatePickerDay-day.Mui-selected': {
//               backgroundColor: 'purple !important',
//               '&:hover': {
//                 backgroundColor: '#6a1b9a !important'
//               }
//             }
//           }}
//         />
//       </LocalizationProvider>
//     </ThemeProvider>
//   );
// }

import React, { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "./flatpickr-overrides.css"; // Global overrides
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
