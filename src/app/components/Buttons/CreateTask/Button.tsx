import React from 'react'
import styles from "./Button.module.css"

const Button = (props : any) => {
  return (
    <div>
      <button className={styles.button}>
        {props.title}
      </button>
    </div>
  )
}

export default Button