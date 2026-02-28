"use client";
import React, { useEffect, useRef, useState } from "react";
import EmployeeForm from "../Form";
import styles from "./EmployeeModal.module.css";
import Image from "next/image";
import { DepartmentType } from "../../types";
import { AUTH_TOKEN } from "../../constants";

const EmployeeModal = ({ onClose }: { onClose: () => void }) => {
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const fetchData = async () => {
      try {
        const deptRes = await fetch(
          "/api/departments"
        );
        const deptData = await deptRes.json();
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
        <EmployeeForm departments={departments} />
      </div>
    </div>
  );
};

export default EmployeeModal;
