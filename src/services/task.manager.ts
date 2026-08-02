import crypto = require('crypto')
import type { Task, CategoryTask, CreateTaskInput, StatusTask,TaskWithoutCreateAt, UpdateTaskInput } from '../types/task.types.js';
import {  TaskRepository } from '../repositories/task.repository.js'

export class TaskManager {
    private tasks : Task[]= []

   getTaks():Task[]{

      return [...this.tasks];
   } 

   createTask(data:CreateTaskInput): Task{
   const task: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      state: 'pendiente',
      category:data.category,
      createdAt:new Date()
   }
   this.tasks.push (task);
   const saveTaks = new TaskRepository ()
   saveTaks.saveFile(this.tasks)
   return task;
   }

   findTaskById(id: string):Task | null {
   for(let i=0; i<this.tasks.length; i++){ 
       const task:Task | undefined = this.tasks[i]; 
                                    
        if(task && task.id === id){  
           
           return task;
        }
    }
    console.log(`No se encontro la tarea con el id ${id}`)
    return null
   }
   
   deleteTask (id: string):boolean {
   for(let i=0; i<this.tasks.length; i++){ 
      const task:Task | undefined = this.tasks[i] 
      if(task && task.id===id){
         this.tasks.splice(i,1)
         console.log('Tarea eliminada, ', task)
         return true
      }
   }
   console.log('No se encontro tarea con el id ', id)
   return false
   }

   updateTask(id:string, data:UpdateTaskInput, ):Task | undefined{
   for(let i =0; i<this.tasks.length; i++){
      const task:Task | undefined = this.tasks[i];
      if(task && task.id === id){
         if(data.title !== undefined){
            task.title = data.title;
         }
         if( data.category !== undefined){
            task.category = data.category;
         }
         console.log(`Tarea actualizada satisfacctoriamente`)
         return task
      }
   }
   console.log(`NO se encontró la tarea con el ID ${id}`)
   return undefined
   }

   completeTask(id:string):Task | null{
      for(let i=0; i<this.tasks.length; i++){
         const task:Task | undefined = this.tasks[i]
         if(task && task.id === id){

            if(task.state === 'pendiente'){
               const completedTask :Task = {
                  ...task,
                  state:'completada'
               }
               this.tasks[i] = completedTask;
            return completedTask;            }
            else if (task.state === 'cancelada'){
               console.log("La tarea se encuentra cancelada, no se puede completar")
               return null

            }else if(task.state === 'completada'){
               throw new Error(`La tarea ya está completada`)
            }
         }
      }
      console.log(`No se encontro la tarea con el id ${id}`)
      return null
   }
   
   cancelTask( id:string ):Task | null {
      for(let i=0; i<this.tasks.length; i++){
         const task:Task | undefined = this.tasks[i]
         if(task && task.id === id){
            if(task.state === 'pendiente'){
               const updatedTask: Task = {
                  ...task,
                  state: 'cancelada'
               }
               this.tasks[i]=updatedTask;
               return updatedTask;
              
            }else if(task.state === 'cancelada'){
                throw new Error(`La tarea ya se encuentra cancelada`)
            }else if(task.state === 'completada'){
               console.log("sin acción, la tarea está completada")
               return null
            }

         }
      }
      console.log(`No se encontro la tarea con el id ${id}`)
      return null;
}
}