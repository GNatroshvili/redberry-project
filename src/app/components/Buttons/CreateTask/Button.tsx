import React, { useState } from 'react'
import styles from "./Button.module.css"
import InputField from '../../InputField/InputField'

const Button = (props: any) => {
  const [titleInputValue, setTitleInputValue] = useState("");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");

  const handleTitleInputChange = (value: string) => {
    setTitleInputValue(value);
    console.log("Title in Parent:", value);
  };

  const handleDescriptionInputChange = (value: string) => {
    setDescriptionInputValue(value);
    console.log("Description in Parent:", value);
  };



  return (
    <div>
      <button className={styles.button}>
        {props.title}
      </button>
      <InputField
        title="სათაური"
        width="300px"
        height="40px"
        onInputChange={handleTitleInputChange}
      />
      <p>Title Value in Parent: {titleInputValue}</p>
        <p>Description Value in Parent: {descriptionInputValue}</p>
    </div>
  )
}

export default Button;
