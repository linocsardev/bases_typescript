import crypto = require('crypto')
import type { Task, CategoryTask, CreateTaskInput, StatusTask,TaskWithoutCreateAt, UpdateTaskInput } from '../types/task.types.js';
import {  TaskRepository } from '../repositories/task.repository.js'

export class TaskManager {
    private tasks : Task[]= []

    async getTaks():Promise<Task[]>{
      const repository = new TaskRepository()
      const taksRepo:Task[] = await repository.readFile()
       this.tasks = taksRepo; 
       console.log(this.tasks)
      return this.tasks ;
   } 

   async createTask(data:CreateTaskInput):Promise<Task>{

      const repository = new TaskRepository () // 1. inicializo mi TaskREpository
      const taksRepo = await repository.readFile() //2. Leo mi archivo , traigo las tareas guardadas esperando que me cumpla la promesa
      this.tasks = taksRepo               //3. Asigno a la propiedad de mi clase "this.taks" las tareas leídas del archivo 

      const task: Task = {                   //4. Creo mi nueva tarea
         id: crypto.randomUUID(),
         title: data.title,
         state: 'pendiente',
         category:data.category,
         createdAt:new Date()
      }
      this.tasks.push(task)               //5. a this.taks le agrego la nueva tarea creada
      await repository.saveFile(this.tasks) // 6. Guardo la propiedad this.taks de mi clase en el archivo taks.json, lo sobreescribo
      return task;                        //7. retorno la tarea nueva tarea creada
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