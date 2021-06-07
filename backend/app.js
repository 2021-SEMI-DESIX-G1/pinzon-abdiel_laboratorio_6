const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Data = [
    {
        name: 'Erick Agrazal',
        age: 30,
        status: 'active',
    },
    {
        name: 'José Muñoz',
        age: 34,
        status: 'active',
    },
    {
        name: 'Iván Betegón',
        age: 28,
        status: 'active',
    }
]

const Users = {
    getUsers: (req, res) => {
        res.json({
            model: 'Users',
            count: Data.length,
            data: Data,
        });
    },
    getUser: (req, res) => {
        res.json(Data[req.params.id]);
    },
    createUser: (req, res) => {
        console.log(req.body)
        Data.push(req.body);
        res.json({
            model: 'Users',
            count: Data.length,
            data: Data,
        });
    },
    updateUser: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        Data[id] = body;
        res.json({data:Data, message: `Usuario ${id} actualizado`}); 
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        Data.splice(Data[id], 1);
        res.json({data:Data, message: `Usuario ${id} eliminado`}); 

    }
 }

app.get('/api/v1/users/', Users.getUsers);
app.get('/api/v1/users/:id', Users.getUser);
app.post('/api/v1/users/', Users.createUser);
app.put('/api/v1/user/:id', Users.updateUser);
app.delete('/api/v1/user/:id', Users.deleteUser);

app.listen(port, () => {
    console.log(`Ejemplo escuchando en: http://localhost:${port}`)
})