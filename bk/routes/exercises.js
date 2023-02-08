const router= require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req,res)=>{
    Exercise.find()
    .then(exercises=>res.json(exercises))
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    const from=req.body.from;
    const course = req.body.course;
    const code=req.body.code;
    const LTPSC=req.body.LTPSC;
    const to_in=req.body.to_in;
    const status = req.body.status;
    const to_ad = req.body.to_ad;
    const newExercise = new Exercise({ from, to_in, to_ad, code,course, LTPSC,status });
    
    newExercise.save()
    .then(()=>res.json('Request Added!'))
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res)=>{
    Exercise.findById(req.params.id)
    .then(exercises=>res.json(exercises))
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Request deleted'))
    .catch(err=>res.status(400).json('Error: '+err));
});

 router.route('/update/:id').post((req,res)=>{//id is variable
    Exercise.findById(req.params.id)
    .then(exercise=>{
    exercise.from=req.body.from;
    exercise.code=req.body.code;
    exercise.course = req.body.course;
    exercise.to_in=req.body.to_in;
    exercise.status = req.body.status;
    exercise.to_ad=req.body.to_ad;
    exercise.LTPSC=req.body.LTPSC;

    exercise.save()
    .then(()=>res.json('Request Updated!'))
    .catch(err=>res.status(400).json('Error: '+err));
    })
    .catch(err=>res.status(400).json('Error: '+err));
});

module.exports=router;