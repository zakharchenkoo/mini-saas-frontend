import { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';
import type { Task } from '../types/task';

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error('API returned non-array:', data);
        setTasks([]);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error loading tasks:', err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id: number) => {
    try {
      await taskService.completeTask(id);
      await loadTasks();
    } catch (err) {
      console.error('Failed to complete task:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    
    try {
      await taskService.deleteTask(id);
      await loadTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">My Tasks ({tasks.length})</h2>
      
      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No tasks yet. Create your first task!
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.status === 'TODO' ? 'bg-gray-200 text-gray-700' :
                      task.status === 'IN_PROGRESS' ? 'bg-blue-200 text-blue-700' :
                      'bg-green-200 text-green-700'
                    }`}>
                      {task.status}
                    </span>
                    {task.completed && (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        ✓ Completed
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  {!task.completed && (
                    <button
                      onClick={() => handleComplete(task.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
