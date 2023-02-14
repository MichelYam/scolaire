const mongoose = require('mongoose')
const databaseUrl = process.env.DATABASE_URL || 'mongodb+srv://admin:admin@fullstack.azp5h.mongodb.net/school?retryWrites=true&w=majority'
// mongodb+srv://admin:admin@fullstack.azp5h.mongodb.net/school?retryWrites=true&w=majority
module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connexion à MongoDB réussie')
  } catch (error) {
    console.error(`Connexion à MongoDB échouée: ${error}`)
    throw new Error(error)
  }
}