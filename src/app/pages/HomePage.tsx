"use client";
import CustomDropdown from "../components/CustomDropdown/CustomDropdown";
import { DepartmentType, EmployeeType, PriorityType, TaskType } from "../types";
import Condition from "../components/Condition/Condition";
import styles from "./HomePage.module.css";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import EmployeeName from "../components/EmployeeName/EmployeeName";
import TaskCard from "../components/TaskCard/TaskCard";
import api from "../api";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  TouchSensor,
  KeyboardSensor,
  DragOverlay,
  DragStartEvent,
  rectIntersection,
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
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<number[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);

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
    }),
  );

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/api/tasks");

      if (response.data && Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        console.error("Unexpected API response format:", response.data);
        setError("Received unexpected data format from the server");
      }
    } catch (err: unknown) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    const task = active.data.current?.task as TaskType;
    setActiveTask(task);
  }, []);

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatusId = parseInt(over.id as string);
    const task = active.data.current?.task as TaskType;

    if (task.status?.id === newStatusId) return;

    // Optimistic update
    setTasks((prev) =>
      prev.map((t) =>
        t.id.toString() === taskId
          ? { ...t, status: { id: newStatusId, name: "" }, status_id: newStatusId }
          : t
      )
    );

    try {
      await api.put(`/api/tasks/${taskId}`, {
        status_id: newStatusId,
        name: task.name,
        description: task.description,
        due_date: task.due_date,
        priority_id: task.priority?.id || task.priority_id,
        employee_id: task.employee?.id || task.employee_id,
        department_id: task.department?.id || task.department_id,
      });
    } catch (err) {
      console.error("Failed to update task status:", err);
      // Revert if failed
      fetchTasks();
    }
  }, [fetchTasks]);

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

  const handleRemoveFilter = useCallback(
    (id: number, type: "department" | "priority" | "employee") => {
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
        prev.filter((f) => f.id !== id || f.type !== type),
      );
    },
    [],
  );

  const handleFilterApply = useCallback(
    (type: "department" | "priority" | "employee", ids: number[]) => {
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
  }, [departments, priorities, employees]);

  const handleClearAllFilters = useCallback(() => {
    setSelectedDepartments([]);
    setSelectedPriorities([]);
    setSelectedEmployees([]);
    setSelectedFilters([]);
  }, []);

  const filteredTasks = useMemo(() => tasks.filter((task) => {
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
  }), [tasks, selectedDepartments, selectedPriorities, selectedEmployees]);

  const tasksByStatus = useMemo(() => {
    const grouped: Record<string, TaskType[]> = {
      "1": filteredTasks.filter((task) => task.status?.id === 1),
      "2": filteredTasks.filter((task) => task.status?.id === 2),
      "3": filteredTasks.filter((task) => task.status?.id === 3),
      "4": filteredTasks.filter((task) => task.status?.id === 4),
    };
    return grouped;
  }, [filteredTasks]);

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
          collisionDetection={rectIntersection}
          onDragStart={handleDragStart}
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
                        <p className={styles.noTasks}>
                          ამ სტატუსით დავალება არ არის
                        </p>
                      )}
                    </DroppableColumn>
                  </div>
                ))}
              </div>
              <DragOverlay dropAnimation={null}>
                {activeTask ? (
                  <div
                    style={{ transform: "rotate(2deg)", cursor: "grabbing" }}
                  >
                    <TaskCard task={activeTask} disableNavigation />
                  </div>
                ) : null}
              </DragOverlay>

              {loading && (
                <div style={{ padding: "20px", textAlign: "center" }}>
                  <p>იტვირთება...</p>
                </div>
              )}
              {error && (
                <div
                  style={{ padding: "20px", textAlign: "center", color: "red" }}
                >
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
