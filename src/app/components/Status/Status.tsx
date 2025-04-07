import React, { useState, useEffect } from "react";
import { StatusType } from "../../types";
import DropdownIcon from "../../icons/DropdownIcon";
import styles from "./Status.module.css";

type Props = {
  statuses: StatusType[];
  onStatusSelect?: (statusId: number) => void;
  initialStatus?: StatusType | null;
};

function CustomDropdown({ statuses, onStatusSelect, initialStatus }: Props) {
  const [openedId, setOpenedId] = useState(-1);
  const [selectedStatus, setSelectedStatus] = useState<StatusType | null>(null);

  // Set the initial selected status based on the initialStatus prop
  useEffect(() => {
    if (initialStatus && statuses.length > 0 && !selectedStatus) {
      const matched = statuses.find((s) => s.id === initialStatus.id);
      if (matched) {
        setSelectedStatus(matched);
        console.log("Initial selected status:", matched);
      }
    } else if (
      !initialStatus &&
      selectedStatus === null &&
      statuses.length > 0
    ) {
      const fallback =
        statuses.find((s) => s.name === "დასაწყები") || statuses[0];
      setSelectedStatus(fallback);
      console.log("Fallback initial status:", fallback);
    }
  }, [initialStatus, statuses, selectedStatus]);

  const handleClick = (index: number) => {
    setOpenedId(index === openedId ? -1 : index);
  };

  const handleStatusClick = (status: StatusType) => {
    setSelectedStatus(status);
    setOpenedId(-1);
    onStatusSelect?.(status.id); // Call onStatusSelect ONLY on user click
  };

  const dropdowns = [{ checkboxes: statuses }];

  return (
    <div className={styles.statusesWrapper}>
      <p
        className={`${styles.title} ${
          openedId !== -1 ? styles.openedTitle : ""
        }`}
      >
        სტატუსი<span>*</span>
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
            {dropdowns[openedId]?.checkboxes?.map((checkbox, index) => (
              <div key={index.toString()} className={styles.statusItem}>
                <button
                  className={styles.buttonContent}
                  onClick={() => handleStatusClick(checkbox)}
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
