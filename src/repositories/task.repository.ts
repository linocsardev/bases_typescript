import {writeFile, readFile} from 'node:fs/promises'
import type { Task } from '../types/task.types.js'

export class TaskRepository {
     private ruta:string = "./src/repositories/tasks.json"
     private async saveFile( data:Task [] ):Promise<void>{
     
        try {
            const contenidoJson = JSON.stringify(data, null, 2)
            await writeFile(this.ruta, contenidoJson, 'utf-8')
            console.log("Archivo guardado con exito !!!")

        }catch (error){
            console.error('Error al guardar', error)
        }
    }
     private async readFile():Promise<Task[]>{
        try {
            const datos = await readFile(this.ruta,'utf-8')
            const tasks:Task[] = JSON.parse(datos)
            for(let i=0; i<tasks.length; i++){
                const task = tasks[i]
                if(task){
                    task.createdAt = new Date(task.createdAt)
                }
            }
            return tasks

        } catch (error) {
            console.log('Error al leer archivo', error)
            return [];
        }
    }
    getAll():Promise<Task[]>{
        return  this.readFile()
    }
    save(data:Task[]):Promise<void>{
        return this.saveFile(data)
    }
}