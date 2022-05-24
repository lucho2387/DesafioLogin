const mongoose = require('mongoose')
// const config = require('./config')


// const { HOST, NAME_DATABASE } = process.env
// const MONGODB_URI = `mongodb://${HOST}/${NAME_DATABASE}`
const MONGODB_URI2 = `mongodb+srv://luis:coderhouse@cluster0.9xnml.mongodb.net/ecommerce?retryWrites=true&w=majority` 

mongoose.connect(MONGODB_URI2, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("BD Conectada"))
    .catch (error => console.error(error))

// (async () => {
//   try {
//     const db = await mongoose.connect(config.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true,
//     });
//     console.log("Mongodb is connected to", db.connection.host);
//   } catch (error) {
//     console.error(error);
//   }
// })();