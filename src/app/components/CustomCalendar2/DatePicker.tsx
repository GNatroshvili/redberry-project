"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./DatePicker.module.css";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import CalendarActions from "./CalendarActions";

type Props = {
  onDateChange?: (date: Date | null) => void;
};

const DatePicker: React.FC<Props> = ({ onDateChange }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const weekDays = ["L", "M", "M", "J", "V", "S", "D"];

  const formatDate = (date: Date | null): string => {
    if (!date) return "DD/MM/YYYY";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatMonthYear = (date: Date): string => {
    const monthNames = [
      "იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი",
      "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"
    ];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const generateDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const days = [];

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        isSelected: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        isSelected:
          tempSelectedDate &&
          tempSelectedDate.getDate() === i &&
          tempSelectedDate.getMonth() === month &&
          tempSelectedDate.getFullYear() === year,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        isSelected: false,
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const handleSelectDate = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setTempSelectedDate(newDate);
  };

  const handleCancel = () => {
    setTempSelectedDate(selectedDate);
    setIsOpen(false);
  };

  const handleConfirm = () => {
    setSelectedDate(tempSelectedDate);
    setIsOpen(false);
    onDateChange?.(tempSelectedDate);
  };

  const toggleCalendar = () => {
    if (!isOpen) {
      const referenceDate = selectedDate || new Date();
      setCurrentMonth(new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1));
      setTempSelectedDate(selectedDate);
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
