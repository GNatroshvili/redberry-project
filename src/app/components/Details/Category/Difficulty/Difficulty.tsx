import React from "react";
import styles from "./Difficulty.module.css"; // Import the CSS module

const Difficulty = ({ size, color, text }) => {
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
        return {
          iconClass: styles.iconBig,
          textClass: styles.textBig,
          gapClass: styles.gapBig,
          textColorClass,
          borderClass,
        };
      case "small":
        return {
          iconClass: styles.iconSmall,
          textClass: styles.textSmall,
          gapClass: styles.gapSmall,
          textColorClass,
          borderClass,
        };
      default:
        return {
          iconClass: styles.iconDefault,
          textClass: styles.textDefault,
          gapClass: styles.gapDefault,
          textColorClass,
          borderClass,
        };
    }
  };

  const { iconClass, textClass, gapClass, textColorClass, borderClass } = getSizeClasses();
  const iconSrc = getIcon();

  return (
    <div className={`${styles.container} ${gapClass} ${borderClass}`}>
      {iconSrc && (
        <img
          src={iconSrc}
          alt={`${color} Icon`}
          className={`${styles.icon} ${iconClass}`}
        />
      )}

      <span className={`${styles.text} ${textClass} ${textColorClass}`}>
        {text}
      </span>
    </div>
  );
};

export default Difficulty;