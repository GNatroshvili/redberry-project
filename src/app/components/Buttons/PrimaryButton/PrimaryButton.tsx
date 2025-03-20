import React from 'react'
import styles from "./PrimaryButton.module.css"

const PrimaryButton = (props : any) => {
  return (
    <div>
        <button className={styles.button}>
            {props.title}
        </button>
    </div>
  )
}

export default PrimaryButton