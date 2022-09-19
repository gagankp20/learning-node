const helmet = require('helmet')
const morgan = require('morgan')
const Joi = require('joi');
const logger = require('./logger')
const express = require('express');
const debug = require('debug')('app:startup');
const  app = express();

app.set('view engine', 'pug')
app.set('views', './views')

app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))


if(app.get('env') === 'development'){
    app.use(morgan('tiny'))
    debug('Morgan enabled')
}


app.use(logger)

const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course:3'}
];

app.get('/', (req,res) =>{
    res.render('index', {title:'My express app', message: 'hello world'});
});

app.get('/api/courses', (req,res) =>{
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //can be written as below
    // (function(c){
    //     c.id === parseInt(req.params.id);
    // })
                                                                        
    if(!course)
       return res.status(404).send('the course with given id was not found');
    res.send(course);
})

app.post('/api/courses', (req, res) =>{
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


app.put('/api/courses/:id', (req,res) => {
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

app.delete('/api/courses/:id', (req,res) =>{
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


function validateCourse(course){
    const schema = {
        "name" : Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}


const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`listening on ${port}`);
});

