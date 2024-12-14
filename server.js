const express = require('express')
var cors = require('cors')


const app = express()
app.use(express.json())  

app.use(cors({
    origin: 'http://localhost:5173'
  }))



let tasks=[
    {
        _id:1,
        task:"Go to Shop"
    },
    {
        _id:2,
        task:"Buy Groceries"
    },
    {
        _id:3,
        task:"Make a call"
    },
    {
        _id:4,
        task:"Check mails"
    }
]

app.get("/",(req,res)=>{
    res.json(tasks)
})

app.post("/",(req, res)=>{
    tasks.push({
        _id:tasks.length+1,
        task:req.body.task
    })
    console.log(tasks)
    res.send("Success")
})

app.delete("/task/:index",(req,res)=>{
    console.log(req.params)
    if(req.params.index < tasks.length){
        tasks.splice(req.params.index,1)
        res.send("Task deleted from the list")
    }
    else{
        res.status(404).json({"message":"Invalid index"})
    }

})

app.patch("/", (req,res)=>{
    let index = req.body.id
    let newTask = req.body.task
    tasks[index].task = newTask
    console.log(req.body)

})

app.listen(3000, ()=>{
    console.log("Server started on port 3000 test")
})