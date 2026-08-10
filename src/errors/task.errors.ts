

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
export class TaskInvalidTitleError extends Error {
    constructor(){
        super(`Campo para el titulo se encuentra vacío`)
        this.name = `TaskInvalidTitleError`
        Object.setPrototypeOf(this, TaskInvalidTitleError.prototype)
    }
}
export class TaskTitleLengthError extends Error {
    constructor(){
        super(`La longitud del campo para el título es inválido`)
        this.name = "TaskTitleLengthError"
        Object.setPrototypeOf(this, TaskTitleLengthError.prototype)
    }
}
export class TaskTitleAndCategoryInvalid extends Error {
    constructor(){
        super(`El título de la tarea y la categoría son inválidos`)
        this.name = "TaskTitleAndCategoryInvalid";
        Object.setPrototypeOf(this, TaskTitleAndCategoryInvalid.prototype)
    }
}
//Error Category
export class TaskInvalidCategoryError extends Error {
    constructor(){
        super(`Campo para la categoria es Inválido`)
        this.name = `TaskInvalidCategoryError`
        Object.setPrototypeOf(this, TaskInvalidCategoryError.prototype)
    }
}
