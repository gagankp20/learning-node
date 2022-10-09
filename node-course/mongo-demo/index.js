const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('connected to mongodb'))
    .catch(err => console.error('Could not connect to mongoDB ', err));

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: {type : Date , default: Date.now},
    isPublished : Boolean
});

const Course = mongoose.model('Course', courseSchema);


async function createCourse() {
    const course = new Course({
        name: 'angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const pageNumber =2;
    const pageSize = 10;


    const course = await Course
    .find({author:'Mosh', isPublished: true})                           //general         .count() returns count
    //.find({author: /^Mosh/i})                                         regular expression. i is case insensitive 
    // .or([{author: 'Mosh'}, {isPublished: true}])                     logical operation
    .skip((pageNumber-1)* pageSize)
    .limit(pageSize)
    .sort({name: 1})
    .select({name:1, tags:1});
    console.log(course);
}

getCourses();