import { TaskAlreadyCancelledError, TaskAlreadyCompletedError, TaskNotFoundError } from './errors/task.errors.js';
import { TaskManager } from './services/task.manager.js';
const manager = new TaskManager();
try {
    await manager.cancelTask("b542d689-a27e-4c6e-8826-9c614a8b952f");
    // await manager.completeTask("40051bf4-8c41-411a-9922-5d6022aa73f4")
}
catch (error) {
    if (error instanceof TaskNotFoundError) {
        console.log(`No se encontro el id :/`);
    }
    else if (error instanceof TaskAlreadyCompletedError) {
        console.log(`La tarea ya se encuentra completada :/`);
    }
    else if (error instanceof TaskAlreadyCancelledError) {
        console.log(`La tarea ya sencuentra cancelada :/`);
    }
}
// const updateTask = await manager.completeTask("40051bf4-8c41-411a-9922-5d6022aa73f4")
// console.log(updateTask)
// const task03= manager.createTask({title: "limpiar habitación", category:"estudio"})
// console.log(task01)
// const task02 = manager.createTask({title:"Cocinar el desayuno", category: 'casa'})
// manager.createTask({title:"Alimentar a mis conejos", category: 'casa'})
// manager.createTask({title:"Visitar a una hermana", category: 'iglesia'})
// console.log("Tareas iniciales");
// manager.completeTask(task01.id)
// manager.cancelTask(task02.id)
// console.log(manager.getTaks())
//# sourceMappingURL=index.js.map