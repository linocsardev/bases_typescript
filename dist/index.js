import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
let task1 = {
    id: "sdsjds8",
    title: 'estudiar typescript',
    state: 'pendiente',
    category: 'estudio',
    createdAt: new Date()
};
let task2 = {
    id: "fdffd33",
    title: 'leer la Biblia',
    state: 'completada',
    category: 'iglesia',
    createdAt: new Date()
};
let task3 = {
    id: "sdsdsd3445",
    title: 'Prepara un Sermon',
    state: 'pendiente',
    category: 'iglesia',
    createdAt: new Date()
};
let tasks = [task1, task2, task3];
function findTaskById(tasks, id) {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task && task.id === id) {
            return task;
        }
    }
    console.log(`No se encontro la tarea con el id ${id}`);
    return null;
}
const task = findTaskById(tasks, "fdffd33");
const crypto = __require("crypto");
function createTask(data) {
    const task = {
        id: crypto.randomUUID(),
        title: data.title,
        state: 'pendiente',
        category: data.category,
        createdAt: new Date()
    };
    return task;
}
//const createTask1 = createTask({title: 'enseñar a mis colegas', category: 'trabajo'})
//console.log(createTask1)
function updateTask(data, id) {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task && task.id === id) {
            if (data.title !== undefined) {
                task.title = data.title;
            }
            if (data.category !== undefined) {
                task.category = data.category;
            }
            //Tenia la opcion de poner las dos actualizaciones dentro de un solo if: if(data.title !== undefined && data.category !== undefined){}; pero ahí si o si tambientendrían que enviar los dos campos a actualizar quise poner el operador || y ahi me sale error
            //solo me quedo separarlos con 2 if para cada campo
            console.log(`Tarea actualizada satisfacctoriamente`);
            return task;
        }
    }
    console.log(`NO se una tarea con el ID ${id}`);
    return undefined;
}
//updateTask({title: 'Tarea actualizada', category:'iglesia'}, "sdsdsd3445")
function completeTask(data) {
    if (data.state === 'pendiente') {
        return {
            ...data,
            state: 'completada'
        };
    }
    else if (data.state === 'cancelada') {
        console.log("La tarea se encuentra cancelada, no se puede completar");
        return null;
    }
    else if (data.state === 'completada') {
        throw new Error(`La tarea ya está completada`);
    }
    return null;
}
function cancelTask(data) {
    if (data.state === 'pendiente') {
        return {
            ...data,
            state: 'cancelada'
        };
    }
    else if (data.state === 'cancelada') {
        throw new Error(`La tarea ya se encuentra cancelada`);
    }
    else if (data.state === 'completada') {
        console.log(`sin acción, la tarea se encuentra completada`);
        return null;
    }
    return null;
}
// const updateTask1 = cancelTask(task3)
// console.log(updateTask1)
// const completed = completeTask(task1)
// console.log('completed', completed)
// const canceled = cancelTask(task1)
// console.log('canceled' , canceled)
// console.log('Task 1', task1)
function deleteTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task && task.id === id) {
            tasks.splice(i, 1);
            console.log('Tarea eliminada, ', task);
            return true;
        }
    }
    console.log('No se encontro tarea con el id ', id);
    return false;
}
// const deleteTask01 = deleteTask("sdsdsd3445")
// console.log(deleteTask01)
// console.log("taks =>", tasks)
const deleteTask02 = deleteTask("id-que-no-existe");
console.log(deleteTask02);
console.log("taks =>", tasks);
//# sourceMappingURL=index.js.map