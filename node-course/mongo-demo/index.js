const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('connected to mongodb'))
    .catch(err => console.error('Could not connect to mongoDB ', err));

const courseSchema = mongoose.Schema({  
    name: {type:String, 
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        //uppercase: true,

    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback){
                setTimeout(() => {
                    const result = v && v.length >0; 
                    callback(result)
                }, 1)

                
            },
            message: 'Course should have at least 1 tag'
        }
    },
    date: {type : Date , default: Date.now},
    isPublished : Boolean,
    price: {
        type: Number, 
        required: function(){ return this.isPublished;},
        min: 10,
        max: 200,
        get : v => Math.round(v),
        set : v => Math.round(v)

    }
});

const Course = mongoose.model('Course', courseSchema);


async function createCourse() {
    const course = new Course({
        name: 'angular Course',
        category:'WEB',
        author: 'Mosh',
        tags: ['Frontend'],
        isPublished: true, 
        price: 15.8
    });
 
    try{
        // course.validate((err) => {           inbuilt validator
        //     if(err) {}
        // });
        const result = await course.save();
        console.log(result);
    }
    catch(ex){
        for(field in ex.errors)
        console.log(ex.errors[field].message);
    }

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

async function removeCourse(id){
    //const result = await Course.deleteMany({_id : id})
    const course = await Course.findByIdAndDelete(id);
    console.log(course);
}


createCourse()
//getCourse()
//updateCourse('63348d5f6376594708cb349e');
//removeCourse('63348d5f6376594708cb349e')