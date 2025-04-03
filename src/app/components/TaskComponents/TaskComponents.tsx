import React from 'react';
import styles from "./TaskComponents.module.css"

type Props = {
    title: string,
}

function TaskComponent({ title } : Props) {
  let iconSrc;

  switch (title) {
    case 'სტატუსი':
      iconSrc = '/status.svg';
      break;
    case 'თანამშრომელი':
      iconSrc = '/user.svg';
      break;
    case 'დავალების ვადა':
      iconSrc = '/deadline.svg';
      break;
    default:
      iconSrc = '/default.svg'; 
      break;
  }

  return (
    <div className={styles.TaskComponentsWrapper}>
      {iconSrc && <img src={iconSrc} alt={title} />}
      <span className={styles.title}>{title}</span>
    </div>
  );
}

export default TaskComponent;