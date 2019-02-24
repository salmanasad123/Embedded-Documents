const mongoose = require('mongoose');

const promise = mongoose.connect('mongodb://localhost/playground');
promise.then(function () {
    console.log("Connected to mongodb");
}).catch(function (err) {
    console.log("Error connecting to mongodb", err);
});

var authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

var courseSchema = new mongoose.Schema({
    name: String,
    author: authorSchema    // embedding author document directly inside course document

});

const Course = mongoose.model('Course', courseSchema);


async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();
    console.log(result);
}


async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    try {
        const courses = await Course.find();
        console.log(courses);
    } catch (err) {
        console.log(err.message);
    }
}

//createAuthor('Mosh', 'My Bio', 'My Website');
createCourse('Node Course', new Author({ name: 'Mosh', bio: 'My Bio', website: 'My Website' }));
listCourses();


// embedded documents cannot be saved on their own, they can be saved on the context of their parent document
// embedded documets can have their own validations
// if we want to save updated embedded document, we save the parent document and child (embedded) is saved automatically