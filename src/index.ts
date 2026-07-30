interface Task {
    id: string,
    title: string,
    state: statusTask,
    category: categoryTask,
    createdAt: Date //quise poner el new Date() en vez de string pero me aparece error
    
}
//interface de Task para cuidar la entrada de datos

type statusTask = 'pendiente'| 'completada' | 'cancelada'; //type porque mi variable solo restrinjo en 3 posibilidades 
type categoryTask = 'casa' | 'trabajo' | 'iglesia' | 'vecindad' | 'estudio'

let task1:Task = {
   id: "sdsjds8",
   title: 'estudiar typescript',
   state: 'pendiente',
   category: 'estudio',
   createdAt:  new Date() 
 
}

let task2:Task = {
   id: "fdffd33",
   title: 'leer la Biblia',
   state: 'completada',
   category: 'iglesia',
   createdAt: new Date()
}
let task3:Task = {
    id: "sdsdsd3445",
    title: 'Prepara un Sermon',
    state: 'pendiente',
    category: 'iglesia',
    createdAt: new Date()
};
//al poner solo Date en el campo createdAd, que dato pongo al crear mis tareas? porque sale con error el string de la fecha

let tasks:Task[] = [task1, task2, task3]

    
function findTaskById(tasks:Task[], id: string):Task | null {
   for(let i=0; i<tasks.length; i++){
       const task:Task | undefined = tasks[i]; //Aqui me sigue apareciendo un error en mi variable 'task':'Type 'Task | undefined' is not assignable to type 'Task'.
                                    //Type 'undefined' is not assignable to type 'Task'.'
        if(task && task.id === id){  //como corrijo tasks[i].id ; por que me indica que puede ser undefined
           
           return task;
        }
    }
    console.log(`No se encontro la tarea con el id ${id}`)
    return null
}
//QUise poner un tipo de retorno a mi funcion y no supe cual elegir, retorno true si encontro la tarea y null si no encontro, me parace que es el más indicado, porque expresa que no existe.
//creo que al saber cual sería el tipo de retorno para mi funcion fue la más dificil
const task = findTaskById(tasks, "fdffd33")
//console.log(task)

import crypto = require('crypto')


interface CreateTaskInput {
   title: string;
   category: categoryTask
}
interface UpdateTaskInput {
   title: string;
   category: categoryTask
}

function createTask(data:CreateTaskInput): Task{
 const task: Task = {
   id: crypto.randomUUID(),
   title: data.title,
   state: 'pendiente',
   category:data.category,
   createdAt:new Date()
 }
 return task
}

const createTask1 = createTask({title: 'enseñar a mis colegas', category: 'trabajo'})
console.log(createTask1)
// Task representa mi interface, de los datos que le corresponden según su tipo
//CreateTaskInput es otra interfaz solo con los datos que se necesitan para crear una tarea nueva
//¿Por qué crees que es mejor tener dos tipos diferentes en lugar de utilizar Task directamente para crear la tarea? por que es posible que más adelante se necesiten agragar mas campos a tener solamente una interfaz, puede ser confuso ya que tenemos otra interfaz y solo podemos modificar en tal interfaz
function updateTask(data:UpdateTaskInput, id:string):Task | undefined{
   for(let i =0; i<tasks.length; i++){
      const task:Task | undefined = tasks[i];
      if(task && task.id === id){
         task.title = data.title;
         task.category = data.category;
         console.log(`Tarea actualizada satisfacctoriamente`)
         return task
      }
   }
   console.log(`NO se una tarea con el ID ${id}`)
 return undefined
}
updateTask({title: 'Tarea actualizada', category:'iglesia'}, "sdsdsd3445")

function completeTask(data:Task):Task | null{
 
   if(data.state === 'pendiente'){
      return {
         ...data,
         state:'completada'
      };

   }else if (data.state === 'cancelada'){
      console.log("La tarea se encuentra cancelada, no se puede completar")
      return null

   }else if(data.state === 'completada'){
      throw new Error(`La tarea ya está completada`)
   }
   return null;
}
function cancelTask(data:Task):Task | null {

   if(data.state === 'pendiente'){
      
      return {
         ...data,
         state: 'cancelada'
      };
   }else if(data.state === 'cancelada'){
      throw new Error(`La tarea ya se encuentra cancelada`)
   }else if(data.state === 'completada'){
      console.log(`sin acción, la tarea se encuentra completada`)
      return null;
   }
   return null;
}
const updateTask1 = cancelTask(task3)
console.log(updateTask1)
const completed = completeTask(task1)
console.log('completed', completed)
const canceled = cancelTask(task1)
console.log('canceled' , canceled)
console.log('Task 1', task1)

//Decidi utilizar throw new Error(), para que mande el error, aunque tambien pude enviarle null o undefined, aun no la tengo clara
//pero no estoy seguro si en mi else{} el return sea al final las misma tarea que me envían