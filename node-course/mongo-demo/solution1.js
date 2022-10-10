const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=> console.log('connected to mongodb'))
    .catch(err => console.error('Could not connect to mongoDB ', err));

const courseSchema = new mongoose.Schema({
    name: String, 
    author: String, 
    tags: [ String ],
    date: Date,
    isPublished: Boolean, 
    price: Number
});

const Course = mongoose.model('Course', courseSchema);
//solution 1
// async function findCourse(){
//     return await Course
//     .find({isPublished: true, tags: 'backend'})
//     .sort({name: 1})
//     .select({name:1, author:1})
// }


//solution 2
// async function findCourse(){
//     return await Course
//     .find({isPublished: true})
//     .or([{tags: 'backend'}, {tags: 'frontend'}])
//     .sort({price: -1})
//     .select({name:1, author:1})
// }

//solution 3
async function findCourse(){
    return await Course
    .find({isPublished: true})
    .or([
        {price: {$gte:15}},
    {name: /.*by.*/i}
    ])
    .sort({price: -1})
    .select({name:1, author:1})
}

async function run(){
    const courses = await findCourse();
    console.log(courses);
}

run()
