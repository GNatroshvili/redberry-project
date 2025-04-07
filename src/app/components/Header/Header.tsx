import React, { useState } from "react";
import AddToTaskButton from "../Buttons/AddToTaskButton/Button";
import AddToEmployeeButton from "../Buttons/AddToEmployeeButton/Button";
import styles from "./Header.module.css";
import clsx from "clsx";
import Logo from "../Logo/Logo";
import EmployeeModal from "../EmployeeModal/EmployeeModal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <header className={clsx(styles.header, styles.container)}>
      <Logo />
      <div className={styles.btnWrapper}>
        <div>
          <AddToEmployeeButton
            title="თანამშრომლის შექმნა"
            onClick={() => setShowModal(true)}
          />
          {showModal && <EmployeeModal onClose={() => setShowModal(false)} />}
        </div>
        <AddToTaskButton title={"შექმენი ახალი დავალება"} />
      </div>
    </header>
  );
};

export default Header;
