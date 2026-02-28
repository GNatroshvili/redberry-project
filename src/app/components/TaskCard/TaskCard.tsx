import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "./TaskCard.module.css";
import clsx from "clsx";
import Difficulty from "../Details/Category/Difficulty/Difficulty";
import Category from "../Details/Category/Category";
import { TaskType } from "../../types";
import {
  getCategoryName,
  getCategoryColor,
  getPriorityColor,
  formatDateGeorgian,
} from "../../constants";

type Props = {
  task: TaskType;
  borderColor?: string;
  disableNavigation?: boolean;
};

const TaskCard = React.memo(({ task, borderColor, disableNavigation }: Props) => {
  const router = useRouter();

  const getBorderColorStyle = () => {
    switch (task.status?.id) {
      case 1:
        return styles.borderYellow;
      case 2:
        return styles.borderOrange;
      case 3:
        return styles.borderPink;
      case 4:
        return styles.borderBlue;
      default:
        return "";
    }
  };

  const handleClick = useCallback(() => {
    if (!disableNavigation) {
      router.push(`/task/${task.id}`);
    }
  }, [disableNavigation, router, task.id]);

  return (
    <div
      className={clsx(styles.taskCardWrapper, getBorderColorStyle())}
      style={{
        borderColor: borderColor,
        cursor: disableNavigation ? "grabbing" : "pointer",
      }}
      onClick={handleClick}
    >
      <div className={styles.detailsWrapper}>
        <div className={styles.leftSide}>
          <Difficulty
            size="big"
            color={getPriorityColor(task.priority?.name)}
          />
          <Category
            title={getCategoryName(task.department?.name) || "N/A"}
            color={getCategoryColor(task.department?.name)}
          />
        </div>
        <div className={styles.rightSide}>
          <span className={styles.dueDate}>
            {formatDateGeorgian(task.due_date)}
          </span>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <p className={styles.title}>{task.name}</p>
        <p className={styles.description}>{task.description}</p>
      </div>
      <div className={styles.addressWrapper}>
        <img
          src={task.employee?.avatar || "/avatar.svg"}
          alt={task.employee?.name}
          onError={(e) => (e.currentTarget.src = "/avatar.svg")}
          className={styles.img}
        />
        <div className={styles.commentsWrapper}>
          <img src="/Comments.svg" alt="comments-icon" />
          <span>{task.total_comments}</span>
        </div>
      </div>
    </div>
  );
});

TaskCard.displayName = "TaskCard";

export default TaskCard;
