import crypto = require('crypto')
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/task.types.js';
import { TaskRepository } from '../repositories/task.repository.js'
import { TaskAlreadyCancelledError, TaskAlreadyCompletedError, TaskNotFoundError } from '../errors/task.errors.js';



export class TaskManager {

   private repository = new TaskRepository()

   async getTasks(): Promise<Task[]> {

      return await this.loadTasks();
   }

   async createTask(data: CreateTaskInput): Promise<Task> {

      const taksRepo = await this.loadTasks()

      const task: Task = {
         id: crypto.randomUUID(),
         title: data.title,
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
      if (data.title !== undefined) {

         task.title = data.title;

      }
      if (data.category !== undefined) {

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
