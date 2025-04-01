import React from 'react'
import styles from "./Button.module.css"

type Props = {
  title : any
}

const Button = ({title} : Props) => {
  return (
    <div>
        <button className={styles.button}>
            {title}
        </button>
    </div>
  )
}

export default Button