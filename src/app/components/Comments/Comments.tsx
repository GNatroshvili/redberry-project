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

// import React, { useState, useEffect } from "react";
// import styles from "./Comments.module.css";
// import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
// import ResponseButton from "../Buttons/ResponseButton/Button";
// import clsx from "clsx";

// const Comments = () => {
//   const [text, setText] = useState("");
//   const [texts, setTexts] = useState<string[]>([]);
//   const [responses, setResponses] = useState<
//     Record<number, { visible: boolean; responses: string[] }>
//   >({});
//   const [newResponse, setNewResponse] = useState("");

//   // Load comments from localStorage when the component mounts
//   useEffect(() => {
//     const savedTexts = localStorage.getItem("comments");
//     const savedResponses = localStorage.getItem("responses");

//     if (savedTexts) {
//       setTexts(JSON.parse(savedTexts));
//     }
//     if (savedResponses) {
//       setResponses(JSON.parse(savedResponses));
//     }
//   }, []);

//   // Update localStorage when texts change
//   useEffect(() => {
//     localStorage.setItem("comments", JSON.stringify(texts));
//   }, [texts]);

//   // Update localStorage when responses change
//   useEffect(() => {
//     localStorage.setItem("responses", JSON.stringify(responses));
//   }, [responses]);

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setText(e.target.value);
//   };

//   const onAdd = () => {
//     if (text.trim() !== "") {
//       const newComments = [...texts, text];
//       setTexts(newComments);
//       setResponses({
//         ...responses,
//         [newComments.length - 1]: { visible: false, responses: [] }, // Initialize response container for new comment
//       });
//       setText("");
//     }
//   };

//   const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewResponse(e.target.value);
//   };

//   const onNewResponse = (index: number) => {
//     if (newResponse.trim() !== "") {
//       setResponses((prevResponses) => {
//         const updatedResponses = { ...prevResponses };

//         if (!updatedResponses[index]) {
//           updatedResponses[index] = { visible: false, responses: [] };
//         }

//         // ✅ Create a NEW array instead of modifying the old one
//         updatedResponses[index] = {
//           ...updatedResponses[index],
//           responses: [...updatedResponses[index].responses, newResponse], // ✅ New array
//           visible: false, // ✅ Hide input field after adding response
//         };
//         return updatedResponses;
//       });

//       setNewResponse(""); // ✅ Clear input field
//     }
//   };

//   const onAddResponse = (index: number) => {
//     setResponses((prevResponses) => ({
//       ...prevResponses,
//       [index]: {
//         ...prevResponses[index],
//         visible: !prevResponses[index]?.visible,
//       },
//     }));
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
//         <span className={styles.counts}>
//           {texts.length +
//             Object.values(responses).reduce(
//               (sum, r) => sum + r.responses.length,
//               0
//             )}
//         </span>
//       </div>
//       <div className={styles.commentsWrapper}>
//         {texts.map((text, index) => (
//           <div key={index} className={styles.commentField}>
//             <div className={styles.commentAndAuthor}>
//               <div className={styles.avatar}>
//                 <img src="./avatar.svg" alt="" />
//               </div>
//               <div>
//                 <p className={styles.authorName}>გელა ბარკალაია</p>
//                 <p className={clsx(styles.text, styles.comment)}>{text}</p>
//               </div>
//             </div>
//             <ResponseButton
//               title={"უპასუხე"}
//               onClick={() => onAddResponse(index)}
//               className={styles.responseButton}
//             />
//             {responses[index]?.visible && (
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
//                     onClick={() => onNewResponse(index)}
//                   />
//                 </div>
//               </div>
//             )}
//             <div className={styles.commentsWrapper}>
//               {responses[index]?.responses?.map((response, responseIndex) => (
//                 <div key={responseIndex} className={styles.responseField}>
//                   <div className={styles.avatar}>
//                     <img src="./avatar.svg" alt="" />
//                   </div>
//                   <div>
//                     <p className={styles.authorName}>გრიშა ონიანი</p>
//                     <p className={clsx(styles.text, styles.response)}>
//                       {response}
//                     </p>
//                   </div>
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

// components/Comments/Comments.tsx
// import React, { useState, useEffect } from "react";
// import styles from "./Comments.module.css";
// import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
// import clsx from "clsx";
// import axios, { AxiosError } from "axios";

// interface CommentType {
//   id: number;
//   content: string;
//   employee: {
//     name: string;
//     surname: string;
//     avatar: string;
//   };
// }

// interface CommentsProps {
//   taskId: string;
// }

// interface ValidationErrorResponse {
//   message: string;
//   errors?: {
//     [key: string]: string[];
//   };
// }

// const Comments = ({ taskId }: CommentsProps) => {
//   const [text, setText] = useState("");
//   const [comments, setComments] = useState<CommentType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [validationErrors, setValidationErrors] = useState<string[]>([]);

//   const fetchComments = async () => {
//     if (!taskId) return;

//     try {
//       const response = await axios.get(
//         `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer 9e882e2f-3297-435e-b537-67817136c385`,
//           },
//         }
//       );
//       setComments(response.data?.data || []);
//     } catch (err) {
//       console.error("Error fetching comments:", err);
//       setError("Failed to load comments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [taskId]);

//   const handleAddComment = async () => {
//     setValidationErrors([]);
//     setError(null);

//     if (!text.trim()) {
//       setValidationErrors(["Comment cannot be empty"]);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
//         { text },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer 9e882e2f-3297-435e-b537-67817136c385`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         setText("");
//         await fetchComments();
//       }
//     } catch (err) {
//       const error = err as AxiosError<ValidationErrorResponse>;
//       if (error.response?.status === 422) {
//         const serverErrors = error.response.data?.errors || {};
//         const errorMessages = Object.values(serverErrors).flat();
//         setValidationErrors(errorMessages);
//       } else {
//         setError("Failed to post comment. Please try again.");
//       }
//     }
//   };

//   if (loading) return <div className={styles.loading}>Loading comments...</div>;

//   return (
//     <div className={styles.inputWrapper}>
//       <div className={styles.actionsWrapper}>
//         <div className={styles.inputContainer}>
//           <input
//             placeholder="დაწერე კომენტარი"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className={styles.input}
//             disabled={loading}
//           />

//           {validationErrors.length > 0 && (
//             <div className={styles.errorContainer}>
//               {validationErrors.map((error, index) => (
//                 <p key={index} className={styles.errorMessage}>
//                   {error}
//                 </p>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className={styles.buttonContainer}>
//           <PrimaryButton
//             title="დააკომენტარე"
//             onClick={handleAddComment}
//             disabled={loading || !text.trim()}
//           />
//         </div>
//       </div>

//       {error && <div className={styles.error}>{error}</div>}

//       <div className={styles.commentsWrapper}>
//         {comments.map((comment) => (
//           <div key={comment.id} className={styles.commentField}>
//             <div className={styles.commentAndAuthor}>
//               <img
//                 src={comment.employee.avatar || '/default-avatar.png'}
//                 alt="Author"
//                 className={styles.avatar}
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).src = '/default-avatar.png';
//                 }}
//               />
//               <div className={styles.commentContent}>
//                 <p className={styles.authorName}>
//                   {comment.employee.name} {comment.employee.surname}
//                 </p>
//                 <p className={clsx(styles.text, styles.comment)}>
//                   {comment.content}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Comments;

// import React, { useState, useEffect } from "react";
// import styles from "./Comments.module.css";
// import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
// import clsx from "clsx";
// import axios, { AxiosError } from "axios";
// import ResponseButton from "../Buttons/ResponseButton/Button";

// interface CommentType {
//   id: number;
//   text: string;
//   task_id: number;
//   parent_id: number | null;
//   author_avatar: string;
//   author_nickname: string;
//   sub_comments: CommentType[];
// }

// interface CommentsProps {
//   taskId: string;
// }

// interface ValidationErrorResponse {
//   message: string;
//   errors?: {
//     [key: string]: string[];
//   };
// }

// const Comments = ({ taskId }: CommentsProps) => {
//   const [text, setText] = useState("");
//   const [comments, setComments] = useState<CommentType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [validationErrors, setValidationErrors] = useState<string[]>([]); // Properly defined state
//   const countAllComments = (comments: CommentType[]): number => {
//     return comments.reduce((total, comment) => {
//       return total + 1 + countAllComments(comment.sub_comments);
//     }, 0);
//   };
//   const totalComments = countAllComments(comments);

//   const fetchComments = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
//         {
//           headers: {
//             Authorization: `Bearer 9e882e2f-3297-435e-b537-67817136c385`,
//           },
//         }
//       );

//       // Log the actual API response
//       console.log("API Response:", response.data);

//       // Handle different possible response structures
//       const commentsData = response.data.data || response.data || [];
//       setComments(Array.isArray(commentsData) ? commentsData : []);
//     } catch (err) {
//       console.error("Error fetching comments:", err);
//       setError("Failed to load comments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (taskId) fetchComments();
//   }, [taskId]);

//   const handleAddComment = async () => {
//     setValidationErrors([]); // Properly initialized
//     setError(null);

//     if (!text.trim()) {
//       setValidationErrors(["Comment cannot be empty"]);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
//         { text },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer 9e882e2f-3297-435e-b537-67817136c385`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         setText("");
//         await fetchComments();
//       }
//     } catch (err) {
//       const error = err as AxiosError<ValidationErrorResponse>;
//       if (error.response?.status === 422) {
//         const serverErrors = error.response.data?.errors || {};
//         const errorMessages = Object.values(serverErrors).flat();
//         setValidationErrors(errorMessages);
//       } else {
//         setError("Failed to post comment. Please try again.");
//       }
//     }
//   };

//   if (loading) return <div className={styles.loading}>Loading comments...</div>;

//   return (
//     <div className={styles.inputWrapper}>
//       <div className={styles.actionsWrapper}>
//         <div className={styles.inputContainer}>
//           <input
//             placeholder="დაწერე კომენტარი"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className={styles.input}
//             disabled={loading}
//           />

//           {validationErrors.length > 0 && (
//             <div className={styles.errorContainer}>
//               {validationErrors.map((error, index) => (
//                 <p key={index} className={styles.errorMessage}>
//                   {error}
//                 </p>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className={styles.buttonContainer}>
//           <PrimaryButton
//             title="დააკომენტარე"
//             onClick={handleAddComment}
//             disabled={loading || !text.trim()}
//           />
//         </div>
//       </div>

//       {error && <div className={styles.error}>{error}</div>}

//       <div className={styles.commentsWrapper}>
//         <div className={styles.test}>
//           <h3 className={styles.commentCount}>კომენტარები</h3>
//           <span className={styles.counts}>
//             {totalComments} {/* Display total count here */}
//           </span>
//         </div>
//         {comments.length > 0 ? (
//           comments.map((comment) => (
//             <div key={comment.id} className={styles.commentField}>
//               <div className={styles.commentAndAuthor}>
//                 <img
//                   src={comment.author_avatar} // Changed from comment.employee.avatar
//                   alt="Author"
//                   className={styles.avatar}
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src = "/default-avatar.png";
//                   }}
//                 />
//                 <div>
//                   <p className={styles.authorName}>
//                     {comment.author_nickname}{" "}
//                     {/* Changed from employee.name/surname */}
//                   </p>
//                   <p className={clsx(styles.text, styles.comment)}>
//                     {comment.text} {/* Changed from content */}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className={styles.noComments}>No comments yet</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Comments;

import React, { useState, useEffect, useRef } from "react";
import styles from "./Comments.module.css";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import ResponseButton from "../Buttons/ResponseButton/Button";
import clsx from "clsx";
import axios, { AxiosError } from "axios";

interface CommentType {
  id: number;
  text: string;
  task_id: number;
  parent_id: number | null;
  author_avatar: string;
  author_nickname: string;
  sub_comments: CommentType[];
}

interface CommentsProps {
  taskId: string;
}

interface ValidationErrorResponse {
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

const Comments = ({ taskId }: CommentsProps) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [replyInputs, setReplyInputs] = useState<Record<number, string>>({});
  const [openReplyId, setOpenReplyId] = useState<number | null>(null);

  const countAllComments = (comments: CommentType[] | undefined): number => {
    if (!comments || !Array.isArray(comments)) return 0;
    return comments.reduce((total, comment) => {
      const subCount = comment.sub_comments
        ? countAllComments(comment.sub_comments)
        : 0;
      return total + 1 + subCount;
    }, 0);
  };

  const totalComments = countAllComments(comments);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
        {
          headers: {
            Authorization: `Bearer 9e882e2f-3297-435e-b537-67817136c385`,
          },
        }
      );

      const apiData = response.data?.data || response.data;

      if (Array.isArray(apiData)) {
        setComments(apiData);
      } else {
        console.warn("Unexpected API response format:", response.data);
        setComments([]);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (taskId) fetchComments();
  }, [taskId]);

  const handleReplyClick = (commentId: number) => {
    setOpenReplyId(openReplyId === commentId ? null : commentId);
    setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
  };

  const handleReplyChange = (commentId: number, value: string) => {
    setReplyInputs((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  };

  const handleAddComment = async (parentId: number | null = null) => {
    const content = parentId ? replyInputs[parentId] || "" : text;
    const setContent = parentId
      ? (value: string) => handleReplyChange(parentId, value)
      : setText;

    setValidationErrors([]);
    setError(null);

    try {
      if (!content.trim()) {
        setValidationErrors(["Comment cannot be empty"]);
        return;
      }

      const response = await axios.post(
        `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
        {
          text: content,
          parent_id: parentId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 9e882e2f-3297-435e-b537-67817136c385`,
          },
        }
      );

      if (response.status === 201) {
        setContent("");
        if (parentId) {
          setOpenReplyId(null);
        }
        await fetchComments();
      }
    } catch (err) {
      const error = err as AxiosError<ValidationErrorResponse>;
      if (error.response?.status === 422) {
        const serverErrors = error.response.data?.errors || {};
        const errorMessages = Object.values(serverErrors).flat();
        setValidationErrors(errorMessages);
      } else {
        setError("Failed to post comment. Please try again.");
      }
    }
  };

  const CommentTree = ({
    comment,
    depth = 0,
  }: {
    comment: CommentType;
    depth?: number;
  }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (openReplyId === comment.id && inputRef.current) {
        inputRef.current.focus();
      }
    }, [openReplyId, comment.id]);

    return (
      <div
        className={clsx(styles.commentField, depth > 0 && styles.subComment)}
      >
        <div className={styles.commentAndAuthor}>
          <img
            src={comment.author_avatar}
            alt="Author"
            className={styles.avatar}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/default-avatar.png";
            }}
          />
          <div>
            <p className={styles.authorName}>{comment.author_nickname}</p>
            <p className={clsx(styles.text, styles.comment)}>{comment.text}</p>
            {depth === 0 && (
              <ResponseButton
                title="უპასუხე"
                onClick={() => handleReplyClick(comment.id)}
                className={styles.responseButton}
              />
            )}
          </div>
        </div>

        {openReplyId === comment.id && (
          <div className={styles.responseWrapper}>
            <div className={styles.inputContainer}>
              <input
                ref={inputRef}
                placeholder="დაწერე პასუხი"
                value={replyInputs[comment.id] || ""}
                onChange={(e) => {
                  handleReplyChange(comment.id, e.target.value);
                  setValidationErrors([]);
                }}
                className={styles.input}
                disabled={loading}
              />
              {validationErrors.length > 0 && (
                <div className={styles.errorContainer}>
                  {validationErrors.map((error, index) => (
                    <p key={index} className={styles.errorMessage}>
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.buttonContainer}>
              <PrimaryButton
                title="დააკომენტარე"
                onClick={() => handleAddComment(comment.id)}
                disabled={loading || !replyInputs[comment.id]?.trim()}
              />
            </div>
          </div>
        )}

        {comment.sub_comments?.length > 0 && (
          <div className={styles.subComments}>
            {comment.sub_comments.map((subComment) => (
              <CommentTree
                key={subComment.id}
                comment={subComment}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) return <div className={styles.loading}>Loading comments...</div>;

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.actionsWrapper}>
        <div className={styles.inputContainer}>
          <input
            placeholder="დაწერე კომენტარი"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setValidationErrors([]);
            }}
            className={styles.input}
            disabled={loading}
          />
          {validationErrors.length > 0 && (
            <div className={styles.errorContainer}>
              {validationErrors.map((error, index) => (
                <p key={index} className={styles.errorMessage}>
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className={styles.buttonContainer}>
          <PrimaryButton
            title="დააკომენტარე"
            onClick={() => handleAddComment()}
            disabled={loading || !text.trim()}
          />
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.commentsWrapper}>
        <div className={styles.test}>
          <h3 className={styles.commentCount}>კომენტარები</h3>
          <span className={styles.counts}>{totalComments}</span>
        </div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentTree key={comment.id} comment={comment} />
          ))
        ) : (
          <p className={styles.noComments}>No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
