// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { EmployeeType } from '../types';


// const EmployeeList = () => {
//   const [employees, setEmployees] = useState<EmployeeType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await fetch('https://momentum.redberryinternship.ge/api/employees', {
//           headers: {
//             Authorization: 'Bearer 9e882e2f-3297-435e-b537-67817136c385',
//           },
//         });

//         if (!res.ok) throw new Error('Failed to fetch employees');

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

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       {employees.map((employee) => (
//         <div key={employee.id} className="employee-card">
//           <p>{employee.name} {employee.surname}</p>
//           <Image src={employee.avatar} width={100} height={100} alt={`${employee.name} Avatar`} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EmployeeList;
import { useEffect, useState } from "react";
import { EmployeeType } from "../types";
import EmployeeTitle from "../components/EmployeeTitle/EmployeeTitle";

const EmployeeList = () => {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {employees.map((employee) => (
        <EmployeeTitle
          key={employee.id}
          name={employee.name}
          surname={employee.surname}
          avatar={employee.avatar}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
