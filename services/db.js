const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/todo',{useNewUrlParser:true,useUnifiedTopology:true})
const Data=mongoose.model('Data',{
uname:String,
password:String,
data:Array,
})


module.exports={
Data
}