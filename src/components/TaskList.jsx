import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  deleteTask,
  toggleComplete,
  editTask
}) {

  return (

    <div>

      {tasks.map((task)=>(

        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          editTask={editTask}
        />

      ))}

    </div>

  );
}

export default TaskList;