import crypto = require('crypto')
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/task.types.js';
import {  TaskRepository } from '../repositories/task.repository.js'


export class TaskManager {

    private repository = new TaskRepository()

    async getTasks():Promise<Task[]>{
    
      
      return this.repository.readFile() ;
   } 

   async createTask(data: CreateTaskInput): Promise<Task>{

      const taksRepo = await this.repository.readFile()         

      const task: Task = {                   
         id: crypto.randomUUID(),
         title: data.title,
         state: 'pendiente',
         category:data.category,
         createdAt:new Date()
      }
      taksRepo.push(task)       
      await this.repository.saveFile(taksRepo) 
      return task;                        
   }

   async findTaskById(id: string):Promise<Task | null> {

      const taksRepo = await this.repository.readFile() 
  
         for(let i=0; i<taksRepo.length; i++){  
            const task:Task | undefined = taksRepo[i];
                                          
            if(task && task.id === id){ 
               
               return task; 
            }
         }
      console.log(`No se encontro la tarea con el id ${id}`)
      return null
   }
   
   async deleteTask (id: string): Promise<boolean> {

      const taskRepo = await this.repository.readFile()
      for(let i=0; i<taskRepo.length; i++){ 
         const task:Task | undefined = taskRepo[i] 
         if(task && task.id===id){
            taskRepo.splice(i,1)
            console.log('Tarea eliminada, ', task)
            await this.repository.saveFile(taskRepo)
            return true
         }
      }
      console.log('No se encontro tarea con el id ', id)
      return false
   }

   async updateTask(id:string, data:UpdateTaskInput, ):Promise<Task | undefined>{

      const taskRepo = await this.repository.readFile()
      for(let i =0; i<taskRepo.length; i++){
         const task:Task | undefined = taskRepo[i];
      
         if(task && task.id === id){
            if(task.state === 'cancelada'){
               console.log(`La tarea con el id ${id} ya se encuentra cancelada no se puede modificar`)
               return undefined
            }else if(task.state === "completada" ){
               console.log(`La tarea con el id ${id} ya se encuentra completada no se puede modificar`)
               return undefined
            }else {
               if(data.title !== undefined){
                  task.title = data.title;
               }
               if( data.category !== undefined){
                  task.category = data.category;
               }
               taskRepo[i] = task
               console.log(`Tarea actualizada satisfactoriamente`)
               await this.repository.saveFile(taskRepo) 
                                                   
               return task
            }
         }
      }
   console.log(`NO se encontró la tarea con el ID ${id}`)
   return undefined
   }

   async completeTask(id:string):Promise<Task | null>{
    
      const taskRepo = await this.repository.readFile()
      for(let i=0; i<taskRepo.length; i++){
         const task:Task | undefined = taskRepo[i]
         if(task && task.id === id){

            if(task.state === 'pendiente'){
               const completedTask :Task = {
                  ...task,
                  state:'completada'
               }
               taskRepo[i] = completedTask;
               await this.repository.saveFile(taskRepo) 
               console.log(`La tarea con el id ${id} ha sido completada`)
                  return completedTask;            

            }
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
   
   async cancelTask( id:string ):Promise<Task | null> {
     
      const taksRepo = await this.repository.readFile();
      for(let i=0; i<taksRepo.length; i++){
         const task:Task | undefined = taksRepo[i]
         if(task && task.id === id){
            if(task.state === 'pendiente'){
               const updatedTask: Task = {
                  ...task,
                  state: 'cancelada'
               }
               taksRepo[i]=updatedTask; 
               await this.repository.saveFile(taksRepo) // aqui estoy guardando de la misma manera como los demás 
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