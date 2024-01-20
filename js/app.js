import React, {useState} from "react";
import { createRoot } from "react-dom/client";
import NewTask from "./NewTask";
import Task from "./Task";


const Main = () => {
  return (
      <>
        <NewTask/>
        <Task/>
      </>
  )
}

const App = () => {
  const [tasks, setTasks] = useState([])

  return <Main/>
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);
