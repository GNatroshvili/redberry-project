import styles from "./Priority.module.css";
import DropdownIcon from "../../icons/DropdownIcon";
import { PriorityType } from "../../types";
import React, { useState } from "react";
import Image from "next/image"; // Import Image component from Next.js

type Props = {
  priorities: PriorityType[];
};

function CustomDropdown({ priorities }: Props) {
  const [openedId, setOpenedId] = useState(-1);

  const handleClick = (index: number) => {
    setOpenedId(index === openedId ? -1 : index);
  };

  const getIconForPriority = (priority: string) => {
    switch (priority) {
      case "დაბალი":
        return "/Low.svg";
      case "საშუალო":
        return "/Medium.svg";
      case "მაღალი":
        return "/High.svg";
      default:
        return "/default.svg";
    }
  };

  const dropdowns = [{ label: "პრიორიტეტი", checkboxes: priorities }];

  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        {dropdowns.map((dropdown, index) => (
          <button
            key={index.toString()}
            onClick={() => {
              handleClick(index);
            }}
            className={styles.dropdownButton}
          >
            <span
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
          {dropdowns[openedId]?.checkboxes.map((checkbox, index) => (
            <div key={index.toString()} className={styles.priorityItem}>
              <button className={styles.buttonContent}>
                <Image
                  src={getIconForPriority(checkbox.name)}
                  alt={checkbox.name}
                  width={16}
                  height={18}
                />
                <p>{checkbox.name}</p>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;
