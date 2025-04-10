// "use client";
// import "@fontsource/firago";
// import "@fontsource/firago/300.css";
// import "@fontsource/firago/300-italic.css";
// import "@fontsource/firago/400.css";
// import "@fontsource/firago/400-italic.css";
// import "@fontsource/firago/500.css";
// import "@fontsource/firago/500-italic.css";
// import "@fontsource/firago/600.css";
// import "@fontsource/firago/600-italic.css";
// import "@fontsource/firago/700.css";
// import "@fontsource/firago/700-italic.css";

// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { TaskType, StatusType } from "../../types";
// import Header from "../../components/Header/Header";
// import PageTitle from "../../components/PageTitle/PageTitle";
// import Status from "../../components/Status/Status";
// import Difficulty from "../../components/Details/Category/Difficulty/Difficulty";
// import Category from "../../components/Details/Category/Category";
// import Comments from "../../components/Comments/Comments";
// import styles from "./page.module.css";
// import Description from "../../components/Description/Description";
// import TaskDetails from "../../components/TaskDetails/TaskDetails";
// import TaskComponents from "../../components/TaskComponents/TaskComponents";

// type Color = "pink" | "orange" | "blue" | "yellow";

// export default function TaskDetailsPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [task, setTask] = useState<TaskType | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [statuses, setStatuses] = useState<StatusType[]>([]);
//   const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const taskId = typeof id === "string" ? id : "";
//   const authToken = "Bearer 9e882e2f-3297-435e-b537-67817136c385";

//   useEffect(() => {
//     async function fetchTask() {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(
//           `https://momentum.redberryinternship.ge/api/tasks/${id}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//               Authorization: authToken,
//             },
//           }
//         );
//         setTask(response.data);
//         console.log("Fetched Task Status:", response.data.status);
//       } catch (err: any) {
//         console.error("Error fetching task:", err);
//         setError("Failed to fetch task details.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (id) fetchTask();
//   }, [id]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const { data: statusesData } = await axios.get(
//           "https://momentum.redberryinternship.ge/api/statuses",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//               Authorization: authToken,
//             },
//           }
//         );
//         setStatuses(statusesData);
//       } catch (error: any) {
//         console.error("Error fetching statuses:", error);
//         setErrorMessage("Error fetching initial data.");
//       }
//     }
//     fetchData();
//   }, []);

//   const handleStatusSelection = async (statusId: number) => {
//     setSelectedStatusId(statusId);
//     console.log("Selected Status ID in Parent:", statusId);
//     try {
//       const response = await axios.put(
//         `https://momentum.redberryinternship.ge/api/tasks/${taskId}`,
//         {
//           status_id: statusId,
//           name: task?.name,
//           description: task?.description,
//           due_date: task?.due_date,
//           priority_id: task?.priority?.id,
//           employee_id: task?.employee?.id,
//           department_id: task?.department?.id,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: authToken,
//           },
//         }
//       );
//       console.log("Update Task Response (PUT):", response);
//       if (response.status === 200) {
//         setTask((prevTask) =>
//           prevTask
//             ? { ...prevTask, status: statuses.find((s) => s.id === statusId) }
//             : null
//         );
//         console.log("Task status updated successfully on the server.");
//       } else {
//         console.error(
//           "Failed to update task status (PUT):",
//           response.status,
//           response.data
//         );
//         setErrorMessage(
//           `Failed to update task status (PUT): ${response.status}`
//         );
//       }
//     } catch (error: any) {
//       console.error("Error updating task status (PUT):", error);
//       setErrorMessage(`Failed to update task status (PUT): ${error.message}`);
//     }
//   };

//   const getStatusColor = (statusName: string | undefined) => {
//     switch (statusName) {
//       case "მაღალი":
//         return "red";
//       case "საშუალო":
//         return "orange";
//       case "დაბალი":
//         return "green";
//       default:
//         return "orange";
//     }
//   };

//   const getCategoryName = (CategoryName: string | undefined) => {
//     if (CategoryName === "დიზაინერების დეპარტამენტი") return "დიზაინი";
//     if (CategoryName === "გაყიდვები და მარკეტინგის დეპარტამენტი")
//       return "მარკეტინგი";
//     if (CategoryName === "ლოჯოსტიკის დეპარტამენტი") return "ლოჯისტიკა";
//     if (CategoryName === "ტექნოლოგიების დეპარტამენტი") return "ინფ. ტექ";
//     if (CategoryName === "ადმინისტრაციის დეპარტამენტი") return "ადმინისტრაცია";
//     if (CategoryName === "ადამიანური რესურსების დეპარტამენტი") return "HR";
//     if (CategoryName === "ფინანსების დეპარტამენტი") return "ფინანსები";
//     if (CategoryName === "მედიის დეპარტამენტი") return "მედია";
//     return undefined;
//   };

//   const getCategoryColor = (CategoryName: string | undefined): Color => {
//     if (CategoryName === "დიზაინერების დეპარტამენტი") return "pink";
//     if (CategoryName === "ლოჯოსტიკის დეპარტამენტი") return "blue";
//     if (CategoryName === "გაყიდვები და მარკეტინგის დეპარტამენტი")
//       return "orange";
//     if (CategoryName === "ტექნოლოგიების დეპარტამენტი") return "yellow";
//     if (CategoryName === "ადმინისტრაციის დეპარტამენტი") return "pink";
//     if (CategoryName === "ადამიანური რესურსების დეპარტამენტი") return "blue";
//     if (CategoryName === "ფინანსების დეპარტამენტი") return "orange";
//     if (CategoryName === "მედიის დეპარტამენტი") return "yellow";
//     return "orange";
//   };

//   const formatDueDateWithWeekday = (date: string | undefined) => {
//     if (!date) return "N/A";
//     const weekdays = ["კვი", "ორშ", "სამშ", "ოთხშ", "ხუთშ", "პარ", "შაბ"];
//     const dueDate = new Date(date);
//     const weekdayName = weekdays[dueDate.getDay()];
//     const options: Intl.DateTimeFormatOptions = {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     };
//     const formattedDate = dueDate.toLocaleDateString("en-GB", options);
//     return `${weekdayName} - ${formattedDate}`;
//   };

//   return (
//     <div>
//       <Header />
//       <div className={styles.tags}>
//         {task && (
//           <Difficulty
//             size="big"
//             color={getStatusColor(task.priority?.name)}
//             text={task.priority?.name}
//           />
//         )}
//         <Category
//           title={getCategoryName(task?.department?.name) || "N/A"}
//           color={getCategoryColor(task?.department?.name)}
//         />
//       </div>
//       <div className={styles.mainContent}>
//         <div className={styles.leftSide}>
//           <PageTitle text={task ? task.name : "Loading..."} />
//           {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//           <Description text={task?.description} />
//           <div className={styles.taskDetails}>
//             <TaskDetails text={"დავალების დეტალები"} />
//           </div>
//           <div className={styles.TaskComponentsWrapper}>
//             <div className={styles.statusesWrapper}>
//               <TaskComponents title="სტატუსი" />
//               <div className={styles.statusField}>
//                 <Status
//                   statuses={statuses}
//                   onStatusSelect={handleStatusSelection}
//                   initialStatus={task?.status ?? null}
//                   departmentName={task?.department?.name}
//                 />
//               </div>
//             </div>
//             <div className={styles.employeesWrapper}>
//               <TaskComponents title="თანამშრომელი" />
//               <div className={styles.employeeData}>
//                 <div>
//                   <img
//                     src={task?.employee?.avatar}
//                     alt=""
//                     className={styles.img}
//                   />
//                 </div>
//                 <div className={styles.departmentAndNameWrapper}>
//                   <p className={styles.departmentData}>
//                     {task?.department?.name}
//                   </p>
//                   <p className={styles.employeeData}>
//                     {task?.employee?.name} {task?.employee?.surname}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className={styles.deadlineWrapper}>
//               <TaskComponents title="დავალების ვადა" />
//               <p className={styles.dueDate}>
//                 {formatDueDateWithWeekday(task?.due_date)}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className={styles.rightSide}>
//           <Comments taskId={taskId} />
//         </div>
//       </div>
//     </div>
//   );
// }

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

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
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
  const router = useRouter();
  const [task, setTask] = useState<TaskType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<StatusType[]>([]);
  const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const taskId = typeof id === "string" ? id : "";
  const authToken = "Bearer 9e882e2f-3297-435e-b537-67817136c385";

  const taskFetchedRef = useRef(false);
  const statusFetchedRef = useRef(false);

  useEffect(() => {
    if (taskFetchedRef.current || !id) return;
    taskFetchedRef.current = true;

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
              Authorization: authToken,
            },
          }
        );
        setTask(response.data);
        console.log("Fetched Task Status:", response.data.status);
      } catch (err: any) {
        console.error("Error fetching task:", err);
        setError("Failed to fetch task details.");
      } finally {
        setLoading(false);
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
          "https://momentum.redberryinternship.ge/api/statuses",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: authToken,
            },
          }
        );
        setStatuses(statusesData);
      } catch (error: any) {
        console.error("Error fetching statuses:", error);
        setErrorMessage("Error fetching initial data.");
      }
    }

    fetchStatuses();
  }, []);

  const handleStatusSelection = async (statusId: number) => {
    setSelectedStatusId(statusId);
    console.log("Selected Status ID in Parent:", statusId);
    try {
      const response = await axios.put(
        `https://momentum.redberryinternship.ge/api/tasks/${taskId}`,
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
            Authorization: authToken,
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
        console.log("Task status updated successfully on the server.");
      } else {
        console.error("Failed to update task status (PUT):", response.status);
        setErrorMessage(
          `Failed to update task status (PUT): ${response.status}`
        );
      }
    } catch (error: any) {
      console.error("Error updating task status (PUT):", error);
      setErrorMessage(`Failed to update task status (PUT): ${error.message}`);
    }
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

  const getCategoryName = (CategoryName: string | undefined) => {
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
