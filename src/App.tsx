import { useState, useEffect } from 'react';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { Login } from './components/Login';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleTaskCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Mini SaaS - Task Manager</h1>
            <p className="text-gray-600 mt-2">Manage your tasks efficiently</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TaskForm onTaskCreated={handleTaskCreated} />
          </div>
          
          <div className="lg:col-span-2">
            <TaskList key={refreshKey} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
