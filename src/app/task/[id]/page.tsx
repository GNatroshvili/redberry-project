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
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { TaskType, StatusType } from "../../types";
import Header from "../../components/Header/Header";
import PageTitle from "../../components/PageTitle/PageTitle";
import Status from "../../components/Status/Status";
import Difficulty from "../../components/Details/Category/Difficulty/Difficulty";
import Category from "../../components/Details/Category/Category";
import Comments from "../../components/Comments/Comments";
import styles from "./page.module.css";
import Description from "../../components/Description/Description";
import TaskDetails from "../../components/TaskDetails/TaskDetails";
import TaskComponents from "../../components/TaskComponents/TaskComponents";

type Color = "pink" | "orange" | "blue" | "yellow";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const [task, setTask] = useState<TaskType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<StatusType[]>([]);
  const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const taskId = typeof id === "string" ? id : "";

  useEffect(() => {
    async function fetchTask() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://momentum.redberryinternship.ge/api/tasks/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer 9e882e2f-3297-435e-b537-67817136c385`,
            },
          }
        );
        setTask(response.data);
        console.log("Fetched Task Status:", response.data.status);
      } catch (err) {
        console.error("Error fetching task:", err);
        setError("Failed to fetch task details.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchTask();
    }
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: statusesData } = await axios.get(
          "https://momentum.redberryinternship.ge/api/statuses",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer 9e882e2f-3297-435e-b537-67817136c385`,
            },
          }
        );
        setStatuses(statusesData);
      } catch (error) {
        console.error("Error fetching statuses:", error);
        setErrorMessage("Error fetching initial data.");
      }
    }

    fetchData();
  }, []);

  // ✅ Log task.status when task state updates
  useEffect(() => {
    if (task) {
      console.log("Task Status (from task state):", task.status);
    }
  }, [task]);

  const handleStatusSelection = (id: number) => {
    setSelectedStatusId(id);
    console.log("Selected Status ID in Parent:", id);
  };

  const getStatusColor = (statusName: string | undefined) => {
    switch (statusName) {
      case "მაღალი":
        return "red";
      case "საშუალო":
        return "orange";
      case "დაბალი":
        return "green";
      default:
        return "orange";
    }
  };

  const getCategoryName = (
    CategoryName: string | undefined
  ):
    | "დიზაინი"
    | "მარკეტინგი"
    | "ლოჯისტიკა"
    | "ინფ. ტექ"
    | "ადმინისტრაცია"
    | "HR"
    | "ფინანსები"
    | "მედია"
    | undefined => {
    if (CategoryName === "დიზაინერების დეპარტამენტი") return "დიზაინი";
    if (CategoryName === "გაყიდვები და მარკეტინგის დეპარტამენტი")
      return "მარკეტინგი";
    if (CategoryName === "ლოჯოსტიკის დეპარტამენტი") return "ლოჯისტიკა";
    if (CategoryName === "ტექნოლოგიების დეპარტამენტი") return "ინფ. ტექ";
    if (CategoryName === "ადმინისტრაციის დეპარტამენტი") return "ადმინისტრაცია";
    if (CategoryName === "ადამიანური რესურსების დეპარტამენტი") return "HR";
    if (CategoryName === "ფინანსების დეპარტამენტი") return "ფინანსები";
    if (CategoryName === "მედიის დეპარტამენტი") return "მედია";
    return undefined;
  };

  const getCategoryColor = (CategoryName: string | undefined): Color => {
    if (CategoryName === "დიზაინერების დეპარტამენტი") return "pink";
    if (CategoryName === "ლოჯოსტიკის დეპარტამენტი") return "blue";
    if (CategoryName === "გაყიდვები და მარკეტინგის დეპარტამენტი")
      return "orange";
    if (CategoryName === "ტექნოლოგიების დეპარტამენტი") return "yellow";
    if (CategoryName === "ადმინისტრაციის დეპარტამენტი") return "pink";
    if (CategoryName === "ადამიანური რესურსების დეპარტამენტი") return "blue";
    if (CategoryName === "ფინანსების დეპარტამენტი") return "orange";
    if (CategoryName === "მედიის დეპარტამენტი") return "yellow";
    return "orange";
  };

  const formatDueDateWithWeekday = (date: string | undefined) => {
    if (!date) return "N/A";
    const weekdays = ["კვი", "ორშ", "სამშ", "ოთხშ", "ხუთშ", "პარ", "შაბ"];
    const dueDate = new Date(date);
    const weekdayName = weekdays[dueDate.getDay()];
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const formattedDate = dueDate.toLocaleDateString("en-GB", options);
    return `${weekdayName} - ${formattedDate}`;
  };

  return (
    <div>
      <Header />
      <div className={styles.tags}>
        {task && (
          <Difficulty
            size="big"
            color={getStatusColor(task.priority?.name)}
            text={task.priority?.name}
          />
        )}
        <Category
          title={getCategoryName(task?.department?.name) || "N/A"}
          color={getCategoryColor(task?.department?.name)}
        />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.leftSide}>
          <PageTitle text={task ? task.name : "Loading..."} />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <Description text={task?.description} />
          <div className={styles.taskDetails}>
            <TaskDetails text={"დავალების დეტალები"} />
          </div>
          <div className={styles.TaskComponentsWrapper}>
            <div className={styles.statusesWrapper}>
              <TaskComponents title="სტატუსი" />
              <Status
                statuses={statuses}
                onStatusSelect={handleStatusSelection}
                initialStatus={task?.status}
              />
            </div>
            <div className={styles.employeesWrapper}>
              <TaskComponents title="თანამშრომელი" />
              <div className={styles.employeeData}>
                <div>
                  <img
                    src={task?.employee?.avatar}
                    alt=""
                    className={styles.img}
                  />
                </div>
                <div className={styles.departmentAndNameWrapper}>
                  <p className={styles.departmentData}>
                    {task?.department?.name}
                  </p>
                  <p className={styles.employeeData}>
                    {task?.employee?.name} {task?.employee?.surname}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.deadlineWrapper}>
              <TaskComponents title="დავალების ვადა" />
              <p className={styles.dueDate}>
                {formatDueDateWithWeekday(task?.due_date)}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.rightSide}>
          <Comments taskId={taskId} />
        </div>
      </div>
    </div>
  );
}
