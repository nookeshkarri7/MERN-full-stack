//import require modules
const express = require("express");
const cors = require("cors"); //to make backend accessbility from frontend
const Dictionary = require("oxford-dictionary"); //to use oxford API
const mongoose = require("mongoose"); //to use mongodb
const dotenv = require("dotenv"); //to store sensitive information
const dictionaryModel = require("./dictonaryModel"); //import mongodb collection model

const app = express(); //creates express instance
app.use(express.json()); //middleware to work on json input and output
app.use(cors());
dotenv.config();
const port = process.env.PORT || 4000;

//backend runs at 4000 in localhost
app.listen(port, () => console.log(`backend is running at ${port}`));

//database connection username,password will be imported from .env file
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.nj73t.mongodb.net/Cluster0`
);

//configuration for dictionary API
const config = {
  app_id: process.env.DICT_API_ID,
  app_key: process.env.DICT_API_KEY,
  source_lang: "en-us",
};
const dict = new Dictionary(config);

//this method is used to add a word when user adds any word
app.get("/create/:searchitem", async (req, res) => {
  const { searchitem } = req.params;
  try {
    //to handle errors try catch method is used
    const response = await dict.find(searchitem); //it finds input search term

    //this varaible is used to split the list of objects to converts list of strings
    const secondExample = response.results[0].lexicalEntries[1].entries[0].senses[0].examples.map(
      (each) => each.text
    );

    //creates a dictionary object based on input word
    const dictionaryItem = {
      title: searchitem,
      description:
        response.results[0].lexicalEntries[0].entries[0].senses[0]
          .definitions[0],
      lexicalCategory:
        response.results[0].lexicalEntries[0].lexicalCategory.text,
      etymologies: response.results[0].lexicalEntries[0].entries[0].etymologies,
      examples:
        response.results[0].lexicalEntries[0].entries[0].senses[0].examples[0]
          .text,
      secondDefinition:
        response.results[0].lexicalEntries[1].entries[0].senses[0]
          .definitions[0],
      secondlexicalCategory:
        response.results[0].lexicalEntries[1].lexicalCategory.text,
      secondExamples: secondExample[0],
      thirdExamples: secondExample[1],
    };
    //creates database object
    const newData = new dictionaryModel(dictionaryItem);
    newData.save(); //saves data in database
    res.send(newData); //sends data to to user
  } catch (e) {
    //executed when given word is not in dictionary API
    res.send("Not available in dictionary"); //it sends error message to user
  }
});

//used to get all items in collection from mongodb
app.get("/view/", async (req, res) => {
  const response = await dictionaryModel.find(); //find() method is used to get all items
  res.send(response); //sends all data to user
});

//used to get word data from mongodb based on id
app.get("/word-details/:id", async (req, res) => {
  const { id } = req.params; //id from user entered url
  const response = await dictionaryModel.findById(id); //gets data from mongodb based on ID
  res.send(response); //send data to user
});
