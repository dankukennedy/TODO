import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TodoList from './component/TodoList'
import type { Task } from './component/TodoList'

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  // States for NEW tasks
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // States for EDITING existing tasks
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');
  const [editingContent, setEditingContent] = useState<string>('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>('http://localhost:3000/api/tasks');
        if (Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        setTasks([]); // Fallback to empty array
      }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    console.log("Adding task:", { title, content });
    try {
      const response = await axios.post<Task>(
        'http://localhost:3000/api/tasks',
        { title, content, completed: false },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setTasks([...tasks, response.data]);
      setTitle(''); // Clear inputs
      setContent('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await axios.delete<Task>(`http://localhost:3000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  const updateTask = async (id: string, updatedTask: Partial<Task>) => {
    try {
      const response = await axios.put<Task>(
        `http://localhost:3000/api/tasks/${id}`, 
        updatedTask,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      setEditingTaskId(null);
      setEditingTitle("");
      setEditingContent("");
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  // UPDATED: Accepts id, content, title to match TodoList's expected signature
  const startEditing = (id: string, content: string, title: string) => {
    setEditingTaskId(id);
    setEditingTitle(title);
    setEditingContent(content || "");
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "editingTitle") {
      setEditingTitle(value);
    } else if (name === "editingContent") {
      setEditingContent(value);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 flex justify-center">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8 h-fit border border-slate-200">
        <h1 className="text-4xl font-black text-slate-800 mb-8 tracking-tight text-center">
          Todo <span className="text-teal-600">App</span>
        </h1>

        {/* ADD TASK SECTION */}
        <div className="flex flex-col gap-3 mb-10 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <input
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all"
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all resize-none"
            placeholder="Add a description (optional)..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98]"
            onClick={addTask}
          >
            Add New Task
          </button>
        </div>

        {/* TODO LIST SECTION */}
        <div className="text-left">
          <TodoList
            tasks={tasks}
            deleteTask={deleteTask}
            updateTask={updateTask}
            editingTitle={editingTitle}
            editingContent={editingContent}
            setEditingContent={setEditingContent}
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

export default App;