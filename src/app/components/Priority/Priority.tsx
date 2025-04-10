import React, { useState, useEffect } from "react";
import DropdownIcon from "../../icons/DropdownIcon";
import styles from "./Priority.module.css";
import { PriorityType } from "../../types";
import Image from "next/image";

type Props = {
  priorities: PriorityType[];
  onPrioritySelect?: (priorityId: number) => void;
};

function CustomDropdown({ priorities, onPrioritySelect }: Props) {
  const [openedId, setOpenedId] = useState(-1);
  const [selectedPriority, setSelectedPriority] = useState<PriorityType | null>(null);

  useEffect(() => {
    let ignore = false;
    
    if (!priorities?.length || selectedPriority) return;
    
    const defaultPriority = priorities.find(p => p.name === "საშუალო") || priorities[0];
    
    if (!ignore && defaultPriority) {
      setSelectedPriority(defaultPriority);
      onPrioritySelect?.(defaultPriority.id);
    }

    return () => {
      ignore = true;
    };
  }, [priorities, onPrioritySelect, selectedPriority]);

  const getIconForPriority = (priority: string) => {
    switch (priority) {
      case "დაბალი": return "/Low.svg";
      case "საშუალო": return "/Medium.svg";
      case "მაღალი": return "/High.svg";
      default: return "/Medium.svg";
    }
  };

  const handleClick = (index: number) => {
    setOpenedId(prev => prev === index ? -1 : index);
  };

  const handlePriorityClick = (priority: PriorityType) => {
    if (priority.id === selectedPriority?.id) return;
    setSelectedPriority(priority);
    setOpenedId(-1);
    onPrioritySelect?.(priority.id);
  };

  const dropdowns = [{ checkboxes: priorities }];

  return (
    <div className={styles.priorityWrapper}>
      <p className={`${styles.title} ${openedId !== -1 ? styles.openedTitle : ""}`}>
        პრიორიტეტი<span>*</span>
      </p>
      <div className={`${styles.container} ${openedId !== -1 ? styles.openedContainer : ""}`}>
        <div className={styles.buttonsContainer}>
          {dropdowns.map((_, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={styles.dropdownButton}
              type="button"
            >
              <div className={styles.buttonContent}>
                {selectedPriority && (
                  <>
                    <Image
                      src={getIconForPriority(selectedPriority.name)}
                      alt={selectedPriority.name}
                      width={16}
                      height={18}
                    />
                    <span>{selectedPriority.name}</span>
                  </>
                )}
              </div>
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
            {dropdowns[openedId]?.checkboxes?.map((priority) => (
              <div key={priority.id} className={styles.priorityItem}>
                <button
                  className={styles.buttonContent}
                  onClick={() => handlePriorityClick(priority)}
                  type="button"
                >
                  <Image
                    src={getIconForPriority(priority.name)}
                    alt={priority.name}
                    width={16}
                    height={18}
                  />
                  <p>{priority.name}</p>
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