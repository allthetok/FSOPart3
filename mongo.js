const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://allentok:${password}@cluster0.rjppg.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//     content: 'HTMl is easy',
//     date: new Date(),
//     important: true,
// })

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })