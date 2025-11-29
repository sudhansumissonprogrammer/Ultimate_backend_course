import express from "express"
import mongoose from "mongoose"
import user from "./user.model.js"
const app=express()
const port=8000
const mongoURL="mongodb+srv://sudhansusahoo7771_db_user:sudhansu123@cluster0.yorckcy.mongodb.net/sudhansu"  
const connectiondb=async ()=>{
    try{
        await mongoose.connect(mongoURL);
        console.log("DB Connected")
        
    }catch(error)
    {
        console.log("database error:",error)
    }
}
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hello");
})
app.post("/create",async (req,res)=>{
    try{
        let {name,age,email,username} =req.body
        const newuser=await user.create({
            name,
            age,
            email,
            username
        })

        return res.status(201).json({message:"user created"})

    }catch(e){
        return res.status(400).json({message:e.message})
        console.log(e);
    }
})
app.get("/get",async (req,res)=>{
    try{
        const users=await user.find()
        return  res.status(200).json(users)
    }catch(e){
        return res.status(400).json({message:e.message})
    }
})
app.get("/getname",async (req,res)=>{
    try{
        const users=await user.find({$and:[{age:{$gt:18}},{age:{$lt:25}}]})
        return  res.status(200).json(users)

    }catch(e){
        return res.status(400).json({message:e.message})


    }

})
app.get("/get/:userName",async (req,res)=>{
    try{
        
        const users1=await user.findOne({username:req.params.userName})
        return  res.status(200).json(users1)

    }catch(e){
        return res.status(400).json({message:e.message})


    }

})
app.put("/update",async (req,res)=>{
    try{
        let {name,age,email}=req.body;
        //let {age}=req.body;
        //let id=req.params.id;
        let users1=await user.updateOne({email},{name,age},{new:true})
        return  res.status(200).json(users1)

    }catch(e){
        return res.status(400).json({message:e.message})


    }

})
app.delete("/delete/:id",async (req,res)=>{
    try{
        //let {name,age,email}=req.body;
        //let {age}=req.body;
        let id=req.params.id;
        let users1=await user.findByIdAndDelete(id)
        return  res.status(200).json(users1)

    }catch(e){
        return res.status(400).json({message:e.message})


    }

})
app.delete("/delete",async (req,res)=>{
    try{
        let {email}=req.body;
        //let {age}=req.body;
        //let id=req.params.id;
        let users1=await user.deleteOne({email})
        return  res.status(200).json(users1)

    }catch(e){
        return res.status(400).json({message:e.message})


    }

})




app.listen(port,()=>{
    connectiondb();
    console.log(`server is started at ${port}`);

})

