const router= require('express').Router();
let Course = require('../models/courses.model');

router.route('/').get((req,res)=>{
    Course.find()
    .then(courses=>res.json(courses))
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    const code=req.body.code;
    const course=req.body.course;
    const LTPSC=req.body.LTPSC
    const to_in = req.body.to_in
    // const date=Date.parse(req.body.date);
    const newCourse= new Course({code,course,LTPSC,to_in});
    
    newCourse.save()
    .then(()=>res.json('Course Added!'))
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/:id').get((req, res) => {
    Course.findById(req.params.id)
        .then(courses => res.json(courses))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Course removed'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Course removed'))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {//id is variable
    Exercise.findById(req.params.id)
        .then(courses => {
            courses.course = req.body.course;
            courses.code = req.body.code;
            courses.LTPSC = req.body.LTPSC;
            courses.to_in = req.body.to_in;
            exercise.save()
                .then(() => res.json('Course Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports=router;