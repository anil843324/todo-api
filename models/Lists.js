const mongoose=require('mongoose');

const ListSchema=new mongoose.Schema({

     name:String,  
})


const ListModel= mongoose.model('lists', ListSchema)

module.exports=ListModel