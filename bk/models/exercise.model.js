const mongoose= require('mongoose');

const Schema= mongoose.Schema;

const exerciseSchema=new Schema({
    from:{type:String,required:true},
    to_in:{type:String,required:true},
    to_ad: { type: String, required: true },
    code: { type: String, required: true },
    course: { type: String, required: true },
    LTPSC: { type: String, required: true },
    status: { type: String, required: true }
    
},{
    timestamps:true,
});

const Exercise=mongoose.model('Exercise',exerciseSchema);

module.exports=Exercise;