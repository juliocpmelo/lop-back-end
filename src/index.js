require("dotenv/config")
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const {PORT} = require("./config/env");
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)

//middlewares globais
app.use(cors())
app.use(require('./sockets')(io))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Verifica a conexão com o bacno de dados e cria as tabelas caso não foram criadas
require('./database/auto_migrate')

//importa rotas
require('./routes')(app);  

server.listen(PORT,(req,res) => {
    console.log(`Listening in localhost:${PORT}`)
})

// var exec = require('child_process').exec;
// var child = exec('mysqldump -u root -p 3306 lop > dumpfilename.sql',err=>{
//     console.log('erro ao gerar backup\n');
//     console.log(err);
// });




