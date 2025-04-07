import React, { useState, useEffect } from "react";
import { StatusType } from "../../types";
import DropdownIcon from "../../icons/DropdownIcon";
import styles from "./Status.module.css";

type Props = {
  statuses: StatusType[];
  onStatusSelect?: (statusId: number) => void;
  initialStatus?: StatusType | null;
  title?: string;
  departmentName?: string;
};

function CustomDropdown({
  statuses,
  onStatusSelect,
  initialStatus,
  title,
  departmentName,
}: Props) {
  const [openedId, setOpenedId] = useState(-1);
  const [selectedStatus, setSelectedStatus] = useState<StatusType | null>(null);

  useEffect(() => {
    if (initialStatus && statuses.length > 0) {
      const match = statuses.find((s) => s.id === initialStatus.id);
      if (match) {
        setSelectedStatus(match);
        console.log("Set initialStatus from props:", match);
      }
    }
  }, [initialStatus?.id, statuses]);

  const handleClick = (index: number) => {
    setOpenedId(index === openedId ? -1 : index);
  };

  const handleStatusClick = (status: StatusType) => {
    setSelectedStatus(status);
    setOpenedId(-1);
    onStatusSelect?.(status.id);
  };

  return (
    <div className={styles.statusesWrapper}>
      <p
        className={`${styles.title} ${
          openedId !== -1 ? styles.openedTitle : ""
        }`}
      >
        {title}
      </p>
      <div
        className={`${styles.container} ${
          openedId !== -1 ? styles.openedContainer : ""
        }`}
      >
        <div className={styles.buttonsContainer}>
          <button
            onClick={() => handleClick(0)}
            className={styles.dropdownButton}
          >
            <span className={styles.selectedText}>
              {selectedStatus ? selectedStatus.name : "დასაწყები"}
            </span>
            <div style={{ rotate: openedId === 0 ? "180deg" : "0deg" }}>
              <DropdownIcon
                fill={openedId === 0 ? "rgba(131, 56, 236, 1)" : "#000"}
              />
            </div>
          </button>
        </div>
        {openedId !== -1 && (
          <div className={styles.dropdownContainer}>
            {statuses.map((status, index) => (
              <div key={index} className={styles.statusItem}>
                <button
                  className={styles.buttonContent}
                  onClick={() => handleStatusClick(status)}
                >
                  <p>{status.name}</p>
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
