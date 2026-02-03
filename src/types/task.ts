export interface Task {
    id: number;
    title: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    completed: boolean;
    ownerId: number;
  }
  
  export interface CreateTaskDto {
    title: string;
  }
  
  export interface UpdateTaskDto {
    title?: string;
    status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  }
  