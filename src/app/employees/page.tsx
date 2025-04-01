import Form from "../components/Form";
import Image from "next/image";

export default async function Page() {
  const data = await fetch(
    "https://momentum.redberryinternship.ge/api/employees",
    {
      headers: {
        Authorization: "Bearer 9e882e2f-3297-435e-b537-67817136c385",
      },
    }
  ).then((res) => res.json());

  const departments = await fetch(
    "https://momentum.redberryinternship.ge/api/departments"
  ).then((res) => res.json());
  return (
    <>
      {data?.map((employee: any, index: any) => (
        <div key={index.toString()}>
          {employee.name} {employee.surname}
          <Image src={employee.avatar} width={100} height={100} alt="test" />
        </div>
      ))}
      <Form departments={departments} />
    </>
  );
}
