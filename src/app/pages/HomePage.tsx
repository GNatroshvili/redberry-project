// HomePage.tsx
"use client";
import CustomDropdown from "../components/CustomDropdown/CustomDropdown";
import { DepartmentType, EmployeeType, PriorityType, TaskType } from "../types";
import Condition from "../components/Condition/Condition";
import styles from "./HomePage.module.css";
import TaskCard from "../components/TaskCard/TaskCard";
import React, { useState, useEffect } from "react";
import EmployeeName from "../components/EmployeeName/EmployeeName";
import axios from "axios";

type SelectedFilter = {
  id: number;
  name: string;
  type: "department" | "priority" | "employee";
};

type Props = {
  departments: DepartmentType[];
  priorities: PriorityType[];
  employees: EmployeeType[];
};

function HomePage({ departments, priorities, employees }: Props) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<number[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);
  const authToken = "Bearer 9e882e2f-3297-435e-b537-67817136c385"; // Store your token securely

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://momentum.redberryinternship.ge/api/tasks",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: authToken,
          },
        }
      );

      if (response.data && Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        console.error("Unexpected API response format:", response.data);
        setError("Received unexpected data format from the server");
      }
    } catch (err: any) {
      console.error("Error fetching tasks:", err);
      setError(err.message || "Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();

    // Re-fetch tasks when returning to this tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchTasks();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const handleRemoveFilter = (
    id: number,
    type: "department" | "priority" | "employee"
  ) => {
    switch (type) {
      case "department":
        setSelectedDepartments((prev) => prev.filter((item) => item !== id));
        break;
      case "priority":
        setSelectedPriorities((prev) => prev.filter((item) => item !== id));
        break;
      case "employee":
        setSelectedEmployees((prev) => prev.filter((item) => item !== id));
        break;
    }

    setSelectedFilters((prev) =>
      prev.filter((f) => f.id !== id || f.type !== type)
    );
  };

  const handleFilterApply = (
    type: "department" | "priority" | "employee",
    ids: number[]
  ) => {
    const getName = (id: number): string => {
      if (type === "department") {
        return departments.find((d) => d.id === id)?.name || "";
      } else if (type === "priority") {
        return priorities.find((p) => p.id === id)?.name || "";
      } else {
        const emp = employees.find((e) => e.id === id);
        return emp ? `${emp.name} ${emp.surname}` : "";
      }
    };

    setSelectedFilters((prev) => {
      const otherFilters = prev.filter((f) => f.type !== type);
      const newFilters = ids.map((id) => ({
        id,
        name: getName(id),
        type,
      }));
      return [...otherFilters, ...newFilters];
    });

    switch (type) {
      case "department":
        setSelectedDepartments(ids);
        break;
      case "priority":
        setSelectedPriorities(ids);
        break;
      case "employee":
        setSelectedEmployees(ids);
        break;
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const departmentMatch =
      selectedDepartments.length === 0 ||
      (task.department?.id && selectedDepartments.includes(task.department.id));
    const priorityMatch =
      selectedPriorities.length === 0 ||
      (task.priority?.id && selectedPriorities.includes(task.priority.id));
    const employeeMatch =
      selectedEmployees.length === 0 ||
      (task.employee?.id && selectedEmployees.includes(task.employee.id));
    return departmentMatch && priorityMatch && employeeMatch;
  });

  interface TasksByStatus {
    [key: string]: TaskType[];
  }

  const tasksByStatus = {
    "1": filteredTasks.filter((task) => task.status?.id === 1),
    "2": filteredTasks.filter((task) => task.status?.id === 2),
    "3": filteredTasks.filter((task) => task.status?.id === 3),
    "4": filteredTasks.filter((task) => task.status?.id === 4),
  } as TasksByStatus;

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
            selectedDepartments={selectedDepartments}
            selectedPriorities={selectedPriorities}
            selectedEmployees={selectedEmployees}
            onFilterApply={handleFilterApply}
          />
        </div>

        <EmployeeName
          selectedFilters={selectedFilters}
          onRemoveFilter={handleRemoveFilter}
        />

        <div className={styles.conditionWrapper}>
          <Condition
            title={"დასაწყები"}
            color={"yellow"}
            count={tasksByStatus[1].length}
          />
          <Condition
            title={"პროგრესში"}
            color={"orange"}
            count={tasksByStatus[2].length}
          />
          <Condition
            title={"მზად ტესტირებისთვის"}
            color={"pink"}
            count={tasksByStatus[3].length}
          />
          <Condition
            title={"დასრულებული"}
            color={"blue"}
            count={tasksByStatus[4].length}
          />
        </div>

        <div className={styles.taskCardsContainer}>
          {loading ? (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <p>Loading tasks...</p>
            </div>
          ) : error ? (
            <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
              <p>Error: {error}</p>
            </div>
          ) : (
            <>
              {[1, 2, 3, 4].map((statusId) => {
                const statusKey: string = `${statusId}`;
                return (
                  <div key={statusId} className={styles.taskLine}>
                    {tasksByStatus[statusKey]?.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                    {tasksByStatus[statusKey]?.length === 0 &&
                      filteredTasks.length > 0 && (
                        <p className={styles.noTasks}>
                          No tasks in this status
                        </p>
                      )}
                  </div>
                );
              })}
              {filteredTasks.length === 0 && !loading && !error && (
                <p>No tasks found matching the criteria.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
