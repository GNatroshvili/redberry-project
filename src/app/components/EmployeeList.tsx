import { useEffect, useState } from "react";
import { EmployeeType } from "../types";
import EmployeeTitle from "../components/EmployeeTitle/EmployeeTitle";
import styles from "./EmployeeList.module.css"
import { AUTH_TOKEN } from "../constants";

type Props = {
  selectedValues: { [key: string]: boolean };
  onSelect: (name: string) => void;
};

const EmployeeList = ({ selectedValues, onSelect }: Props) => {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchEmployees = async () => {
      try {
        const res = await fetch(
          "/api/employees",
          {
            headers: {
              Authorization: AUTH_TOKEN,
            },
            signal: controller.signal,
          }
        );

        if (!res.ok) throw new Error("Failed to fetch employees");

        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError((err as Error).message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();

    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.empList}>
      {employees.map((employee) => (
        <EmployeeTitle
          key={employee.id}
          name={employee.name}
          surname={employee.surname}
          avatar={employee.avatar}
          isChecked={selectedValues[employee.id] || false} // Use ID
          onChange={() => onSelect(employee.id.toString())} // Use ID
        />
      ))}
    </div>
  );
};

export default EmployeeList;
