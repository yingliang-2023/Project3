const mongoose = require("mongoose");
const Item = mongoose.model("Item");

exports.createItem = (req, res) => {
  const item = new Item({
    itemname: req.body.itemname,
    brand: req.body.brand,
    color: req.body.color,
    year: req.body.year,
  });

  //save a item in the mongodb
  item
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fail!",
        error: err.message,
      });
    });
};

exports.getItem = (req, res) => {
 console.log(Item.findById(req.params.id));

  Item.findById(req.params.id)
    .select("-__v")
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "item not found with id " + req.params.id,
          error: err,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Item with id " + req.params.id,
        error: err,
      });
    });
};

exports.items = (req, res) => {
  Item.find()
    .select("-__v")
    .then((itemInfos) => {
      res.status(200).json(itemInfos);
    })
    .catch((err) => {
      //log on console
      console.log(error);

      res.status(500).json({
        message: "Error!",
        error: error,
      });
    });
};

exports.deleteItem = (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .select("-__v-_id")
    .then((item) => {
      if (!item) {
        res.status(404).json({
          message: "No item found with id = " + req.params.id,
          error: "404",
        });
      }
      res.status(200).json({});
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error -> Can't delete item with id = " + req.params.id,
        error: err.message,
      });
    });
};

exports.updateItem = (req, res) => {
  //find item and update it
  Item.findByIdAndUpdate(
    req.body._id,
    {
      itemname: req.body.itemname,
      brand: req.body.brand,
      color: req.body.color,
      year: req.body.year,
    },
    { new: false }
  )
    .select("-__v")
    .then((item) => {
      if (!item) {
        return res.status(404).send({
          message:
            "Error -> Can't update an item with id = " + req.params.id,
          error: "Not Found!",
        });
      }
      res.status(200).json(item);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error -> Can't update a item with id = " + req.params.id,
        error: err.message,
      });
    });
};