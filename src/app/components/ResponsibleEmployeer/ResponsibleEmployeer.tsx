import React, { useState, useEffect } from "react";
import styles from "./ResponsibleEmployeer.module.css";
import DropdownIcon from "../../icons/DropdownIcon";
import { EmployeeType } from "../../types";
import EmployeeList from "../EmployeeList";
import AddEmployeeButton from "../Buttons/AddEmployeeButton/AddEmployeeButton";

type Props = {
  employees: EmployeeType[];
};

function CustomDropdown({ employees }: Props) {
  const [openedId, setOpenedId] = useState(-1);
  const [selectedStatus, setSelectedStatus] = useState<EmployeeType | null>(
    null
  );

  const handleClick = (index: number) => {
    setOpenedId(index === openedId ? -1 : index);
  };

  const dropdowns = [{ checkboxes: employees }];

  return (
    <div className={styles.box}>
      <p
        className={`${styles.title} ${
          openedId !== -1 ? styles.openedTitle : ""
        }`}
      >
        პასუხისმგებელი თანამშრომელი<span>*</span>
      </p>
      <div
        className={`${styles.container} ${
          openedId !== -1 ? styles.openedContainer : ""
        }`}
      >
        <div className={styles.buttonsContainer}>
          {dropdowns.map((dropdown, index) => (
            <button
              key={index.toString()}
              onClick={() => handleClick(index)}
              className={styles.dropdownButton}
            >
              <span className={styles.selectedText}>
                {selectedStatus ? selectedStatus.name : "დასაწყები"}
              </span>
              <div style={{ rotate: openedId === index ? "180deg" : "0deg" }}>
                <DropdownIcon
                  fill={openedId === index ? "rgba(131, 56, 236, 1)" : "#000"}
                />
              </div>
            </button>
          ))}
        </div>
        {openedId !== -1 && (
          <div className={styles.dropdownContainer}>
            <AddEmployeeButton title={"დაამატე თანამშრომელი"} />
            <EmployeeList />
            {dropdowns[openedId]?.checkboxes?.map((checkbox, index) => (
              <div key={index.toString()} className={styles.statusItem}>
                <button
                  className={styles.buttonContent}
                  onClick={() => {
                    if (checkbox) {
                      setSelectedStatus(checkbox);
                      setOpenedId(-1);
                    }
                  }}
                >
                  <p>{checkbox.name}</p>
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
