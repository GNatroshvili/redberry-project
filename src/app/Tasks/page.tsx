"use client";

import React, { useState, useEffect } from "react";
import { PriorityType, DepartmentType, StatusType } from "../types";
import api from "../api";
import Priority from "../components/Priority/Priority";
import Status from "../components/Status/Status";
import DepartmentsList from "../components/Departments/Departments";
export default function Home() {
  const [priorities, setPriorities] = useState<PriorityType[]>([]);
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [statuses, setstatuses] = useState<StatusType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: prioritiesData } = await api.get("/api/priorities");
        const { data: departmentsData } = await api.get("/api/departments");
        const { data: statusesData } = await api.get("/api/statuses");

        setPriorities(prioritiesData);
        setDepartments(departmentsData);
        setstatuses(statusesData)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Priority priorities={priorities} />
      <Status statuses={statuses}/>
    </>
  );
}
