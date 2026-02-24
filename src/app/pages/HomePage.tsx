"use client";
import CustomDropdown from "../components/CustomDropdown/CustomDropdown";
import { DepartmentType, EmployeeType, PriorityType, TaskType } from "../types";
import Condition from "../components/Condition/Condition";
import styles from "./HomePage.module.css";
import TaskCard from "../components/TaskCard/TaskCard";
import React, { useState, useEffect } from "react";
import EmployeeName from "../components/EmployeeName/EmployeeName";
import axios, { AxiosError } from "axios";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  closestCorners,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import DraggableTaskCard from "../components/TaskCard/DraggableTaskCard";
import DroppableColumn from "../components/DroppableColumn";

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
  const authToken = "Bearer 9e882e2f-3297-435e-b537-67817136c385";

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        console.error("Error fetching tasks:", axiosError);
        setError(axiosError.message || "Failed to fetch tasks. Please try again.");
      } else if (err instanceof Error) {
        console.error("Error fetching tasks:", err);
        setError(err.message || "Failed to fetch tasks. Please try again.");
      } else {
        console.error("An unknown error occurred:", err);
        setError("An unknown error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatusId = parseInt(over.id as string);
    const task = active.data.current?.task as TaskType;

    if (task.status?.id === newStatusId) return;

    // Optimistic update
    const updatedTasks = tasks.map((t) => {
      if (t.id.toString() === taskId) {
        return {
          ...t,
          status: { id: newStatusId, name: "" }, // Name doesn't matter for local filter
          status_id: newStatusId,
        };
      }
      return t;
    });
    setTasks(updatedTasks);

    try {
      await axios.put(
        `https://momentum.redberryinternship.ge/api/tasks/${taskId}`,
        {
          status_id: newStatusId,
          name: task.name,
          description: task.description,
          due_date: task.due_date,
          priority_id: task.priority?.id || task.priority_id,
          employee_id: task.employee?.id || task.employee_id,
          department_id: task.department?.id || task.department_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: authToken,
          },
        }
      );
      console.log("Task status updated successfully");
    } catch (err) {
      console.error("Failed to update task status:", err);
      // Revert if failed
      fetchTasks();
    }
  };

  useEffect(() => {
    fetchTasks();

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

  const handleClearAllFilters = () => {
    setSelectedDepartments([]);
    setSelectedPriorities([]);
    setSelectedEmployees([]);
    setSelectedFilters([]);
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

  const statusInfo = [
    { id: 1, title: "დასაწყები", color: "yellow" as const },
    { id: 2, title: "პროგრესში", color: "orange" as const },
    { id: 3, title: "მზად ტესტირებისთვის", color: "pink" as const },
    { id: 4, title: "დასრულებული", color: "blue" as const },
  ];

  return (
    <div className={styles.homePageWrapper}>
      <div className={styles.container}>
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
        {selectedFilters.length > 0 && (
          <div className={styles.filtersWrapper}>
            <EmployeeName
              selectedFilters={selectedFilters}
              onRemoveFilter={handleRemoveFilter}
            />
            <button
              className={styles.deleteAllFilter}
              onClick={handleClearAllFilters}
            >
              გასუფთავება
            </button>
          </div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div className={styles.boardScrollContainer}>
            <div className={styles.boardInner}>
              <div className={styles.boardColumns}>
                {statusInfo.map((status) => (
                  <div key={status.id} className={styles.boardColumn}>
                    <Condition
                      title={status.title}
                      color={status.color}
                      count={tasksByStatus[status.id.toString()]?.length || 0}
                    />
                    <DroppableColumn
                      id={status.id.toString()}
                      className={styles.taskLine}
                    >
                      {tasksByStatus[status.id.toString()]?.map((task) => (
                        <DraggableTaskCard key={task.id} task={task} />
                      ))}
                      {tasksByStatus[status.id.toString()]?.length === 0 && (
                        <p className={styles.noTasks}>ამ სტატუსით დავალება არ არის</p>
                      )}
                    </DroppableColumn>
                  </div>
                ))}
              </div>
              {loading && (
                <div style={{ padding: "20px", textAlign: "center" }}>
                  <p>იტვირთება...</p>
                </div>
              )}
              {error && (
                <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
                  <p>Error: {error}</p>
                </div>
              )}
              {filteredTasks.length === 0 && !loading && !error && (
                <p style={{ marginTop: "20px" }}>დავალებები ვერ მოიძებნა.</p>
              )}
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  );
}

export default HomePage;
