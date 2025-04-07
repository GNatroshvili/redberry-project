// import React, { useState, useEffect } from "react";
// import styles from "./ResponsibleEmployeer.module.css";
// import DropdownIcon from "../../icons/DropdownIcon";
// import { EmployeeType } from "../../types";
// import EmployeeList from "../EmployeeList";
// import AddEmployeeButton from "../Buttons/AddEmployeeButton/AddEmployeeButton";

// type Props = {
//   employees: EmployeeType[];
// };

// function CustomDropdown({ employees }: Props) {
//   const [openedId, setOpenedId] = useState(-1);
//   const [selectedStatus, setSelectedStatus] = useState<EmployeeType | null>(
//     null
//   );

//   const handleClick = (index: number) => {
//     setOpenedId(index === openedId ? -1 : index);
//   };

//   const dropdowns = [{ checkboxes: employees }];

//   return (
//     <div className={styles.box}>
//       <p
//         className={`${styles.title} ${
//           openedId !== -1 ? styles.openedTitle : ""
//         }`}
//       >
//         პასუხისმგებელი თანამშრომელი<span>*</span>
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
//             <AddEmployeeButton title={"დაამატე თანამშრომელი"} />
//             <EmployeeList />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CustomDropdown;

// import React, { useState, useEffect } from "react";
// import styles from "./ResponsibleEmployeer.module.css";
// import DropdownIcon from "../../icons/DropdownIcon";
// import { EmployeeType } from "../../types";
// import AddEmployeeButton from "../Buttons/AddEmployeeButton/AddEmployeeButton";
// import EmployeeList from "../EmployeeList";

// function CustomDropdown() {
//   const [opened, setOpened] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(
//     null
//   );
//   const [employees, setEmployees] = useState<EmployeeType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await fetch(
//           "https://momentum.redberryinternship.ge/api/employees",
//           {
//             headers: {
//               Authorization: "Bearer 9e882e2f-3297-435e-b537-67817136c385",
//             },
//           }
//         );

//         if (!res.ok) throw new Error("Failed to fetch employees");

//         const data = await res.json();
//         setEmployees(data);
//       } catch (err) {
//         setError((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const handleSelectEmployee = (employee: EmployeeType) => {
//     setSelectedEmployee(employee); // Set selected employee
//     setOpened(false); // Close dropdown
//   };

//   return (
//     <div className={styles.box}>
//       <p className={styles.title}>
//         პასუხისმგებელი თანამშრომელი<span>*</span>
//       </p>
//       <div className={styles.container}>
//         <button
//           className={styles.dropdownButton}
//           onClick={() => setOpened(!opened)}
//         >
//           <span className={styles.selectedText}>
//             {selectedEmployee
//               ? `${selectedEmployee.name} ${selectedEmployee.surname}`
//               : "დასაწყები"}
//           </span>
//           <div
//             style={{ transform: opened ? "rotate(180deg)" : "rotate(0deg)" }}
//           >
//             <DropdownIcon fill={opened ? "rgba(131, 56, 236, 1)" : "#000"} />
//           </div>
//         </button>

//         {opened && (
//           <div className={styles.dropdownContainer}>
//             <AddEmployeeButton title={"დაამატე თანამშრომელი"} />

//             {loading ? (
//               <p>Loading...</p>
//             ) : error ? (
//               <p>Error: {error}</p>
//             ) : (
//               employees.map((employee) => (
//                 <div key={employee.id} className={styles.statusItem}>
//                   <button
//                     className={styles.buttonContent}
//                     onClick={() => handleSelectEmployee(employee)}
//                   >
//                     <p>
//                       {employee.avatar}
//                       {employee.name} {employee.surname}
//                     </p>
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CustomDropdown;

// import React, { useState, useEffect } from "react";
// import styles from "./ResponsibleEmployeer.module.css";
// import DropdownIcon from "../../icons/DropdownIcon";
// import { EmployeeType } from "../../types";
// import AddEmployeeButton from "../Buttons/AddEmployeeButton/AddEmployeeButton";

// function CustomDropdown() {
//   const [opened, setOpened] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(
//     null
//   );
//   const [employees, setEmployees] = useState<EmployeeType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await fetch(
//           "https://momentum.redberryinternship.ge/api/employees",
//           {
//             headers: {
//               Authorization: "Bearer 9e882e2f-3297-435e-b537-67817136c385",
//             },
//           }
//         );

//         if (!res.ok) throw new Error("Failed to fetch employees");

//         const data = await res.json();
//         setEmployees(data);
//       } catch (err) {
//         setError((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const handleSelectEmployee = (employee: EmployeeType) => {
//     setSelectedEmployee(employee); // Set selected employee
//     setOpened(false); // Close dropdown
//   };

//   return (
//     <div className={styles.box}>
//       <p className={styles.title}>
//         პასუხისმგებელი თანამშრომელი<span>*</span>
//       </p>
//       <div className={styles.container}>
//         <button
//           className={styles.dropdownButton}
//           onClick={() => setOpened(!opened)}
//         >
//           <span className={styles.selectedText}>
//             {selectedEmployee ? (
//               <div className={styles.selectedEmployee}>
//                 <img
//                   src={selectedEmployee.avatar}
//                   alt={selectedEmployee.name}
//                   className={styles.avatar}
//                 />
//                 {selectedEmployee.name} {selectedEmployee.surname} 
//               </div>
//             ) : (
//               "დასაწყები"
//             )}
//           </span>
//           <div
//             style={{ transform: opened ? "rotate(180deg)" : "rotate(0deg)" }}
//           >
//             <DropdownIcon fill={opened ? "rgba(131, 56, 236, 1)" : "#000"} />
//           </div>
//         </button>

//         {opened && (
//           <div className={styles.dropdownContainer}>
//             <AddEmployeeButton title={"დაამატე თანამშრომელი"} />

//             {loading ? (
//               <p>Loading...</p>
//             ) : error ? (
//               <p>Error: {error}</p>
//             ) : (
//               employees.map((employee) => (
//                 <div key={employee.id} className={styles.statusItem}>
//                   <button
//                     className={styles.buttonContent}
//                     onClick={() => handleSelectEmployee(employee)}
//                   >
//                     <img
//                       src={employee.avatar}
//                       alt={employee.name}
//                       className={styles.avatar}
//                     />
//                     <p>
//                       {employee.name} {employee.surname} {employee.id}
//                     </p>
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CustomDropdown;

import React, { useState, useEffect } from "react";
import styles from "./ResponsibleEmployeer.module.css";
import DropdownIcon from "../../icons/DropdownIcon";
import { EmployeeType } from "../../types";
import AddEmployeeButton from "../Buttons/AddEmployeeButton/AddEmployeeButton";

type Props = {
  onEmployeeSelect?: (employeeId: number) => void; // Callback prop for ID
};

function CustomDropdown({ onEmployeeSelect }: Props) {
  const [opened, setOpened] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(
    null
  );
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(
          "https://momentum.redberryinternship.ge/api/employees",
          {
            headers: {
              Authorization: "Bearer 9e882e2f-3297-435e-b537-67817136c385",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch employees");

        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSelectEmployee = (employee: EmployeeType) => {
    setSelectedEmployee(employee); // Set selected employee
    setOpened(false); // Close dropdown
    if (onEmployeeSelect) {
      onEmployeeSelect(employee.id); // Call the callback with employee.id
    }
  };

  return (
    <div className={styles.box}>
      <p className={styles.title}>
        პასუხისმგებელი თანამშრომელი<span>*</span>
      </p>
      <div className={styles.container}>
        <button
          className={styles.dropdownButton}
          onClick={() => setOpened(!opened)}
        >
          <span className={styles.selectedText}>
            {selectedEmployee ? (
              <div className={styles.selectedEmployee}>
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.name}
                  className={styles.avatar}
                />
                {selectedEmployee.name} {selectedEmployee.surname}
              </div>
            ) : (
              "აირჩიეთ თანამშრომელი" // Changed default text
            )}
          </span>
          <div
            style={{ transform: opened ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <DropdownIcon fill={opened ? "rgba(131, 56, 236, 1)" : "#000"} />
          </div>
        </button>

        {opened && (
          <div className={styles.dropdownContainer}>
            <AddEmployeeButton title={"დაამატე თანამშრომელი"} />

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              employees.map((employee) => (
                <div key={employee.id} className={styles.statusItem}>
                  <button
                    className={styles.buttonContent}
                    onClick={() => handleSelectEmployee(employee)}
                  >
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className={styles.avatar}
                    />
                    <p>
                      {employee.name} {employee.surname}
                    </p>
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomDropdown;
