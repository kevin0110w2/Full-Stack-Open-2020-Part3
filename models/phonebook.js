const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
console.log('connecting to', url)

// const url =
//     `mongodb+srv://admin:${password}@cluster0.0tka2.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  number: {
    type: String,
    minlength: 8
  },
  id: Number
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

phonebookSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Person', phonebookSchema)