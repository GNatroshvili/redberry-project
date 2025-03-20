import React from 'react'
import styles from "./Button.module.css"

const Button = (props : any) => {
  return (
    <div>
      <button className={styles.button}>
        <img src="/add-icon.svg" alt="" />
        {props.title}
      </button>
    </div>
  )
}

export default Button