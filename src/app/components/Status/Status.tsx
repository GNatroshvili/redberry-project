// import React, { useState, useEffect } from "react";
// import { StatusType } from "../../types";
// import DropdownIcon from "../../icons/DropdownIcon";
// import styles from "./Status.module.css";

// type Props = {
//   statuses: StatusType[];
// };

// function CustomDropdown({ statuses }: Props) {
//   const [openedId, setOpenedId] = useState(-1);
//   const [selectedStatus, setSelectedStatus] = useState<StatusType | null>(null);

//   useEffect(() => {
//     const defaultStatus =
//       statuses?.find((p) => p.name === "დასაწყები") || statuses?.[0];
//     if (defaultStatus) {
//       setSelectedStatus(defaultStatus);
//     }
//   }, [statuses]);

//   const handleClick = (index: number) => {
//     setOpenedId(index === openedId ? -1 : index);
//   };

//   const dropdowns = [{ checkboxes: statuses }];

//   return (
//     <div className={styles.statusesWrapper}>
//       <p
//         className={`${styles.title} ${
//           openedId !== -1 ? styles.openedTitle : ""
//         }`}
//       >
//         სტატუსი<span>*</span>
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
//               <span className={styles.selectedText}>
//                 {selectedStatus ? selectedStatus.name : "დასაწყები"}
//               </span>
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
//               <div key={index.toString()} className={styles.statusItem}>
//                 <button
//                   className={styles.buttonContent}
//                   onClick={() => {
//                     if (checkbox) {
//                       setSelectedStatus(checkbox);
//                       setOpenedId(-1);
//                     }
//                   }}
//                 >
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

import React, { useState, useEffect } from "react";
import { StatusType } from "../../types";
import DropdownIcon from "../../icons/DropdownIcon";
import styles from "./Status.module.css";

type Props = {
  statuses: StatusType[];
  onStatusSelect?: (statusId: number) => void; // Callback prop for ID
};

function CustomDropdown({ statuses, onStatusSelect }: Props) {
  const [openedId, setOpenedId] = useState(-1);
  const [selectedStatus, setSelectedStatus] = useState<StatusType | null>(null);

  useEffect(() => {
    const defaultStatus =
      statuses?.find((p) => p.name === "დასაწყები") || statuses?.[0];
    if (defaultStatus && selectedStatus === null) {
      setSelectedStatus(defaultStatus);
      if (onStatusSelect) {
        onStatusSelect(defaultStatus.id); // Call on mount with default ID
      }
    }
  }, [statuses, onStatusSelect, selectedStatus]);

  const handleClick = (index: number) => {
    setOpenedId(index === openedId ? -1 : index);
  };

  const handleStatusClick = (status: StatusType) => {
    setSelectedStatus(status);
    setOpenedId(-1);
    if (onStatusSelect) {
      onStatusSelect(status.id); // Call the callback with the selected status ID
    }
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
                  onClick={() => handleStatusClick(checkbox)} // Call handler
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
