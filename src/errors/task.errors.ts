export class TaskNotFoundError extends Error {
    constructor(id: string){
        super(`No se encontro  la tarea con el id  ${id} !!`)
        this.name = `TaskNotFoundError`
        Object.setPrototypeOf(this , TaskNotFoundError.prototype)
    }
}
export class TaskAlreadyCompletedError extends Error{
    constructor(id:string){
        super(`La tarea con el id ${id} ya se encuentra completada !! `)
        this.name = `TaskAlreadyCompletedError`;
        Object.setPrototypeOf(this, TaskAlreadyCompletedError.prototype)

    }
}
export class TaskAlreadyCancelledError extends Error {

    constructor(id: string){
        super(`La tarea con el id ${id} ya se encuentra cancelada !!`)
        this.name = `TaskAlreadyCancelledError`
        Object.setPrototypeOf(this, TaskAlreadyCancelledError.prototype)
    }
}