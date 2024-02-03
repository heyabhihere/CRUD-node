const mongoose=require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/CRUD_DATABASE")
const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const user= mongoose.model('user',UserSchema)
module.exports={
    user
}