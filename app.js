const express = require("express");
const cors = require("cors");
const Dictionary = require("oxford-dictionary");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dictionaryModel = require("./dictonaryModel");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`backend is running at ${port}`));

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER}@cluster0.nj73t.mongodb.net/Cluster0`
);

const config = {
  app_id: process.env.DICT_API_ID,
  app_key: process.env.DICT_API_KEY,
  source_lang: "en-us",
};
const dict = new Dictionary(config);

app.get("/create/:searchitem", async (req, res) => {
  const { searchitem } = req.params;
  try {
    const response = await dict.find(searchitem);
    const secondEx = response.results[0].lexicalEntries[1].entries[0].senses[0].examples.map(
      (each) => each.text
    );
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
      secondExamples: secondEx[0],
      thirdExamples: secondEx[1],
    };
    const newData = new dictionaryModel(dictionaryItem);
    newData.save();
    res.send(newData);
  } catch (e) {
    res.send("Not available in dictionary");
  }
});

app.get("/view/", async (req, res) => {
  const response = await dictionaryModel.find();
  res.send(response);
});

app.get("/word-details/:id", async (req, res) => {
  const { id } = req.params;
  const response = await dictionaryModel.findById(id);
  res.send(response);
});
