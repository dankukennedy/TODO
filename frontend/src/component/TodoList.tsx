// BLOCK 1: Importing Dependencies
import React from "react";

// BLOCK 2: Defining Interfaces
export interface Task {
  _id: string; // Unique ID for the task
  title: string; // Task name
  content:string //Task Content
  completed: boolean; // True if done, False if not
}

interface TodoListProps {
  tasks: Task[];
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  editingTitle: string;
  editingContent: string
  setEditingContent: (content: string)=> void
  setEditingTitle: (title: string) => void;
  editingTaskId: string | null;
  setEditingTaskId: (id: string | null) => void;
  startEditing: (id: string, content: string, title: string) => void;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

// BLOCK 3: Declares the TodoList Component
// BLOCK 3: Declares the TodoList Component
const TodoList: React.FC<TodoListProps> = ({
  tasks,
  deleteTask,
  updateTask,
  editingTitle,
  setEditingTitle,
  editingTaskId,
  editingContent,
  setEditingContent,
  setEditingTaskId,
  startEditing,
  handleEditChange,
}) => {

  // BLOCK 4: Rendering the Task List and handling task actions
  return (
    <ul className="space-y-4 p-4">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="flex items-start justify-between p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-start grow space-x-4">
            <input
              type="checkbox"
              className="mt-1.5 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              checked={task.completed}
              onChange={() => updateTask(task._id, { completed: !task.completed })}
            />

            {editingTaskId === task._id ? (
              /* --- EDIT MODE (Stacked Layout) --- */
              <div className="flex flex-col grow space-y-3">
                <input
                  type="text"
                  name="editingTitle" // REQUIRED for handleEditChange
                  className="grow px-3 py-1 text-lg font-bold border-b-2 border-blue-500 outline-none"
                  value={editingTitle}
                  onChange={handleEditChange}
                  autoFocus
                />
                <textarea
                  name="editingContent" // REQUIRED for handleEditChange
                  rows={4}
                  className="grow px-3 py-2 text-sm border-2 border-blue-500 rounded-xl outline-none bg-slate-50 focus:bg-white resize-none transition-all"
                  value={editingContent}
                  onChange={handleEditChange}
                />
                <div className="flex justify-end space-x-2">
                   <button
                    className="px-4 py-1.5 text-gray-500 text-sm font-medium hover:bg-gray-100 rounded-md"
                    onClick={() => setEditingTaskId(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-md hover:bg-blue-700 shadow-md"
                    onClick={() => {
                      updateTask(task._id, { title: editingTitle, content: editingContent });
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              /* --- DISPLAY MODE --- */
              <div className="flex flex-col">
                <span
                  className={`text-lg font-bold transition-all duration-300 ${
                    task.completed ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>
                {task.content && (
                  <p className={`text-sm mt-1 leading-relaxed ${
                    task.completed ? "text-gray-300" : "text-gray-500"
                  }`}>
                    {task.content}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {editingTaskId !== task._id && (
            <div className="flex items-center space-x-3 ml-4">
              <button
                onClick={() => {
                  startEditing(task._id, task.content, task.title);
                  setEditingTitle(task.title);
                  setEditingContent(task.content);
                }}
                className="text-sm font-medium text-gray-400 hover:text-blue-600 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-sm font-medium text-gray-400 hover:text-red-600 transition-colors"
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
export default TodoList;