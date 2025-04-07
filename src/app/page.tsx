// "use client";
// import "@fontsource/firago";
// import "@fontsource/firago/400.css";
// import "@fontsource/firago/400-italic.css";
// import "@fontsource/firago/500.css";
// import "@fontsource/firago/500-italic.css";
// import "@fontsource/firago/700.css";
// import "@fontsource/firago/700-italic.css";
// import styles from "./page.module.css";
// import Header from "./components/Header/Header";
// import HomePage from "./pages/HomePage";
// import api from "./api";
// import { DepartmentType, EmployeeType, PriorityType } from "./types";
// import CustomDropdown from "./components/CustomDropdown/CustomDropdown";
// import ResponseButton from "./components/Buttons/ResponseButton/Button";
// import Category from "./components/Details/Category/Category";
// import PrimaryButton from "./components/Buttons/PrimaryButton/PrimaryButton";
// import Condition from "./components/Condition/Condition";
// import EmployeeName from "./components/EmployeeName/EmployeeName";
// import AddEmployeeButton from "./components/Buttons/AddEmployeeButton/AddEmployeeButton";
// import Difficulty from "./components/Details/Category/Difficulty/Difficulty";
// import CustomCheckbox from "./components/CustomCheckbox/CustomCheckbox";
// import CheckboxWithText from "./components/CheckboxWithText/CheckboxWithText";
// import Comments from "./components/Comments/Comments";
// import DatePicker from "./components/CustomCalendar/CustomCalendar";
// import TaskCard from "./components/TaskCard/TaskCard";

// export default async function Home() {
//   const { data: priorities }: { data: PriorityType[] } = await api.get(
//     "/priorities"
//   );
//   const { data: departments }: { data: DepartmentType[] } = await api.get(
//     "/departments"
//   );

//   const { data: employees }: { data: EmployeeType[] } = await api.get(
//     "/employees"
//   );

//   return (
//     <>
//       <Header />
//       <HomePage
//         departments={departments}
//         priorities={priorities}
//         employees={employees}
//       />
//       <CustomDropdown
//         departments={departments}
//         priorities={priorities}
//         employees={employees}
//       />
//       <ResponseButton title={"უპასუხე"} />
//       <Category title={"დიზაინი"} color={"orange"} />
//       <PrimaryButton title={"არჩევა"} />
//       <Condition title={"დასაწყები"} color={"blue"} />
//       <EmployeeName name={"სატოში ნაკამოტო"} />
//       <AddEmployeeButton title={"დაამატე თანამშრომელი"} />
//       <Difficulty size="big" color="red" />
//       <Difficulty size="big" color="green" />
//       <Difficulty size="small" color="orange" />
//       <CustomCheckbox color={"purple"} handleChange={() => {}} />
//       <CheckboxWithText
//         color={"blue"}
//         text={"მარკეტინგის დეპარტამენტი"}
//         hasImage={true}
//       />
//       <CheckboxWithText
//         color={"orange"}
//         text={"მარკეტინგის დეპარტამენტი"}
//         hasImage={false}
//       />
//       <CheckboxWithText
//         color={"pink"}
//         text={"მარკეტინგის დეპარტამენტი"}
//         hasImage={false}
//       />
//       <CheckboxWithText text={"მარკეტინგის დეპარტამენტი"} hasImage={false} />
//       <CheckboxWithText
//         color={"yellow"}
//         text={"მარკეტინგის დეპარტამენტი"}
//         hasImage={false}
//       />
//       <DatePicker />
//       <Comments />
//       <TaskCard color="yellow" />
//     </>
//   );
// }

"use client";
import { useEffect, useState } from "react";
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
import styles from "./page.module.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import api from "./api";
import { DepartmentType, EmployeeType, PriorityType, StatusType } from "./types";
import PageTitle from "./components/PageTitle/PageTitle";

export default function Home() {
  const [priorities, setPriorities] = useState<PriorityType[]>([]);
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: prioritiesData } = await api.get("/api/priorities");
        const { data: departmentsData } = await api.get("/api/departments");
        const { data: employeesData } = await api.get("/api/employees");

        setPriorities(prioritiesData);
        setDepartments(departmentsData);
        setEmployees(employeesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <PageTitle text={"დავალებების გვერდი"}/>
      <HomePage
        departments={departments}
        priorities={priorities}
        employees={employees}
      />
      
    </>
  );
}
