import React from "react";
import AddToTaskButton from "../Buttons/AddToTaskButton/Button";
import AddToEmployeeButton from "../Buttons/AddToEmployeeButton/Button";
import styles from "./Header.module.css"
import clsx from "clsx"
import Logo from "../Logo/Logo";


const Header = () => {
  return (
    <header className={clsx(styles.header, styles.container)}>
      <Logo/>
      <div className={styles.btnWrapper}>
        <AddToEmployeeButton title={"თანამშრომლის დამატება"}/>
        <AddToTaskButton title={"შექმენი ახალი დავალება"} />
      </div>
    </header>
  );
};

export default Header;
