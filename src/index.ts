import { TaskManager } from './services/task.manager.js'


const manager = new TaskManager()

const task01= manager.createTask({title: "dirección de culto", category:"iglesia"})
const task02 = manager.createTask({title:"Cocinar el desayuno", category: 'casa'})

manager.createTask({title:"Alimentar a mis conejos", category: 'casa'})
manager.createTask({title:"Visitar a una hermana", category: 'iglesia'})

console.log("Tareas iniciales");
manager.completeTask(task01.id)
manager.cancelTask(task02.id)
console.log(manager.getTaks())
