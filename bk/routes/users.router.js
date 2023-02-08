const router= require('express').Router();
let Exercise = require('../models/user');

router.route('/').get((req,res)=>{
    Exercise.find()
    .then(exercises=>res.json(exercises))
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    const role=req.body.role;
    const phone_number = req.body.phone_number;
    const newExercise = new Exercise({ role,phone_number });
    
    newExercise.save()
    .then(()=>res.json('Request Added!'))
    .catch(err=>res.status(400).json('Error: '+err));
});

module.exports=router;