import { TaskManager } from './services/task.manager.js';
const manager = new TaskManager();
const tasks = await manager.getTasks();
console.log(tasks);
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