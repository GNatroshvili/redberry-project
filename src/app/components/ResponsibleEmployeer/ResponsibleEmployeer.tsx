import React, { useState, useEffect, useCallback } from "react";
import styles from "./ResponsibleEmployeer.module.css";
import DropdownIcon from "../../icons/DropdownIcon";
import { EmployeeType } from "../../types";
import AddEmployeeButton from "../Buttons/AddEmployeeButton/AddEmployeeButton";
import EmployeeModal from "../EmployeeModal/EmployeeModal";
import { AUTH_TOKEN } from "../../constants";

type Props = {
  onEmployeeSelect?: (employeeId: number) => void;
};

function CustomDropdown({ onEmployeeSelect }: Props) {
  const [opened, setOpened] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(null);
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      const res = await fetch("/api/employees", {
        signal,
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch employees");
      const data = await res.json();
      setEmployees(data);
      setLoading(false);
    } catch (err) {
      if (!(err instanceof DOMException && (err as DOMException).name === "AbortError")) {
        setError((err as Error).message);
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchEmployees(controller.signal);
    return () => controller.abort();
  }, [fetchEmployees]);

  const handleEmployeeCreated = async (employee?: EmployeeType) => {
    setShowModal(false);
    await fetchEmployees();
    if (employee) {
      setSelectedEmployee(employee);
      setOpened(false);
      onEmployeeSelect?.(employee.id);
    }
  };

  const handleSelectEmployee = (employee: EmployeeType) => {
    if (employee.id === selectedEmployee?.id) return;
    setSelectedEmployee(employee);
    setOpened(false);
    onEmployeeSelect?.(employee.id);
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
          type="button"
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
              "აირჩიეთ თანამშრომელი"
            )}
          </span>
          <div style={{ transform: opened ? "rotate(180deg)" : "rotate(0deg)" }}>
            <DropdownIcon fill={opened ? "rgba(131, 56, 236, 1)" : "#000"} />
          </div>
        </button>

        {opened && (
          <div className={styles.dropdownContainer}>
            <AddEmployeeButton
              title={"დაამატე თანამშრომელი"}
              onClick={() => setShowModal(true)}
            />

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className={styles.error}>Error: {error}</p>
            ) : (
              employees.map((employee) => (
                <div key={employee.id} className={styles.statusItem}>
                  <button
                    className={styles.buttonContent}
                    onClick={() => handleSelectEmployee(employee)}
                    type="button"
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
      {showModal && (
        <EmployeeModal
          onClose={() => setShowModal(false)}
          onSuccess={handleEmployeeCreated}
        />
      )}
    </div>
  );
}

export default CustomDropdown;