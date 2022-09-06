const Joi = require('joi');
const express = require('express');
const { valid } = require('joi/lib/types/lazy');
const  app = express();

app.use(express.json());

const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course:3'}
];

app.get('/', (req,res) =>{
    res.send("Hello world!!!");
});

app.get('/api/courses', (req,res) =>{
    res.send(courses);
});

app.post('/api/courses', (req, res) =>{
    const {errpr} = validateCourse(req.body)             // result followed by result.error = {error}
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length +1,
        name : req.body.name
    }
    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req,res) => {
    //look up course
    //if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
                                                                        // (function(c){
                                                                        //     c.id === parseInt(req.params.id);
                                                                        // })
    if(!course)
        res.status(404).send('the course with given id was not found');

    //validate
    //if invalid, return 400
    const { error } = validateCourse(req.body)      // result followed by result.error = {error}
    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    //update course
    course.name = req.body.name;
    //return updated course
   res.send(course);
});


function validateCourse(course){
    const schema = {
        "name" : Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}


app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
                                                                        // (function(c){
                                                                        //     c.id === parseInt(req.params.id);
                                                                        // })
    if(!course)
        res.status(404).send('the course with given id was not found');
    else
        res.send(course);
})

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`listening on ${port}`);
});

