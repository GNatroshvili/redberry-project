import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Comments.module.css";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import ResponseButton from "../Buttons/ResponseButton/Button";
import clsx from "clsx";
import axios, { AxiosError } from "axios";
import { AUTH_TOKEN } from "../../constants";

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

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `/api/tasks/${taskId}/comments`,
        {
          headers: {
            Authorization: AUTH_TOKEN,
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
  }, [taskId]);

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
        `/api/tasks/${taskId}/comments`,
        {
          text: content,
          parent_id: parentId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: AUTH_TOKEN,
          },
        }
      );

      if (response.status === 201) {
        const newComment: CommentType = response.data;

        setContent("");

        if (parentId) {
          setOpenReplyId(null);
        }

        setComments((prevComments) => {
          if (parentId) {
            return prevComments.map((comment) =>
              comment.id === parentId
                ? {
                    ...comment,
                    sub_comments: [...(comment.sub_comments || []), newComment],
                  }
                : comment
            );
          } else {
            return [...prevComments, newComment];
          }
        });
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
