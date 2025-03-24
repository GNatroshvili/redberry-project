import React from 'react'
import styles from "./Departments.module.css"
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox"
 
const Departments = () => {
  return (
    <div className={styles.departments}>
        <div className={styles.checkBox}>
            <CustomCheckbox  handleChange={() => {}} />
        </div>
        <div className={styles.employee}>
            <img src="/avatar.svg" alt="avatar" />
            <p>მარკეტინგის დეპარტამენტი</p>
        </div>

    </div>
  )
}

export default Departments