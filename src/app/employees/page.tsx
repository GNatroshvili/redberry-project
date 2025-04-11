import Form from "../components/Form";

interface Employee {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  // Add other properties that employees have.
}

interface Department {
  id: number;
  name: string;
  // Add other properties that departments have.
}

export default async function Page() {
  const data: Employee[] = await fetch(
    "https://momentum.redberryinternship.ge/api/employees",
    {
      headers: {
        Authorization: "Bearer 9e882e2f-3297-435e-b537-67817136c385",
      },
    }
  ).then((res) => res.json());

  const departments: Department[] = await fetch(
    "https://momentum.redberryinternship.ge/api/departments"
  ).then((res) => res.json());

  return (
    <>
      {data?.map((employee: Employee, index: number) => (
        <div key={index.toString()}>
          {/* {employee.name} {employee.surname}
          <Image src={employee.avatar} width={100} height={100} alt="test" /> */}
        </div>
      ))}
      <Form departments={departments} />
    </>
  );
}
