import { TaskInvalidCategoryError, TaskInvalidTitleError, TaskTitleLengthError } from "../errors/task.errors.js";


export class TaskValidator {

    static validateTitle(title: string):void{
        const cleanTitle = title.trim();
        if(cleanTitle.length === 0){
            throw new TaskInvalidTitleError();
        }if(cleanTitle.length<3 || cleanTitle.length > 100){
            throw new TaskTitleLengthError();
        }
    }
    static validateCategory(category: string): void {
        const cleanCategory = category.trim();
        const validCategories = ['casa', 'trabajo', 'iglesia', 'vecindad', 'estudio']
        if(!validCategories.includes(cleanCategory)){
            throw new TaskInvalidCategoryError();
        }
    }
}