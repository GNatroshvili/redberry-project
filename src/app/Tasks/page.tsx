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
import CustomDropdown from "../components/CustomDropdown/CustomDropdown";
import ResponsibleEmployeer from "../components/ResponsibleEmployeer/ResponsibleEmployeer";
import InputField from "../components/InputField/InputField";
import PageTitle from "../components/PageTitle/PageTitle";
import Header from "../components/Header/Header"
import CreateTask from "../components/Buttons/CreateTask/Button";



export default function Home() {
  const [priorities, setPriorities] = useState<PriorityType[]>([]);
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [statuses, setstatuses] = useState<StatusType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: prioritiesData } = await api.get("/api/priorities");
        const { data: departmentsData } = await api.get("/api/departments");
        const { data: statusesData } = await api.get("/api/statuses");

        setPriorities(prioritiesData);
        setDepartments(departmentsData);
        setstatuses(statusesData);
        setDepartments(departmentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const [titleInputValue, setTitleInputValue] = useState("");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentType | null>(null);
  const [selectedPriorityName, setSelectedPriorityName] = useState<string | null>(null);
  const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);

  const handleTitleInputChange = (value: string) => {
    setTitleInputValue(value);
    console.log("Title in Parent:", value);
  };

  const handleDescriptionInputChange = (value: string) => {
    setDescriptionInputValue(value);
    console.log("Description in Parent:", value);
  };

  const handleDepartmentSelection = (department: DepartmentType) => {
    setSelectedDepartment(department);
    console.log("Selected Department in Parent:", department.name);
  };

  const handlePrioritySelection = (name: string) => {
    setSelectedPriorityName(name);
    console.log("Selected Priority in Parent:", name);
  };

  const handleStatusSelection = (id: number) => {
    setSelectedStatusId(id);
    console.log("Selected Status ID in Parent:", id);
    // You can now use selectedStatusId
  };


  return (
    <div className={styles.container}>
      <Header />
      <PageTitle text={"შექმენი ახალი დავალება"} />
      <div className={styles.taskWrapper}>
        <div className={styles.firstLine}>
          <InputField title="სათაური" width="550px" height="45px" onInputChange={handleTitleInputChange}
          />
          <DepartmentsList departments={departments} onDepartmentSelect={handleDepartmentSelection} />
        </div>
        <div className={styles.secondLine}>
          <InputField title="აღწერა" width="550px" height="133px" onInputChange={handleDescriptionInputChange} />
          <ResponsibleEmployeer />
        </div>
        <div className={styles.thirdLine}>
          <div className={styles.leftSide}>
            <Priority priorities={priorities} onPrioritySelect={handlePrioritySelection} />
            <Status statuses={statuses} onStatusSelect={handleStatusSelection} />
          </div>
          <div className={styles.rightSide}>
            <CustomCalendar2 />
          </div>
        </div>
        <div className={styles.fourthLine}>
          <div>
            <button className={styles.button}>
              შექმნა
            </button>
            <p>Title Value in Parent: {titleInputValue}</p>
            <p>Description Value in Parent: {descriptionInputValue}</p>
            {selectedDepartment && (
              <p>Selected Department Name: {selectedDepartment.name}</p>
            )}
            {selectedPriorityName && (
              <p>Selected Priority: {selectedPriorityName}</p>
            )}
            {selectedStatusId !== null && (
              <p>Selected Status ID: {selectedStatusId}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
