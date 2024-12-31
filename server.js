const express = require('express')
var cors = require('cors')
const mongoose = require('mongoose') 
const dotenv = require('dotenv')

dotenv.config("./.env")
const dbPassword = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://hajeenah:${dbPassword}@main.ooa8l.mongodb.net/?retryWrites=true&w=majority&appName=main`)
.then(res=>{
    console.log("DB Connected Successfully")
})
.catch(err=>{
    console.log("DB Connection failed")
})


const app = express()
app.use(express.json())  

app.use(cors({
    origin: 'http://localhost:5173'
  }))

const ToDoSchema = new mongoose.Schema({
    task: {type : String}
  });

const todoModel = mongoose.model('ToDoList',ToDoSchema) 

app.get("/",(req,res)=>{
    todoModel.find()
    .then(todoList =>{
        res.json({todoList})
    })
    .catch(err =>{
        console.log(err)
    })
})

app.post("/",async(req, res)=>{
    await todoModel.create({task : req.body.task})
    res.send("Success")
})

app.delete("/task/:id",(req,res)=>{
    todoModel.findByIdAndDelete(req.params.id)
    .then(data =>{
        if(data){
            res.send("Deleted")
        }
        else{
            res.status(404).json({"message":"Invalid index"})
        }}
    )
    .catch(err =>{
        res.status(404).json({"message":"Invalid index"})
    })

})

app.patch("/", (req,res)=>{
    let id = req.body.id
    let newtask = req.body.task
    todoModel.findByIdAndUpdate(id, { task: newtask })
    .then(data =>{
        res.send("Task Updated")
    })
    .catch(err=>{
        res.status(404).json({"message":"Update failed"})
    })
})

app.listen(3000, ()=>{
    console.log("Server started on port 3000 test")
})