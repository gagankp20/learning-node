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

async function updateCourse(id){
//approach1 :QUERY FIRST
// findbyId()->modify properties -> save()
//     const course = await Course.findById(id);
//     if(!course) return;
//     course.set({
//         isPublished: true, 
//         author: 'another author'
//     })

//     const result = await course.save();
//     console.log(result);
// }


//approach2: update first
// directly update document -> optionally display 
const result = await Course.findByIdAndUpdate(id, {
    $set : {
        author:'Jason',
        isPublished : false
    }
}, {new: true});
console.log(result)
}

async function deleteCourse(id){
    //const result = await Course.deleteMany({_id : id})
    const course = await Course.findByIdAndDelete(id);
    console.log(course);
}


//creteCourse()
//getCourse()
//updateCourse('63348d5f6376594708cb349e');
deleteCourse('63348d5f6376594708cb349e')