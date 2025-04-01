// "use client";

// import DropdownIcon from "../../icons/DropdownIcon";
// import { DepartmentType, EmployeeType, PriorityType } from "../../types";
// import { useState } from "react";
// import CheckboxWithText from "../CheckboxWithText/CheckboxWithText";
// import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
// import styles from "./CustomDropdown.module.css";
// import EmployeeList from "../EmployeeList";

// type Props = {
//   departments: DepartmentType[];
//   priorities: PriorityType[];
//   employees: EmployeeType[];
// };

// function CustomDropdown({ departments, employees, priorities }: Props) {
//   const [openedId, setOpenedId] = useState(-1);
//   const [selectedValues, setSelectedValues] = useState<{
//     [key: string]: boolean;
//   }>({});

//   const handleClick = (index: number) => {
//     setOpenedId(index === openedId ? -1 : index);
//   };

//   const handleCheckboxChange = (id: number) => {
//     setSelectedValues((prev) => ({
//       ...prev,
//       [id]: !prev[id], // Use ID instead of name
//     }));
//   };
  

//   const dropdowns = [
//     { label: "დეპარტამენტი", checkboxes: departments },
//     { label: "პრიორიტეტი", checkboxes: priorities },
//     { label: "თანამშრომელი", checkboxes: employees }, // Employees list
//   ];

//   // Get selected employees
//   const selectedData = Object.keys(selectedValues).filter(
//     (key) => selectedValues[key]
//   );

//   console.log("Selected Data:", selectedData);

//   return (
//     <div className={styles.container}>
//       <div className={styles.buttonsContainer}>
//         {dropdowns.map((dropdown, index) => (
//           <button
//             key={index.toString()}
//             onClick={() => handleClick(index)}
//             className={styles.dropdownButton}
//           >
//             <span
//               className={styles.dropDownTitles}
//               style={{
//                 color: openedId === index ? "rgba(131, 56, 236, 1)" : "#000",
//               }}
//             >
//               {dropdown.label}
//             </span>
//             <div style={{ rotate: openedId === index ? "180deg" : "0deg" }}>
//               <DropdownIcon
//                 fill={openedId === index ? "rgba(131, 56, 236, 1)" : "#000"}
//               />
//             </div>
//           </button>
//         ))}
//       </div>
//       {openedId !== -1 && (
//         <div className={styles.dropdownContainer}>
//           {openedId === 2 ? (
//             <EmployeeList
//               selectedValues={selectedValues}
//               onSelect={handleCheckboxChange}
//             />
//           ) : (
//             dropdowns[openedId]?.checkboxes.map((checkbox, index) => (
//               <CheckboxWithText
//                 key={index.toString()}
//                 text={checkbox.name}
//                 isChecked={selectedValues[checkbox.name] || false}
//                 onChange={() => handleCheckboxChange(checkbox.name)}
//               />
//             ))
//           )}

//           <div className={styles.buttonContainer}>
//             <PrimaryButton
//               title="არჩევა"
//               onClick={() => console.log("Final Selection:", selectedData)}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CustomDropdown;

"use client";
import DropdownIcon from "../../icons/DropdownIcon";
import { DepartmentType, EmployeeType, PriorityType } from "../../types";
import { useState, useEffect } from "react";
import CheckboxWithText from "../CheckboxWithText/CheckboxWithText";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import styles from "./CustomDropdown.module.css";
import EmployeeList from "../EmployeeList";

type Props = {
  departments: DepartmentType[];
  priorities: PriorityType[];
  employees: EmployeeType[];
  selectedDepartments: number[];
  selectedPriorities: number[];
  selectedEmployees: number[];
  onFilterApply: (type: "department" | "priority" | "employee", ids: number[]) => void;
};

function CustomDropdown({
  departments,
  employees,
  priorities,
  selectedDepartments,
  selectedPriorities,
  selectedEmployees,
  onFilterApply,
}: Props) {
  const [openedId, setOpenedId] = useState(-1);
  const [tempSelectedDepartments, setTempSelectedDepartments] = useState<number[]>([]);
  const [tempSelectedPriorities, setTempSelectedPriorities] = useState<number[]>([]);
  const [tempSelectedEmployees, setTempSelectedEmployees] = useState<number[]>([]);

  const getEmployeeSelectionObject = (ids: number[]) => {
    return ids.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {} as { [key: string]: boolean });
  };

    // Convert selection object back to array
    const handleEmployeeSelect = (id: string) => {
      setTempSelectedEmployees(prev => {
        const newSelection = [...prev];
        const numId = Number(id);
        const index = newSelection.indexOf(numId);
        
        if (index === -1) {
          newSelection.push(numId);
          console.log(newSelection);
        } else {
          newSelection.splice(index, 1);
        }
        
        return newSelection;
      });
    };
  

  // Reset temp selections when dropdown opens
  useEffect(() => {
    if (openedId === 0) {
      setTempSelectedDepartments(selectedDepartments);
    } else if (openedId === 1) {
      setTempSelectedPriorities(selectedPriorities);
    } else if (openedId === 2) {
      setTempSelectedEmployees(selectedEmployees);
    }
  }, [openedId, selectedDepartments, selectedPriorities, selectedEmployees]);

  const handleCheckboxChange = (id: number) => {
    if (openedId === 0) {
      setTempSelectedDepartments((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else if (openedId === 1) {
      setTempSelectedPriorities((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else if (openedId === 2) {
      setTempSelectedEmployees((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
  };

  const handleApply = () => {
    if (openedId === 0) {
      onFilterApply("department", tempSelectedDepartments);
    } else if (openedId === 1) {
      onFilterApply("priority", tempSelectedPriorities);
    } else if (openedId === 2) {
      onFilterApply("employee", tempSelectedEmployees);
    }
    setOpenedId(-1);
  };

  const dropdowns = [
    { label: "დეპარტამენტი", checkboxes: departments },
    { label: "პრიორიტეტი", checkboxes: priorities },
    { label: "თანამშრომელი", checkboxes: employees },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        {dropdowns.map((dropdown, index) => (
          <button
            key={index}
            onClick={() => setOpenedId(index === openedId ? -1 : index)}
            className={styles.dropdownButton}
          >
            <span
              className={styles.dropDownTitles}
              style={{ color: openedId === index ? "#8338EC" : "#000" }}
            >
              {dropdown.label}
            </span>
            <div style={{ rotate: openedId === index ? "180deg" : "0deg" }}>
              <DropdownIcon fill={openedId === index ? "#8338EC" : "#000"} />
            </div>
          </button>
        ))}
      </div>
      {openedId !== -1 && (
        <div className={styles.dropdownContainer}>
          {openedId === 2 ? (
            <EmployeeList
            selectedValues={getEmployeeSelectionObject(tempSelectedEmployees)}
            onSelect={handleEmployeeSelect}
            />
          ) : (
            dropdowns[openedId].checkboxes.map((checkbox) => (
              <CheckboxWithText
                key={checkbox.id}
                text={checkbox.name}
                isChecked={
                  openedId === 0
                    ? tempSelectedDepartments.includes(checkbox.id)
                    : tempSelectedPriorities.includes(checkbox.id)
                }
                onChange={() => handleCheckboxChange(checkbox.id)}
              />
            ))
          )}
          <div className={styles.buttonContainer}>
            <PrimaryButton title="არჩევა" onClick={handleApply} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;
