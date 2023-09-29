const express =require("express")
const mongoose =require("mongoose")
const cors =require("cors")
const userModel =require('./models/Users')

const app =express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/crud');

app.get('/',(req,res)=>{
    userModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/create',(req,res)=>{
    userModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/update/:id',(req,res)=>{
    const id = req.params.id
    userModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateUser/:id',(req,res)=>{
    if (req.body.name ==="" || req.body.email ==="" ||  req.body.age ===""){
        
        res.json("no data")
       
    } else {
        const id = req.params.id
        userModel.findOneAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        age:req.body.age,
    })
    .then(users => res.json(users))
    .catch(err => res.json(err))
       
    }
    // const id = req.params.id
    // userModel.findOneAndUpdate({_id:id},{
    //     name:req.body.name,
    //     email:req.body.email,
    //     age:req.body.age,
//     })
//     .then(users => res.json(users))
//     .catch(err => res.json(err))

})

app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id
    userModel.findByIdAndDelete({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))

})


app.listen(3001,()=>{
    console.log("server is running");
  

})