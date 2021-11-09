const mongoose = require("mongoose");

const dictSchema = {
  title: String,
  description: String,
  lexicalCategory: String,
  examples: String,
  etymologies: [],
  secondDefinition: String,
  secondlexicalCategory: String,
  secondExamples: String,
  thirdExamples: String,
};

const dictionary = mongoose.model("dictSchema", dictSchema);

module.exports = dictionary;
