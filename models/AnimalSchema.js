const mongoose = require('mongoose')

const AnimalSchema = new mongoose.Schema({
    name: String,
    places: String,
    status: String,
    habitat: String,
    population: String,
    scientificName: String,
    height: String, 
    weight: String, 
    description: String,
    image: String,
    moreImg: [String]
})

module.exports = mongoose.model("Animal", AnimalSchema)