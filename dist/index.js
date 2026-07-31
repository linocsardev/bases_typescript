import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const crypto = __require("crypto");
//DIA 03 ------------------------------------------------------------------------------------------
class TaskManger {
    tasks = [];
    getTaks() {
        return [...this.tasks];
    }
    createTask(data) {
        const task = {
            id: crypto.randomUUID(),
            title: data.title,
            state: 'pendiente',
            category: data.category,
            createdAt: new Date()
        };
        this.tasks.push(task);
        return task;
    }
    findTaskById(id) {
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task && task.id === id) {
                return task;
            }
        }
        console.log(`No se encontro la tarea con el id ${id}`);
        return null;
    }
    deleteTask(id) {
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task && task.id === id) {
                this.tasks.splice(i, 1);
                console.log('Tarea eliminada, ', task);
                return true;
            }
        }
        console.log('No se encontro tarea con el id ', id);
        return false;
    }
    updateTask(id, data) {
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task && task.id === id) {
                if (data.title !== undefined) {
                    task.title = data.title;
                }
                if (data.category !== undefined) {
                    task.category = data.category;
                }
                console.log(`Tarea actualizada satisfacctoriamente`);
                return task;
            }
        }
        console.log(`NO se encontró la tarea con el ID ${id}`);
        return undefined;
    }
    completeTask(id) {
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task && task.id === id) {
                if (task.state === 'pendiente') {
                    const completedTask = {
                        ...task,
                        state: 'completada'
                    };
                    this.tasks[i] = completedTask;
                    return completedTask;
                }
                else if (task.state === 'cancelada') {
                    console.log("La tarea se encuentra cancelada, no se puede completar");
                    return null;
                }
                else if (task.state === 'completada') {
                    throw new Error(`La tarea ya está completada`);
                }
            }
        }
        console.log(`No se encontro la tarea con el id ${id}`);
        return null;
    }
    cancelTask(id) {
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task && task.id === id) {
                if (task.state === 'pendiente') {
                    const updatedTask = {
                        ...task,
                        state: 'cancelada'
                    };
                    this.tasks[i] = updatedTask;
                    return updatedTask;
                }
                else if (task.state === 'cancelada') {
                    throw new Error(`La tarea ya se encuentra cancelada`);
                }
                else if (task.state === 'completada') {
                    console.log("sin acción, la tarea está completada");
                    return null;
                }
            }
        }
        console.log(`No se encontro la tarea con el id ${id}`);
        return null;
    }
}
const manager = new TaskManger();
const task01 = manager.createTask({ title: "dirección de culto", category: "iglesia" });
//manager.findTaskById('id-cualquier')
const task02 = manager.createTask({ title: "Cocinar el desayuno", category: 'casa' });
manager.createTask({ title: "Alimentar a mis conejos", category: 'casa' });
manager.createTask({ title: "Visitar a una hermana", category: 'iglesia' });
manager.completeTask(task01.id);
manager.cancelTask(task02.id);
console.log("task02 => ", task02);
console.log("despues de completar", task01);
console.log(manager.getTaks());
//# sourceMappingURL=index.js.map