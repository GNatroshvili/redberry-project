import React from "react";
import styles from "./TaskCard.module.css";
import clsx from "clsx";
import Difficulty from "../Details/Category/Difficulty/Difficulty";
import Category from "../Details/Category/Category";

type Color = "pink" | "orange" | "blue" | "yellow";

type Props = {
  color: Color;
};

const TaskCard = ({ color }: Props) => {
  return (
    <div className={styles.taskCardWrapper}>
      <div className={styles.detailsWrapper}>
        <div className={styles.leftSide}>
          <Difficulty size="big" color="red" />
          <Category title={"დიზაინი"} color={"orange"} />
        </div>
        <div className={styles.rightSide}>
          <span>22 იანვ, 2022</span>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <p className={styles.title}>Redberry-ს საიტის ლენდინგის დიზაინი</p>
        <p className={styles.description}>
          შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს,
          ნავიგაციას.
        </p>
      </div>
      <div className={styles.addressWrapper}>
        <img src="/avatar.svg" alt="avatar" />
        <div className={styles.commentsWrapper}>
            <img src="/comments.svg" alt="comments-icon" />
            <span>8</span>
        </div>

      </div>
    </div>
  );
};

export default TaskCard;
