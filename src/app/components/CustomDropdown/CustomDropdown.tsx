"use client";

import DropdownIcon from "../../icons/DropdownIcon";
import { DepartmentType, EmployeeType, PriorityType } from "../../types";
import { useState } from "react";
import CheckboxWithText from "../CheckboxWithText/CheckboxWithText";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import styles from "./CustomDropdown.module.css";
import EmployeeList from "../EmployeeList";

type Props = {
  departments: DepartmentType[];
  priorities: PriorityType[];
  employees: EmployeeType[];
};

function CustomDropdown({ departments, employees, priorities }: Props) {
  const [openedId, setOpenedId] = useState(-1);
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: boolean;
  }>({});

  const handleClick = (index: number) => {
    setOpenedId(index === openedId ? -1 : index);
  };

  const handleCheckboxChange = (name: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const dropdowns = [
    { label: "დეპარტამენტი", checkboxes: departments },
    { label: "პრიორიტეტი", checkboxes: priorities },
    { label: "თანამშრომელი", checkboxes: employees }, // Employees list
  ];

  // Get selected employees
  const selectedData = Object.keys(selectedValues).filter(
    (key) => selectedValues[key]
  );

  console.log("Selected Data:", selectedData);

  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        {dropdowns.map((dropdown, index) => (
          <button
            key={index.toString()}
            onClick={() => handleClick(index)}
            className={styles.dropdownButton}
          >
            <span
              className={styles.dropDownTitles}
              style={{
                color: openedId === index ? "rgba(131, 56, 236, 1)" : "#000",
              }}
            >
              {dropdown.label}
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
          {openedId === 2 ? (
            <EmployeeList
              selectedValues={selectedValues}
              onSelect={handleCheckboxChange}
            />
          ) : (
            dropdowns[openedId]?.checkboxes.map((checkbox, index) => (
              <CheckboxWithText
                key={index.toString()}
                text={checkbox.name}
                isChecked={selectedValues[checkbox.name] || false}
                onChange={() => handleCheckboxChange(checkbox.name)}
              />
            ))
          )}

          <div className={styles.buttonContainer}>
            <PrimaryButton
              title="არჩევა"
              onClick={() => console.log("Final Selection:", selectedData)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;
