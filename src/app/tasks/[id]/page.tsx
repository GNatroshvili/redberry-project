"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { TaskType } from "../../types";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const [task, setTask] = useState<TaskType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTask() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://momentum.redberryinternship.ge/api/tasks/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer 9e882e2f-3297-435e-b537-67817136c385`,
            },
          }
        );
        setTask(response.data);
      } catch (err) {
        console.error("Error fetching task:", err);
        setError("Failed to fetch task details.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchTask();
    }
  }, [id]);

  return (
    <div>
      <h1>Task Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : task ? (
        <>
          <p>
            <strong>Name:</strong> {task.name}
          </p>
          <p>
            <strong>Description:</strong> {task.description}
            <strong>Description:</strong> {task.due_date}
            <strong>Description:</strong> {task.department?.name}
            <strong>Description:</strong> {task.status?.name}
            <strong>Description:</strong> {task.priority?.name}
          </p>
        </>
      ) : (
        <p>No task found.</p>
      )}
    </div>
  );
}
