import React from "react";
import styles from "./Difficulty.module.css";

type Props = {
  size?: any,
  color?: string,
  text?: string,
}

const Difficulty = ({ size, color, text } : Props) => {
  const getIcon = () => {
    switch (color) {
      case "red":
        return "/High.svg";
      case "orange":
        return "/Medium.svg";
      case "green":
        return "/Low.svg";
      default:
        return "";
    }
  };

  const getSizeClasses = () => {
    let textColorClass = "";
    let borderClass = "";
    let containerSizeClass = "";

    switch (color) {
      case "red":
        textColorClass = styles.textRed;
        borderClass = styles.borderRed;
        break;
      case "orange":
        textColorClass = styles.textOrange;
        borderClass = styles.borderOrange;
        break;
      case "green":
        textColorClass = styles.textGreen;
        borderClass = styles.borderGreen;
        break;
      default:
        textColorClass = styles.textDefault;
        borderClass = styles.borderDefault;
        break;
    }

    switch (size) {
      case "big":
        containerSizeClass = styles.containerBig;
        return {
          iconClass: styles.iconBig,
          textClass: styles.textBig,
          containerSizeClass,
          textColorClass,
          borderClass,
        };
      case "small":
        containerSizeClass = styles.containerSmall;
        return {
          iconClass: styles.iconSmall,
          textClass: styles.textSmall,
          containerSizeClass,
          textColorClass,
          borderClass,
        };
      default:
        return {
          iconClass: styles.iconDefault,
          textClass: styles.textDefault,
          containerSizeClass: "",
          textColorClass,
          borderClass,
        };
    }
  };

  const defaultText = text ?? 
    (color === "red" ? "მაღალი" : color === "green" ? "დაბალი" : color === "orange" ? "საშუალო" : "საშუალო");


  const {
    iconClass,
    textClass,
    containerSizeClass,
    textColorClass,
    borderClass,
  } = getSizeClasses();
  const iconSrc = getIcon();

  return (
    <div className={`${styles.container} ${containerSizeClass} ${borderClass}`}>
      {iconSrc && (
        <img
          src={iconSrc}
          alt={`${color} Icon`}
          className={`${styles.icon} ${iconClass}`}
        />
      )}
      <span className={`${styles.text} ${textClass} ${textColorClass}`}>
        {defaultText}
      </span>
    </div>
  );
};

export default Difficulty;