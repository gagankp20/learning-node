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

createCourse();