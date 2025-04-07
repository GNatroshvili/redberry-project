import React from 'react'
import styles from "./Condition.module.css"
import clsx from "clsx";

type Color = "pink" | "orange" | "blue" | "yellow";
 
type Props = {
  title: string;
  color: Color;
  count: number;
};


const Condition = ({ title, color }: Props) => {
    return <div className={clsx(styles.condition, styles[color])}>{title}</div>;
};
 

export default Condition