import { useState } from "react";

function TaskItem({
  task,
  deleteTask,
  toggleComplete,
  editTask
}) {

  const [isEditing,setIsEditing] = useState(false);

  const [newText,setNewText] = useState(task.text);

  const handleSave = () => {

    editTask(task.id,newText);

    setIsEditing(false);
  };

  return (

    <div className="task-item">

      {isEditing ? (

        <input
          type="text"
          value={newText}
          onChange={(e)=>setNewText(e.target.value)}
          className="edit-input"
        />

      ) : (

        <p
          onClick={()=>toggleComplete(task.id)}
          className={task.completed ? "completed" : ""}
        >
          {task.text}
        </p>

      )}

      <div className="task-actions">

        {isEditing ? (

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save
          </button>

        ) : (

          <button
            className="edit-btn"
            onClick={()=>setIsEditing(true)}
          >
            Edit
          </button>

        )}

        <button
          className="delete-btn"
          onClick={()=>deleteTask(task.id)}
        >
          Delete
        </button>

      </div>

    </div>

  );
}

export default TaskItem;