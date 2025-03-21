"use client"
import styles from "./CustomCheckbox.module.css"
import { useState } from "react"
import { TagColor } from "../../types"
import CheckboxIcon from "../../icons/CheckboxIcon"

const returnColor = (color: TagColor) => {
    switch (color) {
        case 'pink':
            return 'rgba(255, 102, 168, 1)'
        case 'blue':
            return 'rgba(137, 182, 255, 1)'
        case 'orange':
            return 'rgba(253, 154, 106, 1)'
        case 'purple':
            return 'rgba(131, 56, 236, 1)'
        case 'yellow':
            return 'rgba(255, 216, 109, 1)'

    }
} 

const CustomCheckbox = ({
    color = 'purple',
    handleChange
} : {
    color ?: TagColor,
    handleChange: () => void 
}) => {
    const [checked, setchecked] = useState(false)

    const handleToggle = () => {
        setchecked((prev) => !prev)
        handleChange()
    }

    return ( 
        <button className={styles.container} onClick={handleToggle}>
            <CheckboxIcon checked={checked} stroke={returnColor(color)}/>
        </button>
    )
}

export default CustomCheckbox