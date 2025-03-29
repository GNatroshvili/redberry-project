// import styles from "./Priority.module.css";
// import DropdownIcon from "../../icons/DropdownIcon";
// import { PriorityType } from "../../types";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";

// type Props = {
//   priorities: PriorityType[];
// };

// function CustomDropdown({ priorities }: Props) {
//   const [openedId, setOpenedId] = useState(-1);
//   const [selectedPriority, setSelectedPriority] = useState<PriorityType | null>(
//     null
//   );

//   useEffect(() => {
//     const defaultPriority =
//       priorities?.find((p) => p.name === "საშუალო") || priorities?.[0];
//     if (defaultPriority) {
//       setSelectedPriority(defaultPriority);
//     }
//   }, [priorities]);

//   const handleClick = (index: number) => {
//     setOpenedId(index === openedId ? -1 : index);
//   };

//   const getIconForPriority = (priority: string) => {
//     switch (priority) {
//       case "დაბალი":
//         return "/Low.svg";
//       case "საშუალო":
//         return "/Medium.svg";
//       case "მაღალი":
//         return "/High.svg";
//       default:
//         return "/Medium.svg";
//     }
//   };

//   const dropdowns = [{ checkboxes: priorities }];

//   return (
//     <div className={styles.priorityWrapper}>
//       <p
//         className={`${styles.title} ${
//           openedId !== -1 ? styles.openedTitle : ""
//         }`}
//       >
//         პრიორიტეტი<span>*</span>
//       </p>
//       <div
//         className={`${styles.container} ${
//           openedId !== -1 ? styles.openedContainer : ""
//         }`}
//       >
//         <div className={styles.buttonsContainer}>
//           {dropdowns.map((dropdown, index) => (
//             <button
//               key={index.toString()}
//               onClick={() => handleClick(index)}
//               className={styles.dropdownButton}
//             >
//               <div className={styles.buttonContent}>
//                 {selectedPriority && (
//                   <>
//                     <Image
//                       src={getIconForPriority(selectedPriority.name)}
//                       alt={selectedPriority.name}
//                       width={16}
//                       height={18}
//                     />
//                     <span>{selectedPriority.name}</span>
//                   </>
//                 )}
//               </div>
//               <div style={{ rotate: openedId === index ? "180deg" : "0deg" }}>
//                 <DropdownIcon
//                   fill={openedId === index ? "rgba(131, 56, 236, 1)" : "#000"}
//                 />
//               </div>
//             </button>
//           ))}
//         </div>
//         {openedId !== -1 && (
//           <div className={styles.dropdownContainer}>
//             {dropdowns[openedId]?.checkboxes?.map((checkbox, index) => (
//               <div key={index.toString()} className={styles.priorityItem}>
//                 <button
//                   className={styles.buttonContent}
//                   onClick={() => {
//                     if (checkbox) {
//                       setSelectedPriority(checkbox);
//                       setOpenedId(-1);
//                     }
//                   }}
//                 >
//                   <Image
//                     src={getIconForPriority(checkbox.name)}
//                     alt={checkbox.name}
//                     width={16}
//                     height={18}
//                   />
//                   <p>{checkbox.name}</p>
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CustomDropdown;

import styles from "./Priority.module.css";
import DropdownIcon from "../../icons/DropdownIcon";
import { PriorityType } from "../../types";
import React, { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  priorities: PriorityType[];
  onPrioritySelect?: (priorityName: string) => void; // Callback prop
};

function CustomDropdown({ priorities, onPrioritySelect }: Props) {
  const [openedId, setOpenedId] = useState(-1);
  const [selectedPriority, setSelectedPriority] = useState<PriorityType | null>(
    null
  );

  useEffect(() => {
    const defaultPriority =
      priorities?.find((p) => p.name === "საშუალო") || priorities?.[0];
    if (defaultPriority && selectedPriority === null) {
      setSelectedPriority(defaultPriority);
      if (onPrioritySelect) {
        onPrioritySelect(defaultPriority.name); // Call on mount with default name
      }
    }
  }, [priorities, onPrioritySelect, selectedPriority]);

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
        return "/Medium.svg";
    }
  };

  const handlePriorityClick = (priority: PriorityType) => {
    setSelectedPriority(priority);
    setOpenedId(-1);
    if (onPrioritySelect) {
      onPrioritySelect(priority.name); // Call the callback with the selected priority name
    }
  };

  const dropdowns = [{ checkboxes: priorities }];

  return (
    <div className={styles.priorityWrapper}>
      <p
        className={`${styles.title} ${
          openedId !== -1 ? styles.openedTitle : ""
        }`}
      >
        პრიორიტეტი<span>*</span>
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
            {dropdowns[openedId]?.checkboxes?.map((checkbox, index) => (
              <div key={index.toString()} className={styles.priorityItem}>
                <button
                  className={styles.buttonContent}
                  onClick={() => handlePriorityClick(checkbox)} // Call handler
                >
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
    </div>
  );
}

export default CustomDropdown;
