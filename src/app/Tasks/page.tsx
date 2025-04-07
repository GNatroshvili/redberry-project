"use client";
import "@fontsource/firago";
import "@fontsource/firago/300.css";
import "@fontsource/firago/300-italic.css";
import "@fontsource/firago/400.css";
import "@fontsource/firago/400-italic.css";
import "@fontsource/firago/500.css";
import "@fontsource/firago/500-italic.css";
import "@fontsource/firago/600.css";
import "@fontsource/firago/600-italic.css";
import "@fontsource/firago/700.css";
import "@fontsource/firago/700-italic.css";
import React, { useState, useEffect } from "react";
import { PriorityType, DepartmentType, StatusType } from "../types";
import api from "../api";
import Priority from "../components/Priority/Priority";
import Status from "../components/Status/Status";
import DepartmentsList from "../components/DepartmentsList/DepartmentsList";
import styles from "./page.module.css";
import CustomCalendar2 from "../components/CustomCalendar2/DatePicker";
import ResponsibleEmployeer from "../components/ResponsibleEmployeer/ResponsibleEmployeer";
import InputField from "../components/InputField/InputField";
import PageTitle from "../components/PageTitle/PageTitle";
import Header from "../components/Header/Header";

export default function Home() {
  const [priorities, setPriorities] = useState<PriorityType[]>([]);
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [statuses, setstatuses] = useState<StatusType[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: prioritiesData } = await api.get("/api/priorities");
        const { data: departmentsData } = await api.get("/api/departments");
        console.log("Departments Data:", departmentsData); // Add this line
        const { data: statusesData } = await api.get("/api/statuses");

        setPriorities(prioritiesData);
        setDepartments(departmentsData);
        setstatuses(statusesData);
        setDepartments(departmentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Error fetching initial data.");
      }
    }

    fetchData();
  }, []);

  const [titleInputValue, setTitleInputValue] = useState("");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentType | null>(null);

  useEffect(() => {
    console.log(selectedDepartment);
  }, [selectedDepartment]);

  const [selectedPriorityId, setSelectedPriorityId] = useState<number | null>(
    null
  );
  const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [selectedDeadline, setSelectedDeadline] = useState<Date | null>(null);

  const handleTitleInputChange = (value: string) => {
    setTitleInputValue(value);
    console.log("Title in Parent:", value);
  };

  const handleDescriptionInputChange = (value: string) => {
    setDescriptionInputValue(value);
    console.log("Description in Parent:", value);
  };

  const handleDepartmentSelection = (department: DepartmentType) => {
    console.log(
      "Selected Department ID:",
      department.id,
      "Name:",
      department.name
    );
    setSelectedDepartment(department);
    console.log("Selected Department in Parent:", department.name);
  };

  const handlePrioritySelection = (id: number) => {
    setSelectedPriorityId(id);
    console.log("Selected Priority ID in Parent:", id);
  };

  const handleStatusSelection = (id: number) => {
    setSelectedStatusId(id);
    console.log("Selected Status ID in Parent:", id);
  };

  const handleEmployeeIdSelection = (id: number) => {
    setSelectedEmployeeId(id);
    console.log("Selected Employee ID:", id);
  };

  const handleDeadlineChange = (date: Date | null) => {
    setSelectedDeadline(date);
    console.log("Selected Deadline:", date);
  };

  const formatDateForDisplay = (date: Date | null): string => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleCreateTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    const dueDate = selectedDeadline
      ? formatDateForDisplay(selectedDeadline)
      : null;

    const taskData = {
      name: titleInputValue,
      description: descriptionInputValue,
      due_date: dueDate,
      status_id: selectedStatusId,
      employee_id: selectedEmployeeId,
      priority_id: selectedPriorityId,
      department_id: selectedDepartment?.id,
    };

    try {
      console.log("Task Data Being Sent:", taskData);
      console.log(JSON.stringify(taskData))
      const res = await fetch(
        "https://momentum.redberryinternship.ge/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 9e882e2f-3297-435e-b537-67817136c385",
          },
          body: JSON.stringify(taskData),
        }
      );

      const result = await res.json();

      if (res.ok) {
        console.log("Task created successfully:", result);
        setSuccessMessage("Task created successfully!");
        setTitleInputValue("");
        setDescriptionInputValue("");
        setSelectedDepartment(null);
        setSelectedPriorityId(null);
        setSelectedStatusId(null);
        setSelectedEmployeeId(null);
        setSelectedDeadline(null);
      } else {
        console.error("Error creating task:", result);
        setErrorMessage(
          `Failed to create task. ${
            result?.message || "Please check the form data."
          }`
        );
      }
    } catch (err) {
      console.error("Error sending form data:", err);
      setErrorMessage("An unexpected error occurred while creating the task.");
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <PageTitle text={"შექმენი ახალი დავალება"} />
      <div className={styles.taskWrapper}>
        <div className={styles.firstLine}>
          <InputField
            title="სათაური"
            width="550px"
            height="45px"
            onInputChange={handleTitleInputChange}
          />
          <DepartmentsList
            departments={departments}
            onDepartmentSelect={handleDepartmentSelection}
          />
        </div>
        <div className={styles.secondLine}>
          <InputField
            title="აღწერა"
            width="550px"
            height="133px"
            onInputChange={handleDescriptionInputChange}
          />
          <ResponsibleEmployeer onEmployeeSelect={handleEmployeeIdSelection} />
        </div>
        <div className={styles.thirdLine}>
          <div className={styles.leftSide}>
            <Priority
              priorities={priorities}
              onPrioritySelect={handlePrioritySelection}
            />
            <Status
              statuses={statuses}
              onStatusSelect={handleStatusSelection}
              title={"სტატუსი*"}
            />
          </div>
          <div className={styles.rightSide}>
            <CustomCalendar2 onDateChange={handleDeadlineChange} />
          </div>
        </div>
        <div className={styles.fourthLine}>
          <div>
            <button className={styles.button} onClick={handleCreateTask}>
              დავალების შექმნა
            </button>
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
