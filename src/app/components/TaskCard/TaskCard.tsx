// import React from "react";
// import styles from "./TaskCard.module.css";
// import clsx from "clsx";
// import Difficulty from "../Details/Category/Difficulty/Difficulty";
// import Category from "../Details/Category/Category";

// type Color = "pink" | "orange" | "blue" | "yellow";

// type Props = {
//   color: Color;
// };

// const TaskCard = ({ color }: Props) => {
//   return (
//     <div className={styles.taskCardWrapper}>
//       <div className={styles.detailsWrapper}>
//         <div className={styles.leftSide}>
//           <Difficulty size="big" color="red" />
//           <Category title={"დიზაინი"} color={"orange"} />
//         </div>
//         <div className={styles.rightSide}>
//           <span>22 იანვ, 2022</span>
//         </div>
//       </div>
//       <div className={styles.contentWrapper}>
//         <p className={styles.title}>Redberry-ს საიტის ლენდინგის დიზაინი</p>
//         <p className={styles.description}>
//           შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს,
//           ნავიგაციას.
//         </p>
//       </div>
//       <div className={styles.addressWrapper}>
//         <img src="/avatar.svg" alt="avatar" />
//         <div className={styles.commentsWrapper}>
//             <img src="/comments.svg" alt="comments-icon" />
//             <span>8</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskCard;

import React from "react";
import styles from "./TaskCard.module.css";
import clsx from "clsx";
import Difficulty from "../Details/Category/Difficulty/Difficulty";
import Category from "../Details/Category/Category";
import { TaskType } from "../../types";

type Color = "pink" | "orange" | "blue" | "yellow";

type Props = {
  task: TaskType;
  borderColor?: Color;
};

const georgianMonthsShort = [
  "იანვ",
  "თებ",
  "მარ",
  "აპრ",
  "მაი",
  "ივნ",
  "ივლ",
  "აგვ",
  "სექ",
  "ოქტ",
  "ნოემ",
  "დეკ",
];

const TaskCard = ({ task, borderColor }: Props) => {
  const formatDateGeorgian = (
    dateString: string | null | undefined
  ): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return "N/A";
    }
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const day = date.getDate();
    return `${day} ${georgianMonthsShort[monthIndex]}, ${year}`;
  };

  const getPriorityColor = (
    priorityName: string | undefined
  ): "red" | "orange" | "green" | undefined => {
    if (priorityName === "მაღალი") return "red";
    if (priorityName === "საშუალო") return "orange";
    if (priorityName === "დაბალი") return "green";
    return undefined;
  };

  const getCategoryName = (
    CategoryName: string | undefined
  ):
    | "დიზაინი"
    | "მარკეტინგი"
    | "ლოჯისტიკა"
    | "ინფ. ტექ"
    | "ადმინისტრაცია"
    | "HR"
    | "ფინანსები"
    | "მედია"
    | undefined => {
    if (CategoryName === "დიზაინერების დეპარტამენტი") return "დიზაინი";
    if (CategoryName === "გაყიდვები და მარკეტინგის დეპარტამენტი")
      return "მარკეტინგი";
    if (CategoryName === "ლოჯოსტიკის დეპარტამენტი") return "ლოჯისტიკა";
    if (CategoryName === "ტექნოლოგიების დეპარტამენტი") return "ინფ. ტექ";
    if (CategoryName === "ადმინისტრაციის დეპარტამენტი") return "ადმინისტრაცია";
    if (CategoryName === "ადამიანური რესურსების დეპარტამენტი") return "HR";
    if (CategoryName === "ფინანსების დეპარტამენტი") return "ფინანსები";
    if (CategoryName === "მედიის დეპარტამენტი") return "მედია";
    return undefined;
  };

  const getCategoryColor = (CategoryName: string | undefined): Color => {
    if (CategoryName === "დიზაინერების დეპარტამენტი") return "pink";
    if (CategoryName === "ლოჯოსტიკის დეპარტამენტი") return "blue";
    if (CategoryName === "გაყიდვები და მარკეტინგის დეპარტამენტი")
      return "orange";
    if (CategoryName === "ტექნოლოგიების დეპარტამენტი") return "yellow";
    if (CategoryName === "ადმინისტრაციის დეპარტამენტი") return "pink";
    if (CategoryName === "ადამიანური რესურსების დეპარტამენტი") return "blue";
    if (CategoryName === "ფინანსების დეპარტამენტი") return "orange";
    if (CategoryName === "მედიის დეპარტამენტი") return "yellow";
    return "orange";
  };

  const getBorderColorStyle = () => {
    console.log("Task Status ID:", task.status?.id);
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

  return (
    <div className={clsx(styles.taskCardWrapper, getBorderColorStyle())}>
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
};

export default TaskCard;
