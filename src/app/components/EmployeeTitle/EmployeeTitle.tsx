import React from "react";
import styles from "./EmployeeTitle.module.css";
import Image from "next/image";

type Props = {
  name: string;
  surname: string;
  avatar: any;
};

const EmployeeTitle = ({ name, surname, avatar }: Props) => {
  return (
    <div className={styles.container}>
      <Image src={avatar} alt={`${name} ${surname}`} width={28} height={28} className={styles.img}/>
      <p className={styles.name}>{name}</p>
      <p className={styles.surname}>{surname}</p>
    </div>
  );
};

export default EmployeeTitle;
