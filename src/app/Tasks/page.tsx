"use client";
import axios from "axios";
import { useState, useEffect } from "react";
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
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [priorities, setPriorities] = useState<PriorityType[]>([]);
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [statuses, setStatuses] = useState<StatusType[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form state
  const [titleInputValue, setTitleInputValue] = useState("");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentType | null>(null);
  const [selectedPriorityId, setSelectedPriorityId] = useState<number | null>(
    null
  );
  const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [selectedDeadline, setSelectedDeadline] = useState<Date | null>(null);

  // Data fetching with axios cancellation
  useEffect(() => {
    const prioritiesSource = axios.CancelToken.source();
    const departmentsSource = axios.CancelToken.source();
    const statusesSource = axios.CancelToken.source();
    let ignore = false;

    const fetchData = async () => {
      try {
        const [
          { data: prioritiesData },
          { data: departmentsData },
          { data: statusesData },
        ] = await Promise.all([
          api.get("/api/priorities", { cancelToken: prioritiesSource.token }),
          api.get("/api/departments", { cancelToken: departmentsSource.token }),
          api.get("/api/statuses", { cancelToken: statusesSource.token }),
        ]);

        if (!ignore) {
          setPriorities(prioritiesData);
          setDepartments(departmentsData);
          setStatuses(statusesData);
        }
      } catch (error) {
        if (!ignore && !axios.isCancel(error)) {
          console.error("Error fetching data:", error);
          setErrorMessage("Error fetching initial data.");
        }
      }
    };

    fetchData();
    return () => {
      ignore = true;
      prioritiesSource.cancel("Component unmounted");
      departmentsSource.cancel("Component unmounted");
      statusesSource.cancel("Component unmounted");
    };
  }, []);

  const handleTitleInputChange = (value: string) => {
    setTitleInputValue(value);
  };

  const handleDescriptionInputChange = (value: string) => {
    setDescriptionInputValue(value);
  };

  const handleDepartmentSelection = (department: DepartmentType) => {
    setSelectedDepartment(department);
  };

  const handlePrioritySelection = (id: number) => {
    setSelectedPriorityId(id);
  };

  const handleStatusSelection = (id: number) => {
    setSelectedStatusId(id);
  };

  const handleEmployeeIdSelection = (id: number) => {
    setSelectedEmployeeId(id);
  };

  const handleDeadlineChange = (date: Date | null) => {
    setSelectedDeadline(date);
  };

  const formatDateForDisplay = (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const handleCreateTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    const controller = new AbortController();
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
      const res = await fetch(
        "https://momentum.redberryinternship.ge/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 9e882e2f-3297-435e-b537-67817136c385",
          },
          body: JSON.stringify(taskData),
          signal: controller.signal,
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const result = await res.json();
      setSuccessMessage("Task created successfully!");

      // Reset form
      setTitleInputValue("");
      setDescriptionInputValue("");
      setSelectedDepartment(null);
      setSelectedPriorityId(null);
      setSelectedStatusId(null);
      setSelectedEmployeeId(null);
      setSelectedDeadline(null);
      console.log("here")
      router.push('/')
    } catch (err) {
      if (!controller.signal.aborted) {
        console.error("Error creating task:", err);
        setErrorMessage("Failed to create task. Please check the form data.");
      }
    } finally {
      controller.abort();
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
            value={titleInputValue}
            onInputChange={handleTitleInputChange}
          />
          <DepartmentsList
            departments={departments}
            onDepartmentSelect={handleDepartmentSelection}
            size={"large"}
          />
        </div>
        <div className={styles.secondLine}>
          <InputField
            title="აღწერა"
            width="550px"
            height="133px"
            value={descriptionInputValue}
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
              <p className={styles.success}>{successMessage}</p>
            )}
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
