import React from 'react'
import styles from "./EmployeeName.module.css"

const EmployeeName = (props : any) => {
  return (
    <div className={styles.nameWrapper}>
        <p className={styles.name}>{props.name}</p>
        <img src="/delete-icon.svg" alt="delete-icon" />
    </div>
  )
}

export default EmployeeName