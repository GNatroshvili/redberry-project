"use client";

import { useState } from "react";

type Props = {
  departments: any[];
};

function Form({ departments }: Props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [avatar, setAvatar] = useState<File>({} as File);
  const [position, setPosition] = useState(departments[0].id);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        console.log(name, surname, avatar, position);

        const formData = new FormData();

        formData.append("name", name);
        formData.append("surname", surname);
        if (avatar) {
          formData.append("avatar", avatar);
        }
        formData.append("department_id", position);

        try {
          const res = await fetch(
            "https://momentum.redberryinternship.ge/api/employees",
            {
              method: "POST",
              body: formData,
              headers: {
                Accept: "application/json",
                Authorization: "Bearer 9e882e2f-3297-435e-b537-67817136c385",
              },
            }
          );

          const result = await res.json();
          console.log("Response:", result);
        } catch (err) {
          console.error("Error sending form data:", err);
        }
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "200px",
        gap: "1rem",
      }}
    >
      <label>
        Name:
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          name="name"
        />
      </label>

      <label>
        Surname:
        <input
          value={surname}
          onChange={(e) => {
            setSurname(e.target.value);
          }}
          type="text"
          name="surname"
        />
      </label>

      <label>
        Avatar:
        <input
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              setAvatar(selectedFile);
            }
          }}
          type="file"
          name="avatar"
        />
      </label>

      <select
        value={position}
        onChange={(e) => {
          setPosition(e.target.value);
        }}
        name="position"
        id="position"
      >
        {departments.map((department, index) => (
          <option key={index.toString()} value={department.id}>
            {department.name}
          </option>
        ))}
      </select>

      <input type="submit" value="Submit" />
    </form>
  );
}

export default Form;
