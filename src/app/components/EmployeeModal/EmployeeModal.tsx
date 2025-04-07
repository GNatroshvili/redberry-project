// components/EmployeeModal.tsx
"use client";
import React, { useEffect, useState } from "react";
import EmployeeForm from "../Form";
import styles from "./EmployeeModal.module.css";
import Image from "next/image";

const EmployeeModal = ({ onClose }: { onClose: () => void }) => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.closeIconWrapper}>
          <Image
            src="/closeIcon.svg"
            alt="Example Image"
            width={40}
            height={40}
            onClick={onClose}
          />
        </div>
        <h2 className={styles.modalTitle}>თანამშრომლის დამატება</h2>
         {employees.map((employee: any, idx: number) => (
          <div key={idx}>
            <p>
              {employee.first_name} {employee.last_name}
            </p>
          </div>
        ))} 
          <EmployeeForm departments={departments} />
      </div>
    </div>
  );
};

export default EmployeeModal;
