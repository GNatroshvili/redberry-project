"use client";
import React, { useEffect, useRef, useState } from "react";
import EmployeeForm from "../Form";
import styles from "./EmployeeModal.module.css";
import Image from "next/image";

interface Employee {
  first_name: string;
  last_name: string;
}

const EmployeeModal = ({ onClose }: { onClose: () => void }) => {
  const [employees, setEmployees] = useState<Employee[]>([]); 
  const [departments, setDepartments] = useState([]);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const fetchData = async () => {
      try {
        const empRes = await fetch(
          "https://momentum.redberryinternship.ge/api/employees",
          {
            headers: {
              Authorization: "Bearer 9e882e2f-3297-435e-b537-67817136c385",
            },
          }
        );
        const deptRes = await fetch(
          "https://momentum.redberryinternship.ge/api/departments"
        );

        const empData = await empRes.json();
        const deptData = await deptRes.json();

        setEmployees(empData);
        setDepartments(deptData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeIconWrapper}>
          <Image
            src="/closeIcon.svg"
            alt="Close Icon"
            width={40}
            height={40}
            onClick={onClose}
          />
        </div>
        <h2 className={styles.modalTitle}>თანამშრომლის დამატება</h2>

        {employees.map(
          (
            employee: Employee,
            idx: number 
          ) => (
            <div key={idx}>
              <p>
                {employee.first_name} {employee.last_name}
              </p>
            </div>
          )
        )}

        <EmployeeForm departments={departments} />
      </div>
    </div>
  );
};

export default EmployeeModal;
