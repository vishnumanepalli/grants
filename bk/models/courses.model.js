const mongoose= require('mongoose');

const Schema= mongoose.Schema;

const courseSchema=new Schema({
    code:{type:String,required:true},
    course:{type:String,required:true},
    LTPSC:{type:String,required:true},
    to_in: { type: String, required: true },
    // date:{type:Date,required:true},
},{
    timestamps:true,
});

const Course=mongoose.model('Courses',courseSchema);

module.exports=Course;