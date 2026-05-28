import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {

  const [tasks,setTasks] =useState(()=>{
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
    ? JSON.parse(savedTasks):[];
  })
  const [darkMode,setDarkMode] = useState(true);

  const[filter,setFilter]=useState("all")
  const [search,setSearch] = useState("");

  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks))
  },[tasks]);

  const addTask = (text) => {

    const newTask = {
      id: Date.now(),
      text,
      completed:false
    };

    setTasks([...tasks,newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
const clearAllTasks=()=>{
  const confirmDelete =
  window.confirm("Delete all tasks?");
  if (confirmDelete){
    setTasks([]);
  }
}
  const toggleComplete = (id) => {

    setTasks(
      tasks.map(task =>
        task.id === id
        ? {...task,completed:!task.completed}
        : task
      )
    );
  };

  const editTask = (id,newText) => {

    setTasks(
      tasks.map(task =>
        task.id===id
        ? {...task,text:newText}
        : task
      )
    );
  };
const filteredTasks = tasks.filter(task => {

  const matchesSearch =
    task.text.toLowerCase().includes(search.toLowerCase());

  if(filter==="completed"){
    return task.completed && matchesSearch;
  }

  if(filter==="pending"){
    return !task.completed && matchesSearch;
  }

  return matchesSearch;
});
 

  const completedTasks =
    tasks.filter(task => task.completed).length;

  const pendingTasks =
    tasks.filter(task => !task.completed).length;
    useEffect(()=>{
      localStorage.setItem(
        "tasks" ,
        JSON.stringify(tasks)
      );
    },[tasks]);

  return (

    <div className={darkMode ? "app dark" : "app light"}>

      <div className="container">

        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <TaskForm addTask={addTask} />

        
        <input
          type="text"
          placeholder="Search tasks..."
          className="search-input"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
  <div className="task-stats">
  <p onClick={()=>setFilter("all")}>
    Total: {tasks.length}
  </p>

  <p onClick={()=>setFilter("completed")}>
    Completed: {completedTasks}
  </p>

  <p onClick={()=>setFilter("pending")}>
    Pending: {pendingTasks}
  </p>
  <button className="clear-btn"onClick={clearAllTasks}>Clear All Tasks</button>

</div>
        <TaskList
          tasks={filteredTasks}  
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          editTask={editTask}
        />
        {
          filteredTasks.length === 0 &&(<h2 className="empty-text">No Tasks Added</h2>)
        }

      </div>

    </div>
  );
}

export default App;