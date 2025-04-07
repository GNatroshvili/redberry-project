// "use client";

// import { useState } from "react";
// import EnterNameField from "../components/InputFields/EnterNameField";
// import UserAvatarUpload from "./UserAvatarUpload/UserAvatarUpload";
// import InputFile from "./InputFile/InputFile";
// import styles from "./Form.module.css";
// import CancelButton from "./CancelButton/CancelButton";

// type Props = {
//   departments: any[];
// };

// function Form({ departments }: Props) {
//   const [name, setName] = useState("");
//   const [surname, setSurname] = useState("");
//   const [position, setPosition] = useState(departments?.[0]?.id || "");
//   const [avatar, setAvatar] = useState<File | null>(null);

//   return (
//     <form
//       onSubmit={async (e) => {
//         e.preventDefault();

//         console.log(name, surname, avatar, position);

//         const formData = new FormData();

//         formData.append("name", name);
//         formData.append("surname", surname);
//         if (avatar) {
//           formData.append("avatar", avatar);
//         }
//         formData.append("department_id", position);

//         try {
//           const res = await fetch(
//             "https://momentum.redberryinternship.ge/api/employees",
//             {
//               method: "POST",
//               body: formData,
//               headers: {
//                 Accept: "application/json",
//                 Authorization: "Bearer 9e882e2f-3297-435e-b537-67817136c385",
//               },
//             }
//           );

//           const result = await res.json();
//           console.log("Response:", result);
//         } catch (err) {
//           console.error("Error sending form data:", err);
//         }
//       }}
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "1rem",
//       }}
//     >
//       <div className={styles.container}>
//         <div className={styles.nameAndSurnameWrapper}>
//           <EnterNameField
//             title="სახელი"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             type="text"
//             name="name"
//           />

//           <EnterNameField
//             title="გვარი"
//             value={surname}
//             onChange={(e) => setSurname(e.target.value)}
//             type="text"
//             name="surname"
//           />
//         </div>
//         <UserAvatarUpload avatar={avatar} setAvatar={setAvatar} />

//         <select
//           value={position}
//           onChange={(e) => {
//             setPosition(e.target.value);
//           }}
//           name="position"
//           id="position"
//           className={styles.option}
//         >
//           {departments.map((department, index) => (
//             <option key={index.toString()} value={department.id}>
//               {department.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className={styles.buttonsWrapper}>
//         <div className={styles.buttons}>
//           <CancelButton
//             text={"გაუქმება"}
//             onClick={() => {
//               setName("");
//               setSurname("");
//               setAvatar(null);
//               setPosition(departments?.[0]?.id || "");
//             }}
//           />

//           <InputFile text={"დაამატე თანამშრომელი"} />
//         </div>
//       </div>
//     </form>
//   );
// }

// export default Form;

"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import EnterNameField from "../components/InputFields/EnterNameField";
import UserAvatarUpload from "./UserAvatarUpload/UserAvatarUpload";
import InputFile from "./InputFile/InputFile";
import styles from "./Form.module.css";
import CancelButton from "./CancelButton/CancelButton";
import DepartmentsList from "../components/DepartmentsList/DepartmentsList";
import { DepartmentType } from "../types";

type Props = {
  departments: DepartmentType[];
};

// Configure validation constants
const MAX_IMAGE_SIZE = 600 * 1024; // 600KB in bytes
const NAME_REGEX = /^[\p{L}\s']+$/u;
const GEORGIAN_LATIN_REGEX = /^[a-zA-Z\u10A0-\u10FF\s']+$/;

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო")
    .matches(GEORGIAN_LATIN_REGEX, "მხოლოდ ქართული და ლათინური სიმბოლოები")
    .required("სახელი სავალდებულოა"),
  surname: Yup.string()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო")
    .matches(GEORGIAN_LATIN_REGEX, "მხოლოდ ქართული და ლათინური სიმბოლოები")
    .required("გვარი სავალდებულოა"),
  position: Yup.number().required("პოზიცია სავალდებულოა"),
});

function EmployeeForm({ departments }: Props) {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const defaultDepartmentId = departments?.[0]?.id || "";

  const handleAvatarUpload = (file: File | null) => {
    setAvatarError(null);
    
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        setAvatarError("გამოსახულების ზომა არ უნდა აღემატებოდეს 600KB-ს");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setAvatarError("გთხოვთ ატვირთოთ სურათი");
        return;
      }
    }
    
    setAvatar(file);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        position: defaultDepartmentId,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        if (avatarError) return;

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("surname", values.surname);
        formData.append("department_id", values.position.toString());

        if (avatar) {
          if (avatar.size > MAX_IMAGE_SIZE) {
            setAvatarError("გამოსახულების ზომა არ უნდა აღემატებოდეს 600KB-ს");
            return;
          }
          formData.append("avatar", avatar);
        }

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
          resetForm();
          setAvatar(null);
          setAvatarError(null);
        } catch (err) {
          console.error("Error sending form data:", err);
        }
      }}
    >
      {({ values, handleChange, setFieldValue, resetForm }) => (
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div className={styles.container}>
            <div className={styles.nameAndSurnameWrapper}>
              <EnterNameField
                title="სახელი"
                value={values.name}
                onChange={handleChange}
                type="text"
                name="name"
              />

              <EnterNameField
                title="გვარი"
                value={values.surname}
                onChange={handleChange}
                type="text"
                name="surname"
              />
            </div>

            <UserAvatarUpload 
              avatar={avatar} 
              setAvatar={handleAvatarUpload}
              error={avatarError}
            />

            <div className={styles.departmentsWrapper}>
              <DepartmentsList
              size={"medium"}
                departments={departments}
                onDepartmentSelect={(department) =>
                  setFieldValue("position", department.id)
                }
                value={values.position}
              />
            </div>
          </div>

          <div className={styles.buttonsWrapper}>
            <div className={styles.buttons}>
              <CancelButton
                text={"გაუქმება"}
                onClick={() => {
                  resetForm();
                  setAvatar(null);
                  setAvatarError(null);
                }}
              />
              <InputFile text={"დაამატე თანამშრომელი"} />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default EmployeeForm;

