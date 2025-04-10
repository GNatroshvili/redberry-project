"use client";
import styles from "./EmployeeName.module.css";
import React from "react";

type SelectedFilter = {
  id: number;
  name: string;
  type: "department" | "priority" | "employee";
};

type Props = {
  selectedFilters: SelectedFilter[];
  onRemoveFilter: (
    id: number,
    type: "department" | "priority" | "employee"
  ) => void;
};

const EmployeeName = ({ selectedFilters, onRemoveFilter }: Props) => {
  // console.log("Selected filters:", selectedFilters);
  return (
    <div className={styles.filtersContainer}>
      {selectedFilters.map((filter) => (
        <div
          key={`${filter.type}-${filter.id}`}
          className={styles.filterWrapper}
        >
          <p className={styles.name}>
            {filter.type === "employee" ? filter.id : filter.name}
          </p>
          <img
            src="/delete-icon.svg"
            alt="delete-icon"
            onClick={() => onRemoveFilter(filter.id, filter.type)}
            className={styles.deleteIcon}
          />
        </div>
      ))}
    </div>
  );
};

export default EmployeeName;
