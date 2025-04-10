import React, { useState, useEffect } from "react";
import DropdownIcon from "../../icons/DropdownIcon";
import styles from "./Departments.module.css";
import { DepartmentType } from "../../types";

type Props = {
  departments: DepartmentType[];
  onDepartmentSelect?: (department: DepartmentType) => void;
  value?: number;
  size?: "small" | "medium" | "large" | string;
};

function CustomDropdown({ departments, onDepartmentSelect, value, size }: Props) {
  const [openedId, setOpenedId] = useState(-1);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentType | null>(null);

  useEffect(() => {
    let ignore = false;
    
    if (!departments?.length || selectedDepartment) return;
    
    const defaultDepartment = departments.find(d => d.id === value) || 
                            departments.find(d => d.name === "საშუალო") || 
                            departments[0];
    
    if (!ignore && defaultDepartment) {
      setSelectedDepartment(defaultDepartment);
      onDepartmentSelect?.(defaultDepartment);
    }

    return () => {
      ignore = true;
    };
  }, [departments, onDepartmentSelect, value, selectedDepartment]);

  const handleClick = (index: number) => {
    setOpenedId(prev => prev === index ? -1 : index);
  };

  const handleDepartmentClick = (department: DepartmentType) => {
    if (department.id === selectedDepartment?.id) return;
    setSelectedDepartment(department);
    setOpenedId(-1);
    onDepartmentSelect?.(department);
  };

  const getSizeClass = () => {
    if (size === "small") return styles.small;
    if (size === "medium") return styles.medium;
    if (size === "large") return styles.large;
    return "";
  };

  const customSizeStyle = typeof size === "string" && !["small", "medium", "large"].includes(size)
    ? { width: size }
    : undefined;

  return (
    <div className={styles.departmentsWrapper}>
      <p className={`${styles.title} ${openedId !== -1 ? styles.openedTitle : ""}`}>
        დეპარტამენტი<span>*</span>
      </p>
      <div
        className={`${styles.container} ${getSizeClass()} ${openedId !== -1 ? styles.openedContainer : ""}`}
        style={customSizeStyle}
      >
        <div className={styles.buttonsContainer}>
          <button
            onClick={() => handleClick(0)}
            className={styles.dropdownButton}
            type="button"
          >
            <div className={styles.buttonContent}>
              {selectedDepartment && <span>{selectedDepartment.name}</span>}
            </div>
            <div style={{ rotate: openedId === 0 ? "180deg" : "0deg" }}>
              <DropdownIcon
                fill={openedId === 0 ? "rgba(131, 56, 236, 1)" : "#000"}
              />
            </div>
          </button>
        </div>
        {openedId !== -1 && (
          <div className={styles.dropdownContainer}>
            {departments.map((department) => (
              <div key={department.id} className={styles.statusItem}>
                <button
                  className={styles.buttonContent}
                  onClick={() => handleDepartmentClick(department)}
                  type="button"
                >
                  <p>{department.name}</p>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomDropdown;