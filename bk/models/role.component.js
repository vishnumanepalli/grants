const mongoose= require('mongoose');

const Schema= mongoose.Schema;

const courseSchema=new Schema({
    email:{type:String,required:true},
    role:{type:String,required:true},
},{
    timestamps:true, 
});

const Course=mongoose.model('Courses',courseSchema);

module.exports=Course;