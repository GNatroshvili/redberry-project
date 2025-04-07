import React from 'react'
import styles from "./TaskDetails.module.css"

type Props = {
    text: string
}

const TaskDetails = ( { text } : Props) => {
  return (
    <div>
        <p className={styles.text}>{text}</p>
    </div>
  )
}

export default TaskDetails