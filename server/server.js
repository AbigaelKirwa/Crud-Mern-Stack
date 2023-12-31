const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/myDB").catch((err)=>console.log(err));

//db schema and model
const postSchema = mongoose.Schema({
    title:String,
    description:String
})

const Post = mongoose.model("Post", postSchema);


app.get("/", (req, res) =>{
    res.send("Express is here")
});

app.post("/api/create", (req,res)=>{
    Post.create({
        title: req.body.title,
        description: req.body.description,
    }).then(doc=>console.log(doc))
    .catch(err=>console.log(err));
});

app.get("/api/posts", (req, res)=>{
    Post.find()
    .then((items)=>res.json(items))
    .catch((err)=>console.log(err));
});

app.delete("/api/delete/:id", (req,res)=>{
    Post.findByIdAndDelete({_id: req.params.id})
    .then(doc => console.log(doc))
    .catch(err=> console.log(err));
});

app.put("/api/update/:id", (req, res)=>{
    Post.findByIdAndUpdate({_id:req.params.id},{
        title:req.body.title,
        description:req.body.description
    })
    .then(doc => console.log(doc))
    .catch(err=> console.log(err))

    // console.log(req.params);
    // console.log(req.body)
})

app.listen(3001, function(){
    console.log("Server is running")
});