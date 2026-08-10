export interface Task {
    id: string,
    title: string,
    state: StatusTask,
    category: CategoryTask,
    createdAt: Date
    
}
export interface TaskFilter {
    state?: string
    category?:string
}

export type CreateTaskInput = 
    Pick<Task, 'title'| 'category'>

export type UpdateTaskInput = 
    Partial<Pick<Task,'title' | 'category' >>

export type TaskWithoutCreateAt = 
    Omit<Task, 'createdAt'>

export type StatusTask = 
    'pendiente'
    | 'completada' 
    | 'cancelada'; 
export type CategoryTask = 
    'casa' 
    | 'trabajo' 
    | 'iglesia' 
    | 'vecindad' 
    | 'estudio'