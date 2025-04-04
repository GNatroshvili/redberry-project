"use client";

import { useState } from "react";
import EnterNameField from "../components/InputFields/EnterNameField";
import UserAvatarUpload from "./UserAvatarUpload/UserAvatarUpload";
import InputFile from "./InputFile/InputFile";
import styles from "./Form.module.css";
import CancelButton from "./CancelButton/CancelButton";

type Props = {
  departments: any[];
};

function Form({ departments }: Props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [position, setPosition] = useState(departments?.[0]?.id || "");
  const [avatar, setAvatar] = useState<File | null>(null);

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
      <div className={styles.nameAndSurnameWrapper}>
        <EnterNameField
          title="სახელი"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
        />

        <EnterNameField
          title="გვარი"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          type="text"
          name="surname"
        />
      </div>
      <UserAvatarUpload avatar={avatar} setAvatar={setAvatar} />

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

      {/* <input className={styles.submitButton} type="submit" value="Submit" /> */}
      <div className={styles.buttonsWrapper}>
        <div className={styles.buttons}>
          <CancelButton
            text={"გაუქმება"}
            onClick={() => {
              setName("");
              setSurname("");
              setAvatar(null);
              setPosition(departments?.[0]?.id || "");
            }}
          />

          <InputFile text={"დაამატე თანამშრომელი"} />
        </div>
      </div>
    </form>
  );
}

export default Form;
