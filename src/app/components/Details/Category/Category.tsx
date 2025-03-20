import clsx from "clsx";
 import React from "react";
 import styles from "./Category.module.css";
 type Color = "pink" | "orange" | "blue" | "yellow";
 
 type Props = {
   title: string;
   color: Color;
 };
 const Category = ({ title, color }: Props) => {
   return <div className={clsx(styles.category, styles[color])}>{title}</div>;
 };
 
 export default Category;