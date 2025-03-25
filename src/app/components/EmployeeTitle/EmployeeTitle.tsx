import React from "react";
import styles from "./EmployeeTitle.module.css";
import Image from "next/image";

type Props = {
    name: string;
    surname: string;
};

const EmployeeTitle = ( { name, surname } : Props) => {
  return (
    <div className={styles.container}>
      <Image src="/avatar.svg" alt="Employee Title" width={28} height={28} />
      <p className={styles.name}>{name}</p>
      <p className={styles.surname}>{surname}</p>
    </div>
  );
};

export default EmployeeTitle;
