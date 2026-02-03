import api from './api';
import type { Task, CreateTaskDto, UpdateTaskDto } from '../types/task';

export const taskService = {
  
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    
    return response.data.content || [];
  },

 
  getTaskById: async (id: number): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  
  createTask: async (task: CreateTaskDto): Promise<Task> => {
    const response = await api.post('/tasks', {
      title: task.title
    });
    return response.data;
  },

 
  updateTask: async (id: number, task: UpdateTaskDto): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, {
      title: task.title
    });
    return response.data;
  },

  
  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  
  completeTask: async (id: number): Promise<Task> => {
    const response = await api.post(`/tasks/${id}/complete`);
    return response.data;
  }
};
