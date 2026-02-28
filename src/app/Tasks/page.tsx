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
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
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

    // Validate required fields
    if (!titleInputValue.trim() || titleInputValue.trim().length < 2) {
      setErrorMessage("სათაური სავალდებულოა (მინიმუმ 2 სიმბოლო).");
      return;
    }
    if (!selectedDepartment?.id) {
      setErrorMessage("გთხოვთ აირჩიოთ დეპარტამენტი.");
      return;
    }
    if (!selectedPriorityId) {
      setErrorMessage("გთხოვთ აირჩიოთ პრიორიტეტი.");
      return;
    }
    if (!selectedStatusId) {
      setErrorMessage("გთხოვთ აირჩიოთ სტატუსი.");
      return;
    }
    if (!selectedEmployeeId) {
      setErrorMessage("გთხოვთ აირჩიოთ პასუხისმგებელი თანამშრომელი.");
      return;
    }

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
      department_id: selectedDepartment.id,
    };

    try {
      await api.post("/api/tasks", taskData);

      setSuccessMessage("დავალება წარმატებით შეიქმნა!");

      // Reset form
      setTitleInputValue("");
      setDescriptionInputValue("");
      setSelectedDepartment(null);
      setSelectedPriorityId(null);
      setSelectedStatusId(null);
      setSelectedEmployeeId(null);
      setSelectedDeadline(null);
      router.push("/");
    } catch (err) {
      console.error("Error creating task:", err);
      if (axios.isAxiosError(err) && err.response?.data) {
        const data = err.response.data;
        if (data.errors) {
          const messages = Object.values(data.errors).flat().join(", ");
          setErrorMessage(messages);
        } else if (data.message) {
          setErrorMessage(data.message);
        } else {
          setErrorMessage("დავალების შექმნა ვერ მოხერხდა.");
        }
      } else {
        setErrorMessage("დავალების შექმნა ვერ მოხერხდა.");
      }
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
          <div className={styles.btnWrapper}>
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
