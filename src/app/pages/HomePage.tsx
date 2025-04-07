// "use client";
// import CustomDropdown from "../components/CustomDropdown/CustomDropdown";
// import { DepartmentType, EmployeeType, PriorityType, TaskType } from "../types";
// import Condition from "../components/Condition/Condition";
// import styles from "./HomePage.module.css";
// import TaskCard from "../components/TaskCard/TaskCard";
// import React, { useState, useEffect } from "react";
// import EmployeeName from "../components/EmployeeName/EmployeeName";
// import axios from "axios";

// type Props = {
//   departments: DepartmentType[];
//   priorities: PriorityType[];
//   employees: EmployeeType[];
// };

// function HomePage({ departments, priorities, employees }: Props) {
//   const [tasks, setTasks] = useState<TaskType[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const tasksByStatus = {
//     1: [],
//     2: [],
//     3: [],
//     4: [],
//   };

//   tasks.forEach((task) => {
//     if (task.status?.id && tasksByStatus[task.status.id]) {
//       tasksByStatus[task.status.id].push(task);
//     }
//   });

//   useEffect(() => {
//     async function fetchTasks() {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(
//           "https://momentum.redberryinternship.ge/api/tasks",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//               Authorization: `Bearer ${"9e882e2f-3297-435e-b537-67817136c385"}`,
//             },
//           }
//         );

//         console.log("API Response:", response.data);
//         console.log(Array.isArray(response.data));

//         if (response.data && Array.isArray(response.data)) {
//           setTasks(response.data);
//         } else {
//           setError("Invalid data format received from the API.");
//         }
//       } catch (err: any) {
//         console.error("Error fetching tasks:", err);
//         setError(err.message || "Failed to fetch tasks.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchTasks();
//   }, []);

//   console.log(departments, priorities, employees);
//   console.log("Tasks state in HomePage:", tasks);

//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           margin: "auto",
//           maxWidth: "1680px",
//         }}
//       >
//         <div style={{ display: "flex", gap: "1rem" }}>
//           <CustomDropdown
//             departments={departments}
//             priorities={priorities}
//             employees={employees}
//           />
//         </div>
//         <EmployeeName name={"hello"} />
//         <div className={styles.conditionWrapper}>
//           <Condition title={"დასაწყები"} color={"yellow"} />
//           <Condition title={"პროგრესში"} color={"orange"} />
//           <Condition title={"მზად ტესტირებისთვის"} color={"pink"} />
//           <Condition title={"დასრულებული"} color={"blue"} />
//         </div>
//         <div className={styles.taskCardsContainer}>
//           <div className={styles.taskLine}>
//             {loading && <p>Loading tasks...</p>}
//             {error && <p style={{ color: "red" }}>Error: {error}</p>}
//             {!loading &&
//               !error &&
//               tasksByStatus[1].map((task) => (
//                 <TaskCard key={task.id} task={task} />
//               ))}
//             {!loading &&
//               !error &&
//               tasksByStatus[1].length === 0 &&
//               tasks.length > 0 && <p>No tasks in "დასაწყები"</p>}
//           </div>
//           <div className={styles.taskLine}>
//             {!loading &&
//               !error &&
//               tasksByStatus[2].map((task) => (
//                 <TaskCard key={task.id} task={task} />
//               ))}
//             {!loading &&
//               !error &&
//               tasksByStatus[2].length === 0 &&
//               tasks.length > 0 && <p>No tasks in "პროგრესში"</p>}
//           </div>
//           <div className={styles.taskLine}>
//             {!loading &&
//               !error &&
//               tasksByStatus[3].map((task) => (
//                 <TaskCard key={task.id} task={task} />
//               ))}
//             {!loading &&
//               !error &&
//               tasksByStatus[3].length === 0 &&
//               tasks.length > 0 && <p>No tasks in "მზად ტესტირებისთვის"</p>}
//           </div>
//           <div className={styles.taskLine}>
//             {!loading &&
//               !error &&
//               tasksByStatus[4].map((task) => (
//                 <TaskCard key={task.id} task={task} />
//               ))}
//             {!loading &&
//               !error &&
//               tasksByStatus[4].length === 0 &&
//               tasks.length > 0 && <p>No tasks in "დასრულებული"</p>}
//           </div>
//           {!loading && !error && tasks.length === 0 && <p>No tasks found.</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

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
              Authorization: `Bearer 9e882e2f-3297-435e-b537-67817136c385`,
            },
          }
        );

        if (response.data && Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error("Unexpected API response format:", response.data);
          setError("Received unexpected data format from the server");
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch tasks. Please try again.");
        } else {
          setError("An unexpected error occurred.");
          console.error("Unexpected error:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  const handleRemoveFilter = (
    id: number,
    type: "department" | "priority" | "employee"
  ) => {
    // Update the specific filter state
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

    // Update the selected filters display
    setSelectedFilters((prev) =>
      prev.filter((f) => f.id !== id || f.type !== type)
    );
  };

  const handleFilterApply = (
    type: "department" | "priority" | "employee",
    ids: number[]
  ) => {
    // Get names for the selected IDs
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

    // Update selected filters state
    setSelectedFilters((prev) => {
      // Remove existing filters of this type
      const otherFilters = prev.filter((f) => f.type !== type);
      // Add new filters
      const newFilters = ids.map((id) => ({
        id,
        name: getName(id),
        type,
      }));
      return [...otherFilters, ...newFilters];
    });

    // Update the existing filter state
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

  // Filter tasks based on selected criteria
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

  // Group filtered tasks by status
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

        {/* Updated EmployeeName component with filter display */}
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
