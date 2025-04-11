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
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import api from "./api";
import { DepartmentType, EmployeeType, PriorityType } from "./types";
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
      <PageTitle text={"დავალებების გვერდი"} />
      <HomePage
        departments={departments}
        priorities={priorities}
        employees={employees}
      />
    </>
  );
}
