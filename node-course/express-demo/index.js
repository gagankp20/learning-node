const express = require('express');
const  app = express();

const courses = [
    {id:1, course: 'course1'},
    {id:2, course: 'course2'},
    {id:3, course : 'course:3'}
];

app.get('/', (req,res) =>{
    res.send("Hello world!!!");
});

app.get('/api/courses', (req,res) =>{
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) =>
{
    const course = courses.find(c => c.id === parseInt(req.params.id));
                                                                        // (function(c){
                                                                        //     c.id === parseInt(req.params.id)
                                                                        // })
    if(!course)
        res.status(404).send('the course with given id was not found');
    else
        res.send(course);
})

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`listening on ${port}`);
}) 