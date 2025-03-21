'use client'
import React from 'react'
import { TagColor } from '../../types'
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import styles from './CheckboxWithText.module.scss'

const CheckboxWithText = () => {
    return (
        <div>
            <CustomCheckbox color={"purple"} handleChange={() => { }} />
        </div>
    )
}

export default CheckboxWithText