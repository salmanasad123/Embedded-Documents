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
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'     // name of the target collection which we want to refer
        // referring author collection
    }
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
        const courses = await Course.find()
            .populate('author');
        console.log(courses);
    } catch (err) {
        console.log(err.message);
    }
}

// createAuthor('Mosh', 'My Bio', 'My Website');
// createCourse('Node Course', '5c7169b2d8f28b1ce085d515');
listCourses();