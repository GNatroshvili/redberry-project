import React from 'react'
import styles from "./Button.module.css"

const Button = (props : any) => {
  return (
    <div>
        <button className={styles.button}>
            <img src="/arrow.svg" alt="" className={styles.img}/>
            {props.title}
        </button>
    </div>
  )
}

export default Button