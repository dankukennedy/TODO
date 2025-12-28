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
<div className="min-h-screen bg-slate-400 py-12 px-4 flex justify-center">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 h-fit">
    {/* Header */}
    <h1 className="text-4xl font-extrabold text-slate-800 mb-8 tracking-tight">
      Todo <span className="text-teal-600">App</span>
    </h1>

    {/* Input Section */}
    <div className="flex flex-col sm:flex-row gap-2 mb-8">
      <input
        className="grow px-4 py-3 bg-slate-100 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all text-slate-700 placeholder:text-slate-400"
        type="text"
        placeholder="What needs to be done?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-200 transition-all active:scale-95 cursor-pointer"
        onClick={addTask}
      >
        Add
      </button>
    </div>

    {/* Todo List Component */}
    <div className="text-left">
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
  </div>
</div>
  );
};

export default App
