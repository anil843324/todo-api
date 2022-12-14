const express = require("express");

const mongoose = require("mongoose");

const ListModel = require("./models/Lists");

const cors = require("cors");


const app = express();

app.use(cors());
// mongodb connect
mongoose
  .connect(
    "mongodb+srv://anildb:anildb@cluster0.apysrix.mongodb.net/mern-todo?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("Failed");
  });

// port
const port = process.env.PORT || 3000;

app.use(express.json());
// get route

app.get("/lists", async (req, res) => {
  let lists = await ListModel.find();

  if (lists.length > 0) {
    res.send(lists);
  } else {
    res.send({ result: "No lists found" });
  }
});

// post route

app.post("/add-lists", async (req, res) => {
  const lists = new ListModel(req.body);

  let result = await lists.save();

  res.send(result);
});

// delte route

app.delete("/lists/:id", async (req, res) => {
  const result = await ListModel.deleteOne({ _id: req.params.id });
  res.send(result);
});

// update route

app.put("/lists/:id", async (req, res) => {
  let result = await ListModel.updateOne(
    { _id: req.params.id },

    { $set: req.body }
  );
  res.send(result);
});

app.listen(port, () => {
  console.log(`server runing on ${port}...`);
});


