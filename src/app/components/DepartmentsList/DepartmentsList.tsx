// import React, { useState, useEffect } from "react";
// import DropdownIcon from "../../icons/DropdownIcon";
// import styles from "./Departments.module.css";
// import { DepartmentType } from "../../types";

// type Props = {
//   departments: DepartmentType[];
// };
// function CustomDropdown({ departments }: Props) {
//   const [openedId, setOpenedId] = useState(-1);
//   const [selectedDepartment, setSelectedDepartment] = useState<DepartmentType | null>(
//     null
//   );

//   useEffect(() => {
//     const defaultDepartment =
//       departments?.find((p) => p.name === "საშუალო") || departments?.[0];
//     if (defaultDepartment) {
//       setSelectedDepartment(defaultDepartment);
//     }
//   }, [departments]);

//   const handleClick = (index: number) => {
//     setOpenedId(index === openedId ? -1 : index);
//   };

//   const dropdowns = [{ checkboxes: departments }];

//   return (
//     <div className={styles.departmentsWrapper}>
//       <p
//         className={`${styles.title} ${openedId !== -1 ? styles.openedTitle : ""
//           }`}
//       >
//         დეპარტამენტი<span>*</span>
//       </p>
//       <div
//         className={`${styles.container} ${openedId !== -1 ? styles.openedContainer : ""
//           }`}
//       >
//         <div className={styles.buttonsContainer}>
//           {dropdowns.map((dropdown, index) => (
//             <button
//               key={index.toString()}
//               onClick={() => handleClick(index)}
//               className={styles.dropdownButton}
//             >
//               <div className={styles.buttonContent}>
//                 {selectedDepartment && (
//                   <>
//                     <span>{selectedDepartment.name}</span>
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
//               <div key={index.toString()} className={styles.statusItem}>
//                 <button
//                   className={styles.buttonContent}
//                   onClick={() => {
//                     if (checkbox) {
//                       setSelectedDepartment(checkbox);
//                       setOpenedId(-1);
//                       console.log(checkbox.name)
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
import DropdownIcon from "../../icons/DropdownIcon";
import styles from "./Departments.module.css";
import { DepartmentType } from "../../types";

type Props = {
  departments: DepartmentType[];
  onDepartmentSelect?: (department: DepartmentType) => void;
  value?: number;
};

function CustomDropdown({ departments, onDepartmentSelect, value }: Props) {
  const [openedId, setOpenedId] = useState(-1);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentType | null>(
    null
  );

  useEffect(() => {
    if (departments && departments.length > 0) {
      let defaultDepartment = null;
      
      // If a value is provided, use that
      if (value) {
        defaultDepartment = departments.find(d => d.id === value);
      }
      
      // Otherwise use the default logic
      if (!defaultDepartment) {
        defaultDepartment = departments.find((p) => p.name === "საშუალო") || departments[0];
      }

      if (defaultDepartment && selectedDepartment?.id !== defaultDepartment.id) {
        setSelectedDepartment(defaultDepartment);
        if (onDepartmentSelect) {
          onDepartmentSelect(defaultDepartment);
        }
      }
    }
  }, [departments, onDepartmentSelect, selectedDepartment, value]);

  const handleClick = (index: number) => {
    setOpenedId(index === openedId ? -1 : index);
  };

  const handleDepartmentClick = (department: DepartmentType) => {
    setSelectedDepartment(department);
    setOpenedId(-1);
    if (onDepartmentSelect) {
      onDepartmentSelect(department);
    }
  };

  const dropdowns = [{ checkboxes: departments }];

  return (
    <div className={styles.departmentsWrapper}>
      <p className={`${styles.title} ${openedId !== -1 ? styles.openedTitle : ""}`}>
        დეპარტამენტი<span>*</span>
      </p>
      <div className={`${styles.container} ${openedId !== -1 ? styles.openedContainer : ""}`}>
        <div className={styles.buttonsContainer}>
          {dropdowns.map((dropdown, index) => (
            <button
              key={index.toString()}
              onClick={() => handleClick(index)}
              className={styles.dropdownButton}
              type="button"
            >
              <div className={styles.buttonContent}>
                {selectedDepartment && <span>{selectedDepartment.name}</span>}
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
              <div key={index.toString()} className={styles.statusItem}>
                <button
                  className={styles.buttonContent}
                  onClick={() => handleDepartmentClick(checkbox)}
                  type="button"
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