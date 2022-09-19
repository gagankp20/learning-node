const express = require('express')
const router = express.Router();

const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course:3'}
];

router.get('/', (req,res) =>{
    res.send(courses);
});

router.post('/', (req, res) =>{
    const {error} = validateCourse(req.body)             // result followed by result.error = {error}
    if(result.error)
       return res.status(400).send(result.error.details[0].message);

    const course = {
        id: courses.length +1,
        name : req.body.name
    }
    courses.push(course);
    res.send(course);
});


router.put('/:id', (req,res) => {
    //look up course
    //if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //can be written as below
    // (function(c){
    //     c.id === parseInt(req.params.id);
    // })
    if(!course)
       return res.status(404).send('the course with given id was not found');

    //validate
    //if invalid, return 400
    const { error } = validateCourse(req.body)      // result followed by result.error = {error}
    if(error)
       return res.status(400).send(result.error.details[0].message);
        

    //update course
    course.name = req.body.name;
    //return updated course
   res.send(course);
});


router.delete('/:id', (req,res) =>{
    //look if it exists else 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
       return res.status(404).send('the course with given id was not found');
    //delete
    const index = courses.indexOf(course)
    courses.splice(index, 1);
    //return deleted course
    res.send(course);
});


router.get('/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //can be written as below
    // (function(c){
    //     c.id === parseInt(req.params.id);
    // })
                                                                        
    if(!course)
       return res.status(404).send('the course with given id was not found');
    res.send(course);
})


function validateCourse(course){
    const schema = {
        "name" : Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}

module.exports = router;