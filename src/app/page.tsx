"use client";
import { useEffect, useState } from "react";
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
    let ignore = false;
    const controller = new AbortController();

    async function fetchData() {
      try {
        const [prioritiesRes, departmentsRes, employeesRes] =
          await Promise.all([
            api.get("/api/priorities", { signal: controller.signal }),
            api.get("/api/departments", { signal: controller.signal }),
            api.get("/api/employees", { signal: controller.signal }),
          ]);

        if (!ignore) {
          setPriorities(prioritiesRes.data);
          setDepartments(departmentsRes.data);
          setEmployees(employeesRes.data);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Error fetching data:", error);
        }
      }
    }

    fetchData();

    return () => {
      ignore = true;
      controller.abort();
    };
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
