import React from 'react'
import styles from "./PageTitle.module.css"

type Props = {
    text: any,
}

const PageTitle = ({ text }: Props) => {
    return (
        <div className={styles.textWrapper}>
            <p className={styles.text}>{text}</p>
        </div>
    )
}

export default PageTitle