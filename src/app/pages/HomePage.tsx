"use client";
import CustomDropdown from "../components/CustomDropdown/CustomDropdown";
import { DepartmentType, EmployeeType, PriorityType, TaskType } from "../types";
import Condition from "../components/Condition/Condition";
import styles from "./HomePage.module.css";
import TaskCard from "../components/TaskCard/TaskCard";
import React, { useState, useEffect } from "react";
import EmployeeName from "../components/EmployeeName/EmployeeName";
import axios from "axios";

type Props = {
  departments: DepartmentType[];
  priorities: PriorityType[];
  employees: EmployeeType[];
};

function HomePage({ departments, priorities, employees }: Props) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const tasksByStatus = {
    1: [],
    2: [],
    3: [],
    4: [],
  };

  tasks.forEach((task) => {
    if (task.status?.id && tasksByStatus[task.status.id]) {
      tasksByStatus[task.status.id].push(task);
    }
  });

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://momentum.redberryinternship.ge/api/tasks",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${"9e882e2f-3297-435e-b537-67817136c385"}`,
            },
          }
        );

        console.log("API Response:", response.data);
        console.log(Array.isArray(response.data));

        if (response.data && Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          setError("Invalid data format received from the API.");
        }
      } catch (err: any) {
        console.error("Error fetching tasks:", err);
        setError(err.message || "Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  console.log(departments, priorities, employees);
  console.log("Tasks state in HomePage:", tasks);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          maxWidth: "1680px",
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          <CustomDropdown
            departments={departments}
            priorities={priorities}
            employees={employees}
          />
        </div>
        <EmployeeName name={"hello"} />
        <div className={styles.conditionWrapper}>
          <Condition title={"დასაწყები"} color={"yellow"} />
          <Condition title={"პროგრესში"} color={"orange"} />
          <Condition title={"მზად ტესტირებისთვის"} color={"pink"} />
          <Condition title={"დასრულებული"} color={"blue"} />
        </div>
        <div className={styles.taskCardsContainer}>
          <div className={styles.taskLine}>
            {loading && <p>Loading tasks...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {!loading &&
              !error &&
              tasksByStatus[1].map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            {!loading &&
              !error &&
              tasksByStatus[1].length === 0 &&
              tasks.length > 0 && <p>No tasks in "დასაწყები"</p>}
          </div>
          <div className={styles.taskLine}>
            {!loading &&
              !error &&
              tasksByStatus[2].map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            {!loading &&
              !error &&
              tasksByStatus[2].length === 0 &&
              tasks.length > 0 && <p>No tasks in "პროგრესში"</p>}
          </div>
          <div className={styles.taskLine}>
            {!loading &&
              !error &&
              tasksByStatus[3].map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            {!loading &&
              !error &&
              tasksByStatus[3].length === 0 &&
              tasks.length > 0 && <p>No tasks in "მზად ტესტირებისთვის"</p>}
          </div>
          <div className={styles.taskLine}>
            {!loading &&
              !error &&
              tasksByStatus[4].map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            {!loading &&
              !error &&
              tasksByStatus[4].length === 0 &&
              tasks.length > 0 && <p>No tasks in "დასრულებული"</p>}
          </div>
          {!loading && !error && tasks.length === 0 && <p>No tasks found.</p>}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
