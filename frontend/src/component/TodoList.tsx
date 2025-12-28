// BLOCK 1: Importing Dependencies
import React from "react";

// BLOCK 2: Defining Interfaces
export interface Task {
  _id: string; // Unique ID for the task
  title: string; // Task name
  completed: boolean; // True if done, False if not
}

interface TodoListProps {
  tasks: Task[];
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  editingTitle: string;
  setEditingTitle: (title: string) => void;
  editingTaskId: string | null;
  setEditingTaskId: (id: string | null) => void;
  startEditing: (id: string) => void;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// BLOCK 3: Declares the TodoList Component
const TodoList: React.FC<TodoListProps> = ({
  tasks,
  deleteTask,
  updateTask,
  editingTitle,
  setEditingTitle,
  editingTaskId,
  setEditingTaskId,
  startEditing,
  handleEditChange,
}) => {

  // BLOCK 4: Rendering the Task List and handling task actions
  return (
 <ul className="space-y-3 p-4">
  {tasks.map((task) => (
    <li
      key={task._id}
      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center flex-grow space-x-4">
        <input
          type="checkbox"
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
          checked={task.completed}
          onChange={() => updateTask(task._id, { completed: !task.completed })}
        />

        {editingTaskId === task._id ? (
          <div className="flex flex-grow items-center space-x-2">
            <input
              type="text"
              className="flex-grow px-3 py-1 text-lg border-2 border-blue-500 rounded-md outline-none"
              value={editingTitle}
              onChange={handleEditChange}
              autoFocus
            />
            <button
              className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => {
                updateTask(task._id, { title: editingTitle });
                setEditingTaskId(null);
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <span
            className={`text-lg transition-all duration-300 ${
              task.completed ? "line-through text-gray-400" : "text-gray-700"
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      {editingTaskId !== task._id && (
        <div className="flex items-center space-x-3 ml-4">
          <button
            onClick={() => {
              startEditing(task._id);
              setEditingTitle(task.title);
            }}
            className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTask(task._id)}
            className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </li>
  ))}
</ul>
  );
};

// BLOCK 5: Exporting the Component
export default TodoList;