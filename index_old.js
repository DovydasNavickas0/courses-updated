require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(`${process.env.MONGO_DB_URL}`).then(() => console.log('Connected succesfully')).catch(err => console.error("Could not connect", err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});


//Class
const Course = mongoose.model('Course', courseSchema)


//insert into db
const createCourse = async () => {
    const course = new Course({
        name: "Javascript Course",
        author: "Jonas",
        tags: ['javascript', 'frontend', 'backend'],
        isPublished: false
    });

    const result = await course.save();
    console.log(result)
}
//createCourse()


//get data from db
const getCourses = async() => {
    const courses = await Course.find();
    console.log(courses)
}
getCourses()


//get filtered data
const getFilterCourses = async() => {
    const course = await Course
    .find({ isPublished: true})
    .limit(2)
    .sort({name: 1})
    .select({name: 1, author: 1, tags: 1})
    .catch(err => {console.log('filter data broke', err)});
    console.log(course)
}
//getFilterCourses()


//get filtered data or other
const getFilterCourses1 = async() => {
    const course = await Course
    .find({ name: "CSS Course"})
    .or([ {author: "Antanas"}, {isPublished: false}])
    .catch(err => {console.log('filter data broke', err)});
    console.log(course)
}
//getFilterCourses1()


//get filtered data that also is x
const getFilterCourses2 = async() => {
    const course = await Course
    .find({ name: "Javascript Course"})
    .and([ {isPublished: false}])
    .catch(err => {console.log('filter data broke', err)});
    console.log(course)
}
//getFilterCourses2()


//update data
//first method: update first
//then modify it
//save it
const updateCourse = async(id) => {
    const course = await Course.findById(id);
    if(!course) return // if it doesn't exist

    if(course.isPublished) return; // if it's published

    //course.isPublished = true;
    course.name = "CSS Course"
    course.author = "Jolita";
    const result = await course.save();
    console.log(result);
}
//updateCourse('63e20519fffac08c25618085')
//getCourses()


//second method: update first
//update directly
const DirectupdateCourse = async(id) => {
    const result = await Course.updateOne({_id: id}, {
        $set: {
            author: "J. J. Jameson",
            isPublished: false
        }
    });
    console.log(result);
}
//DirectupdateCourse('63e20a2044161414e229400f')
//getCourses()


//Deletion one
const deleteCourse = async(id) => {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
}
//deleteCourse('63e20a2044161414e229400f')

//Delete several
const deleteCourses = async() => {
    const courses = await Course.deleteMany({
        isPublished: false // if this matches delete it
    });
    console.log(courses)
}
//deleteCourses()


