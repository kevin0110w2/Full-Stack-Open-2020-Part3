const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://admin:${password}@cluster0.0tka2.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length > 3 && process.argv.length < 6) {
  let number = 0
  let count = Person.find({}).then(result => {
    result.forEach(count => {
      number + 1
    })
    mongoose.connection.close()
  })
  const newId = Number(number) + 1

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    id: newId
  })

  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })

} else if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}