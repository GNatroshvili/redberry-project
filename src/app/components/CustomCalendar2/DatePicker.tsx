// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import styles from "./DatePicker.module.css";
// import CalendarHeader from "./CalendarHeader";
// import CalendarGrid from "./CalendarGrid";
// import CalendarActions from "./CalendarActions";

// const DatePicker: React.FC = () => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(null);
//   const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 0, 1)); // January 2025
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const datePickerRef = useRef<HTMLDivElement>(null);

//   // Weekday labels
//   const weekDays = ["L", "M", "M", "J", "V", "S", "D"];

//   // Format date as DD/MM/YYYY
//   const formatDate = (date: Date | null): string => {
//     if (!date) return "DD/MM/YYYY";
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   // Format month display
//   const formatMonthYear = (date: Date): string => {
//     // Georgian month names
//     const monthNames = [
//       "იანვარი",
//       "თებერვალი",
//       "მარტი",
//       "აპრილი",
//       "მაისი",
//       "ივნისი",
//       "ივლისი",
//       "აგვისტო",
//       "სექტემბერი",
//       "ოქტომბერი",
//       "ნოემბერი",
//       "დეკემბერი",
//     ];
//     return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
//   };

//   // Generate days for the calendar
//   const generateDays = () => {
//     const year = currentMonth.getFullYear();
//     const month = currentMonth.getMonth();

//     // Get first day of the month
//     const firstDay = new Date(year, month, 1);
//     // Get last day of the month
//     const lastDay = new Date(year, month + 1, 0);

//     // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
//     let firstDayOfWeek = firstDay.getDay();
//     // Adjust for Monday as first day of week
//     firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

//     const daysInMonth = lastDay.getDate();
//     const daysInPrevMonth = new Date(year, month, 0).getDate();

//     const days = [];

//     // Add days from previous month
//     for (let i = firstDayOfWeek - 1; i >= 0; i--) {
//       days.push({
//         date: daysInPrevMonth - i,
//         isCurrentMonth: false,
//         isSelected: false,
//       });
//     }

//     // Add days from current month
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push({
//         date: i,
//         isCurrentMonth: true,
//         isSelected: tempSelectedDate
//           ? tempSelectedDate.getDate() === i &&
//             tempSelectedDate.getMonth() === month &&
//             tempSelectedDate.getFullYear() === year
//           : false,
//       });
//     }

//     // Add days from next month
//     const remainingDays = 42 - days.length; // 6 rows of 7 days
//     for (let i = 1; i <= remainingDays; i++) {
//       days.push({
//         date: i,
//         isCurrentMonth: false,
//         isSelected: false,
//       });
//     }

//     return days;
//   };

//   // Handle month navigation
//   const handlePrevMonth = () => {
//     setCurrentMonth(
//       new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
//     );
//   };

//   const handleNextMonth = () => {
//     setCurrentMonth(
//       new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
//     );
//   };

//   // Handle date selection
//   const handleSelectDate = (day: number) => {
//     const newDate = new Date(
//       currentMonth.getFullYear(),
//       currentMonth.getMonth(),
//       day
//     );
//     setTempSelectedDate(newDate);
//   };

//   // Handle calendar actions
//   const handleCancel = () => {
//     setTempSelectedDate(selectedDate);
//     setIsOpen(false);
//   };

//   const handleConfirm = () => {
//     setSelectedDate(tempSelectedDate);
//     setIsOpen(false);
//   };

//   // Toggle calendar visibility
//   const toggleCalendar = () => {
//     if (!isOpen) {
//       setTempSelectedDate(selectedDate);
//     }
//     setIsOpen(!isOpen);
//   };

//   // Close calendar when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         datePickerRef.current &&
//         !datePickerRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className={styles.datepicker} ref={datePickerRef}>
//       <div className={styles.container}>
//         <label className={styles.label}>დედლაინი</label>
//         <div className={styles.inputWrapper}>
//           <div className={styles.inputField} onClick={toggleCalendar}>
//             <img
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/81d830de5498a12b064b9f33b671c56aca6aa591?placeholderIfAbsent=true&apiKey=4842f4b6cd0f4dd2874a8151479bb22a"
//               className={styles.calendarIcon}
//               alt="Calendar"
//             />
//             <div className={styles.inputContent}>
//               <div className={styles.caret} />
//               <div className={styles.placeholder}>
//                 {formatDate(selectedDate)}
//               </div>
//             </div>
//           </div>

//           {isOpen && (
//             <div className={styles.calendarDropdown}>
//               <CalendarHeader
//                 currentMonth={formatMonthYear(currentMonth)}
//                 onPrevMonth={handlePrevMonth}
//                 onNextMonth={handleNextMonth}
//               />

//               <CalendarGrid
//                 days={generateDays()}
//                 weekDays={weekDays}
//                 onSelectDate={handleSelectDate}
//               />

//               <CalendarActions
//                 onCancel={handleCancel}
//                 onConfirm={handleConfirm}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DatePicker;

"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./DatePicker.module.css";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import CalendarActions from "./CalendarActions";

type Props = {
  onDateChange?: (date: Date | null) => void; // Ensure this is Date | null
};

const DatePicker: React.FC<Props> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 0, 1)); // January 2025
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Weekday labels
  const weekDays = ["L", "M", "M", "J", "V", "S", "D"];

  // Format date as DD/MM/YYYY
  const formatDate = (date: Date | null): string => {
    if (!date) return "DD/MM/YYYY";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Format month display
  const formatMonthYear = (date: Date): string => {
    // Georgian month names
    const monthNames = [
      "იანვარი",
      "თებერვალი",
      "მარტი",
      "აპრილი",
      "მაისი",
      "ივნისი",
      "ივლისი",
      "აგვისტო",
      "სექტემბერი",
      "ოქტომბერი",
      "ნოემბერი",
      "დეკემბერი",
    ];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Generate days for the calendar
  const generateDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Get first day of the month
    const firstDay = new Date(year, month, 1);
    // Get last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = firstDay.getDay();
    // Adjust for Monday as first day of week
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Add days from previous month
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        isSelected: false,
      });
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        isSelected: tempSelectedDate
          ? tempSelectedDate.getDate() === i &&
            tempSelectedDate.getMonth() === month &&
            tempSelectedDate.getFullYear() === year
          : false,
      });
    }

    // Add days from next month
    const remainingDays = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        isSelected: false,
      });
    }

    return days;
  };

  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // Handle date selection
  const handleSelectDate = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    setTempSelectedDate(newDate);
  };

  // Handle calendar actions
  const handleCancel = () => {
    setTempSelectedDate(selectedDate);
    setIsOpen(false);
  };

  const handleConfirm = () => {
    setSelectedDate(tempSelectedDate);
    setIsOpen(false);
    if (onDateChange) {
      onDateChange(tempSelectedDate); // Call the callback with the selected date
    }
  };

  // Toggle calendar visibility
  const toggleCalendar = () => {
    if (!isOpen) {
      setTempSelectedDate(selectedDate);
    }
    setIsOpen(!isOpen);
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.datepicker} ref={datePickerRef}>
      <div className={styles.container}>
        <label className={styles.label}>დედლაინი</label>
        <div className={styles.inputWrapper}>
          <div className={styles.inputField} onClick={toggleCalendar}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/81d830de5498a12b064b9f33b671c56aca6aa591?placeholderIfAbsent=true&apiKey=4842f4b6cd0f4dd2874a8151479bb22a"
              className={styles.calendarIcon}
              alt="Calendar"
            />
            <div className={styles.inputContent}>
              <div className={styles.caret} />
              <div className={styles.placeholder}>
                {formatDate(selectedDate)}
              </div>
            </div>
          </div>

          {isOpen && (
            <div className={styles.calendarDropdown}>
              <CalendarHeader
                currentMonth={formatMonthYear(currentMonth)}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
              />

              <CalendarGrid
                days={generateDays()}
                weekDays={weekDays}
                onSelectDate={handleSelectDate}
              />

              <CalendarActions
                onCancel={handleCancel}
                onConfirm={handleConfirm}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
