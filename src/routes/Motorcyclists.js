const express = require("express");
const router = express.Router();
const motorcyclist = require("..//models/Motorcyclist");

router.get("/", (req, res) => {
  motorcyclist
    .find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.get("/available/:token", (req, res) => {
  const token = req.params.token;
  motorcyclist
    .find({ taken: false })
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

router.get("/select", (req, res) => {
  motorcyclist
    .findOne({ taken: false })
    .then((resp) => {
      resp != null
        ? res.status(200).json({ id: resp._id })
        : res.status(204).json({ message: "No available services now" });
    })
    .catch((err) => {
    });
});

router.post("/", (req, res) => {
  motorcyclist
    .insertMany([
      { taken: false, takenBy: null, takenIn: null },
      { taken: false, takenBy: null, takenIn: null },
      { taken: false, takenBy: null, takenIn: null },
      { taken: false, takenBy: null, takenIn: null },
      { taken: false, takenBy: null, takenIn: null },
      { taken: false, takenBy: null, takenIn: null },
      { taken: false, takenBy: null, takenIn: null },
      { taken: false, takenBy: null, takenIn: null },
    ])
    .then((data) => {
      console.log("Valid", data);
    })
    .catch((err) => {
      console.log("Invalid", err);
    });
});

router.get("/serviceStatus/:rowKey", (req, res) => {
  motorcyclist.find({ takenIn: req.params.rowKey }).then((resp) => {
    res.status(200).json(resp);
  });
});

router.put("/:id", async (req, res) => {
  try {
    var obj = await motorcyclist.findById(req.params.id);
    var isTaken = obj.taken;
    var updatedMotoService;
    if (isTaken) {
      updatedMotoService = await motorcyclist.updateOne(
        { _id: req.params.id },
        { $set: { taken: !isTaken, takenBy: null, takenIn: null } }
      );
      res.status(200).json(updatedMotoService);
    } else {
      updatedMotoService = await motorcyclist.updateOne(
        { _id: req.params.id },
        {
          $set: {
            takenBy: req.body.userId,
            taken: !isTaken,
            takenIn: req.body.rowKey,
          },
        }
      );
      res.status(200).json(updatedMotoService);
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
module.exports = router;
