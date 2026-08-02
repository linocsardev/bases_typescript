import {writeFile, readFile} from 'node:fs/promises'
import type { Task } from '../types/task.types.js'

export class TaskRepository {
     private ruta:string = "./src/repositories/tasks.json"
    async saveFile( data:Task [] ):Promise<void>{
     
        try {
            const contenidoJson = JSON.stringify(data, null, 2)
            await writeFile(this.ruta, contenidoJson, 'utf-8')
            console.log("Archivo guardado con exito !!!")

        }catch (error){
            console.error('Error al guardar', Error)
        }
    }
    async readFile():Promise<Task[]>{
        try {
            const datos = await readFile(this.ruta,'utf-8')
            const tasks:Task[] = JSON.parse(datos)
            return tasks

        } catch (error) {
            console.log('Error al leer archivo', error)
            return [];
        }
    }
}