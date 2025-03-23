// import React, { useState } from "react";
// import styles from "./Comments.module.css";
// import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
// import ResponseButton from "../Buttons/ResponseButton/Button";

// const Comments = () => {
//   const [text, setText] = useState("");
//   const [texts, setTexts] = useState<string[]>([]);
//   const [responses, setResponses] = useState<Record<number, { visible: boolean, responses: string[] }>>({});
//   const [newResponse, setNewResponse] = useState("");

//   const onChange = (e: any) => {
//     setText(e.target.value);
//   };

//   const onAdd = () => {
//     if (text.trim() !== "") {
//       setTexts([...texts, text]);
//       setResponses({
//         ...responses,
//         [texts.length]: { visible: false, responses: [] }, // Initialize response container for new comment
//       });
//       setText("");
//     }
//   };

//   const onInput = (e: any) => {
//     setNewResponse(e.target.value);
//   };

//   const onNewResponse = (index: number) => {
//     if (newResponse.trim() !== "") {
//       const updatedResponses = { ...responses };
//       updatedResponses[index].responses.push(newResponse); // Add new response to the correct comment
//       setResponses(updatedResponses);
//       setNewResponse(""); // Clear input
//     }
//   };

//   const onAddResponse = (index: number) => {
//     const updatedResponses = { ...responses };
//     updatedResponses[index].visible = !updatedResponses[index].visible; // Toggle visibility of response input
//     setResponses(updatedResponses);
//   };

//   const combinedClickHandler = (index: number) => {
//     onNewResponse(index);
//     onAddResponse(index);
//   };

//   return (
//     <div className={styles.inputWrapper}>
//       <div className={styles.actionsWrapper}>
//         <div className={styles.inputContainer}>
//           <input
//             placeholder={"დაწერე კომენტარი"}
//             type="text"
//             value={text}
//             className={styles.input}
//             onChange={onChange}
//           />
//         </div>
//         <div className={styles.buttonContainer}>
//           <PrimaryButton title={"დააკომენტარე"} onClick={onAdd} />
//         </div>
//       </div>
//       <div className={styles.test}>
//         <h3 className={styles.commentCount}>კომენტარები</h3>
//         <span className={styles.counts}>{texts.length}</span>
//       </div>
//       <div className={styles.commentsWrapper}>
//         {texts.map((text, index) => (
//           <div key={index} className={styles.commentField}>
//             <p className={styles.text}>{text}</p>
//             <ResponseButton
//               title={"უპასუხე"}
//               onClick={() => onAddResponse(index)}
//               className={styles.responseButton}
//             />
//             {responses[index].visible && (
//               <div className={styles.responseWrapper}>
//                 <input
//                   type="text"
//                   className={styles.input}
//                   placeholder={"დაწერე პასუხი"}
//                   value={newResponse}
//                   onChange={onInput}
//                 />
//                 <div className={styles.buttonContainer}>
//                   <PrimaryButton
//                     title={"დააკომენტარე"}
//                     onClick={() => combinedClickHandler(index)}
//                   />
//                 </div>
//               </div>
//             )}
//             <div className={styles.commentsWrapper}>
//               {responses[index].responses.map((response, responseIndex) => (
//                 <div key={responseIndex} className={styles.responseField}>
//                   <p className={styles.text}>{response}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Comments;

import React, { useState, useEffect } from "react";
import styles from "./Comments.module.css";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import ResponseButton from "../Buttons/ResponseButton/Button";
import clsx from "clsx";

const Comments = () => {
  const [text, setText] = useState("");
  const [texts, setTexts] = useState<string[]>([]);
  const [responses, setResponses] = useState<
    Record<number, { visible: boolean; responses: string[] }>
  >({});
  const [newResponse, setNewResponse] = useState("");

  // Load comments from localStorage when the component mounts
  useEffect(() => {
    const savedTexts = localStorage.getItem("comments");
    const savedResponses = localStorage.getItem("responses");

    if (savedTexts) {
      setTexts(JSON.parse(savedTexts));
    }
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
  }, []);

  // Update localStorage when texts change
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(texts));
  }, [texts]);

  // Update localStorage when responses change
  useEffect(() => {
    localStorage.setItem("responses", JSON.stringify(responses));
  }, [responses]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onAdd = () => {
    if (text.trim() !== "") {
      const newComments = [...texts, text];
      setTexts(newComments);
      setResponses({
        ...responses,
        [newComments.length - 1]: { visible: false, responses: [] }, // Initialize response container for new comment
      });
      setText("");
    }
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewResponse(e.target.value);
  };

  const onNewResponse = (index: number) => {
    if (newResponse.trim() !== "") {
      setResponses((prevResponses) => {
        const updatedResponses = { ...prevResponses };

        if (!updatedResponses[index]) {
          updatedResponses[index] = { visible: false, responses: [] };
        }

        // ✅ Create a NEW array instead of modifying the old one
        updatedResponses[index] = {
          ...updatedResponses[index],
          responses: [...updatedResponses[index].responses, newResponse], // ✅ New array
          visible: false, // ✅ Hide input field after adding response
        };
        return updatedResponses;
      });

      setNewResponse(""); // ✅ Clear input field
    }
  };

  const onAddResponse = (index: number) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [index]: {
        ...prevResponses[index],
        visible: !prevResponses[index]?.visible,
      },
    }));
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.actionsWrapper}>
        <div className={styles.inputContainer}>
          <input
            placeholder={"დაწერე კომენტარი"}
            type="text"
            value={text}
            className={styles.input}
            onChange={onChange}
          />
        </div>
        <div className={styles.buttonContainer}>
          <PrimaryButton title={"დააკომენტარე"} onClick={onAdd} />
        </div>
      </div>
      <div className={styles.test}>
        <h3 className={styles.commentCount}>კომენტარები</h3>
        <span className={styles.counts}>
          {texts.length +
            Object.values(responses).reduce(
              (sum, r) => sum + r.responses.length,
              0
            )}
        </span>
      </div>
      <div className={styles.commentsWrapper}>
        {texts.map((text, index) => (
          <div key={index} className={styles.commentField}>
            <div className={styles.commentAndAuthor}>
              <div className={styles.avatar}>
                <img src="./avatar.svg" alt="" />
              </div>
              <div>
                <p className={styles.authorName}>გელა ბარკალაია</p>
                <p className={clsx(styles.text, styles.comment)}>{text}</p>
              </div>
            </div>
            <ResponseButton
              title={"უპასუხე"}
              onClick={() => onAddResponse(index)}
              className={styles.responseButton}
            />
            {responses[index]?.visible && (
              <div className={styles.responseWrapper}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder={"დაწერე პასუხი"}
                  value={newResponse}
                  onChange={onInput}
                />
                <div className={styles.buttonContainer}>
                  <PrimaryButton
                    title={"დააკომენტარე"}
                    onClick={() => onNewResponse(index)}
                  />
                </div>
              </div>
            )}
            <div className={styles.commentsWrapper}>
              {responses[index]?.responses?.map((response, responseIndex) => (
                <div key={responseIndex} className={styles.responseField}>
                  <div className={styles.avatar}>
                    <img src="./avatar.svg" alt="" />
                  </div>
                  <div>
                    <p className={styles.authorName}>გრიშა ონიანი</p>
                    <p className={clsx(styles.text, styles.response)}>
                      {response}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
