const http=require("http");
const express =require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const dotenv = require("dotenv");
dotenv.config();
const app=express();
const path = require('path')




app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});  

app.use(cors({

    origin:"https://live-chat-nagesh.herokuapp.com",
    credentials: true,
})
)
const port= process.env.PORT 


const users=[{}];

const server=http.createServer(app);

const io=socketIO(server);

io.on("connection",(socket)=>{

    console.log("New Connection");

    socket.on('joined',(user)=>{

        users[socket.id]=user
        
        socket.emit('welcome',{user:'admin',message:`welcome,${user}`})

        socket.broadcast.emit('userJoined',{user:'admin',message:` ${user} has joined`})

        socket.on('message',({message,id})=>{
            io.emit('sendMessage',{user:users[id],message,id});
        })

        socket.on('disconnect',()=>{
            socket.broadcast.emit('leave',{user:'admin',message:`${user}  has left`});
            console.log(`user left`);
        })
    })
   
    
})


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

server.listen(process.env.PORT || 4750,()=>{
    console.log(`Working`,process.env.PORT);
})















