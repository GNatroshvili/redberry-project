"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import axios, { AxiosError } from "axios";
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
import {
  AUTH_TOKEN,

  getCategoryName,
  getCategoryColor,
  getPriorityColor,
  formatDueDateWithWeekday,
} from "../../constants";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const [task, setTask] = useState<TaskType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const taskId = typeof id === "string" ? id : "";
  const [statuses, setStatuses] = useState<StatusType[]>([]);

  const taskFetchedRef = useRef(false);
  const statusFetchedRef = useRef(false);

  useEffect(() => {
    if (taskFetchedRef.current || !id) return;
    taskFetchedRef.current = true;

    async function fetchTask() {
      try {
        const response = await axios.get(
          `/api/tasks/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: AUTH_TOKEN,
            },
          }
        );
        setTask(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError;
          console.error("Error fetching task:", axiosError);
          setErrorMessage("Failed to fetch task details.");
        } else {
          console.error("An unexpected error occurred:", err);
          setErrorMessage("An unexpected error occurred.");
        }
      }
    }

    fetchTask();
  }, [id]);

  useEffect(() => {
    if (statusFetchedRef.current) return;
    statusFetchedRef.current = true;

    async function fetchStatuses() {
      try {
        const { data: statusesData } = await axios.get(
          `/api/statuses`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: AUTH_TOKEN,
            },
          }
        );
        setStatuses(statusesData);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.error("Error fetching statuses:", axiosError);
          setErrorMessage("Error fetching initial data.");
        } else {
          console.error("An unexpected error occurred:", error);
          setErrorMessage("An unexpected error occurred.");
        }
      }
    }

    fetchStatuses();
  }, []);

  const handleStatusSelection = useCallback(async (statusId: number) => {
    try {
      const response = await axios.put(
        `/api/tasks/${taskId}`,
        {
          status_id: statusId,
          name: task?.name,
          description: task?.description,
          due_date: task?.due_date,
          priority_id: task?.priority?.id,
          employee_id: task?.employee?.id,
          department_id: task?.department?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: AUTH_TOKEN,
          },
        }
      );
      console.log("Update Task Response (PUT):", response);
      if (response.status === 200) {
        setTask((prevTask) =>
          prevTask
            ? { ...prevTask, status: statuses.find((s) => s.id === statusId) }
            : null
        );
      } else {
        setErrorMessage(
          `Failed to update task status (PUT): ${response.status}`
        );
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Error updating task status (PUT):", axiosError);
        setErrorMessage(
          `Failed to update task status (PUT): ${axiosError.message}`
        );
      } else {
        console.error("An unexpected error occurred:", error);
        setErrorMessage("An unexpected error occurred.");
      }
    }
  }, [taskId, task, statuses]);

  return (
    <div>
      <Header />
      <div className={styles.tags}>
        {task && (
          <Difficulty
            size="big"
            color={getPriorityColor(task.priority?.name) || "orange"}
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
          <Description text={task?.description || ""} />
          <div className={styles.taskDetails}>
            <TaskDetails text={"დავალების დეტალები"} />
          </div>
          <div className={styles.TaskComponentsWrapper}>
            <div className={styles.statusesWrapper}>
              <TaskComponents title="სტატუსი" />
              <div className={styles.statusField}>
                <Status
                  statuses={statuses}
                  onStatusSelect={handleStatusSelection}
                  initialStatus={task?.status ?? null}
                  departmentName={task?.department?.name}
                />
              </div>
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
