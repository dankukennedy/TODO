import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import TodoList from './component/TodoList'
import type { Task } from './component/TodoList'

const App:React.FC =() =>{
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');

  useEffect(()=>{
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>('http://localhost:3001/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchTasks();
  }, []);


  const addTask = async () => {
    if(!task) return;
    try {
      console.log("Adding task:", task);
      const response = await axios.post<Task>
      ('http://localhost:3001/tasks', { title: task, completed:false },
        {headers: {'Content-Type': 'application/json'}});
        setTasks([...tasks, response.data]);
        setTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }


  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  const updateTask = async (id: string, updatedTask:Partial<Task>) => {
    try {
      const response = await axios.put<Task>(`http://localhost:3001/tasks/${id}`, updatedTask,
        {headers:{'Content-Type':'application/json'}});
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      setEditingTaskId(null)
      setEditingTitle("")
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  const startEditing = (id:string)=>{
    setEditingTaskId(id)
  }
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setEditingTitle(e.target.value)
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <TodoList
        tasks={tasks}
        deleteTask={deleteTask}
        updateTask={updateTask}
        editingTitle={editingTitle}
        setEditingTitle={setEditingTitle}
        editingTaskId={editingTaskId}
        setEditingTaskId={setEditingTaskId}
        startEditing={startEditing}
        handleEditChange={handleEditChange}
      />
    </div>
  );
};



export default App
