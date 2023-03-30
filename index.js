// importando los paquetes necesarios
const express = require('express');
const bodyParser = require('body-parser');
require('ejs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// lista de tareas vacía
var tasks = [];

// ruta para la página principal
app.get('/', (req, res) => {
res.render('index', { tasks });
});

// definiendo la ruta para agregar una tarea
app.post('/add-task', (req, res) => {
const task = req.body.task.trim(); // obteniendo la tarea del cuerpo de la solicitud y eliminar los espacios en blanco

if (task === '') {
// si la tarea está vacía, enviar una alerta y volver a la página anterior
res.send('<script>alert("La tarea esta vacia"); history.back()</script>');
} else if (tasks.includes(task)) {
// si la targit remote add origin https://github.com/Sniik/task-web.gitea ya existe en la lista, enviar una alerta y volver a la página anterior
res.send('<script>alert("Esta tarea ya existe"); history.back()</script>');
} else {
// si la tarea es válida, agregarla a la lista y redirigir a la página principal
tasks.push(task);
res.redirect('/');
}
});

// ruta para eliminar tareas
app.post('/remove-task', (req, res) => {
const indexes = req.body.indexes;

if (!Array.isArray(indexes)) {
// si no se ha seleccionado ninguna tarea, enviar una alerta y volver a la página anterior
res.send('<script>alert("No se ha seleccionado ninguna tarea"); history.back()</script>');
} else {
// si se han seleccionado tareas, filtrar la lista de tareas para eliminar las seleccionadas y redirigir a la página principal
tasks = tasks.filter((task, index) => !indexes.includes(index.toString()));
res.redirect('/');
}
});

// encendiendo el servidor
app.listen(3000, () => {
console.log('Server running on port');
});