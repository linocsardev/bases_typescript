import crypto = require('crypto')
import type { Task, CreateTaskInput, UpdateTaskInput, StatusTask, CategoryTask, TaskFilter } from '../types/task.types.js';
import { TaskRepository } from '../repositories/task.repository.js'
import { TaskAlreadyCancelledError, TaskAlreadyCompletedError, TaskInvalidTitleError, TaskNotFoundError, TaskSearchNotFoundError, TaskTitleAndCategoryInvalid, TaskTitleLengthError } from '../errors/task.errors.js';
import { TaskValidator } from '../validations/task.validator.js';
import { stat } from 'fs';



export class TaskManager {

   private repository = new TaskRepository()

   async getTasks(): Promise<Task[]> {

      return await this.loadTasks();
   }

   async createTask(data: CreateTaskInput): Promise<Task> {
      
      TaskValidator.validateTitle(data.title)
      TaskValidator.validateCategory(data.category)
      const taksRepo = await this.loadTasks()
      const task: Task = {
         id: crypto.randomUUID(),
         title: data.title.trim(),
         state: 'pendiente',
         category: data.category,
         createdAt: new Date()
      }
      taksRepo.push(task)
      await this.saveTasks(taksRepo)
      return task;
   }

   async findTaskById(id: string): Promise<Task> {

      const tasksRepo = await this.loadTasks()
      const task = tasksRepo.find(task => task.id === id)

      if (!task) {
         throw new TaskNotFoundError(id)
      }
      return task;
   }

   async deleteTask(id: string): Promise<boolean> {

      const tasksRepo = await this.loadTasks()
      const taskIndex = this.findTaskIndex(tasksRepo, id)

      if (taskIndex === -1) {
         throw new TaskNotFoundError(id)
      }
      tasksRepo.splice(taskIndex, 1);
      console.log("Tarea Eliminada id: ", id);
      await this.saveTasks(tasksRepo);
      return true;
   }

   async updateTask(id: string, data: UpdateTaskInput): Promise<Task> {

      if(data.title === undefined && data.category === undefined ){
         throw new TaskTitleAndCategoryInvalid();
      }
      const tasksRepo = await this.loadTasks()
      const index = this.findTaskIndex(tasksRepo, id)

      if (index === -1) {
         throw new TaskNotFoundError(id)
      }
      const task = tasksRepo[index]
      if (!task) {
         throw new TaskNotFoundError(id);
      }

      if (task.state === 'cancelada') {

         throw new TaskAlreadyCancelledError(id);

      }
      if (task.state === 'completada') {

         throw new TaskAlreadyCompletedError(id);

      }
      if(data.title !== undefined){
         TaskValidator.validateTitle(data.title);
         task.title = data.title.trim();
      }

      
      if (data.category !== undefined) {
         TaskValidator.validateCategory(data.category)
         task.category = data.category;
      }
      tasksRepo[index] = task
      console.log(`Tarea actualizada satisfactoriamente`)
      await this.saveTasks(tasksRepo);
      return task

   }

   async completeTask(id: string): Promise<Task> {

      const tasksRepo = await this.loadTasks()
      const taskIndex = this.findTaskIndex(tasksRepo, id)
      
      if (taskIndex === -1) {
         throw new TaskNotFoundError(id);
      }
      const task = tasksRepo[taskIndex];
      if (!task) {
         throw new TaskNotFoundError(id)
      }
      if (task.state === 'pendiente') {
         const completedTask: Task = {
            ...task,
            state: 'completada'
         }
         tasksRepo[taskIndex] = completedTask;
         await this.saveTasks(tasksRepo)
         console.log(`La tarea con el id ${id} ha sido completada`)
         return completedTask;

      }
      if (task.state === 'cancelada') {
         throw new TaskAlreadyCancelledError(id);

      }
      if (task.state === 'completada') {
         throw new TaskAlreadyCompletedError(id);
      }

      throw new Error('Estado de tarea no válido')
   }

   async cancelTask(id: string): Promise<Task> {

      const taksRepo = await this.loadTasks();
      const taskIndex = this.findTaskIndex(taksRepo, id)
      
      if (taskIndex === -1) {
         throw new TaskNotFoundError(id)
      }
      const task = taksRepo[taskIndex]
      if (!task) {
         throw new TaskNotFoundError(id)
      }
      if (task.state === 'pendiente') {
         const updatedTask: Task = {
            ...task,
            state: "cancelada"
         }
         taksRepo[taskIndex] = updatedTask
         await this.saveTasks(taksRepo);
         return updatedTask;
      }
      if(task.state === 'cancelada') {

         throw new TaskAlreadyCancelledError(id)
      }  
      if (task.state === 'completada') {
         throw new TaskAlreadyCompletedError(id)
      }
      throw new Error(`Estado de la tarea no válido`)
   }

   async searchTasks(title: string):Promise<Task[]>{

      const tasksRepo = await this.loadTasks()

      const encontrado = tasksRepo.filter((task)=>(task.title.toLowerCase().includes(title.toLowerCase())))
      if(encontrado.length === 0){

          throw new TaskSearchNotFoundError()  
      }
      return encontrado

   }
   async getTasksSortedByDate(): Promise<Task[]>{
      
      const tasksRepo = await this.loadTasks()

      const tasksOrder = tasksRepo.sort((a,b):number=>{
         const dateA = a.createdAt.getTime()
         const dateB = b.createdAt.getTime()
         return dateB - dateA
      })

      return tasksOrder
   }

   async getTasksPaginated(page:number, limit:number): Promise<Task[]>{
      const tasksRepo = await this.loadTasks()
      const inicio: number = (page - 1) * limit
      return tasksRepo.slice(inicio, inicio+limit)
      
   }

   

   async filterTasks(filter: TaskFilter):Promise<Task[]>{
    
       const tasksRepo = await this.loadTasks()

       return tasksRepo.filter((tasks)=>{
        const coincideEstado = !filter.state || tasks.state === filter.state
        const coincideCategoria = !filter.category || tasks.category === filter.category
        return coincideEstado && coincideCategoria
       })
   }
   // async getTasksByState(state: StatusTask):Promise<Task[]>{
   //    const tasksRepo = await this.loadTasks()
     
   //    return tasksRepo.filter(task => task.state === state)
   // }
   // async getTasksByCategory (category: CategoryTask):Promise<Task[]>{
   //    const tasksRepo = await this.loadTasks();
   //    return tasksRepo.filter(task=> task.category === category);
   // }
   // async getTasksByStateAndCategory(state: StatusTask, category:CategoryTask):Promise<Task[]>{
   //    const tasksRepo = await this.loadTasks()
   //    return tasksRepo.filter(tasks=>(tasks.state === state && tasks.category === category))
   // }

   private async loadTasks(): Promise < Task[] > {
      return this.repository.getAll()
   }
   private async saveTasks(data: Task[]): Promise < void> {
      return this.repository.save(data)
   }
   private  findTaskIndex(tasks: Task[], id: string): number {
      const taskIndex = tasks.findIndex(task => task.id === id)
      return taskIndex
   }
}
