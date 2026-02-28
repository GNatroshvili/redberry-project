import Form from "../components/Form";
import { AUTH_TOKEN, API_BASE_URL } from "../constants";

interface Department {
  id: number;
  name: string;
}

export default async function Page() {
  const departments: Department[] = await fetch(
    `${API_BASE_URL}/api/departments`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json());

  return <Form departments={departments} />;
}
