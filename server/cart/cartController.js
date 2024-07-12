const mongoose = require("mongoose");
const Cart = require('./cartSchema'); 

const addCart =async (req, res) => {
    let data=await Cart.findOne( {
        custId: req.body.custId,
        furnitureId: req.body.furnitureId})
    if(!data){
  const newCart = new Cart({
    custId: req.body.custId,
    date: new Date(),
    furnitureId: req.body.furnitureId,
  });

  newCart.save()
    .then(data => {
      res.json({
        status: 200,
        message: "Cart item added successfully",
        data: data,
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        err: err,
        status: 500,
      });
    });
}else{
    return   res.json({
        status: 409,
        message: "Furniture Already In Your Cart !!"
            
})
}
};

const viewAllCart = (req, res) => {
  Cart.find()
    .populate('custId')
    .populate('furnitureId')
    .exec()
    .then(Cart => {
      res.status(200).json({
        status: 200,
        message: "Cart retrieved successfully",
        data: Cart,
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        status: 500,
        message: "Error retrieving Cart",
        error: err,
      });
    });
};

const deleteCartById = (req, res) => {
  Cart.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then(Cart => {
      res.json({
        status: 200,
        message: "Cart item deleted successfully",
        data: Cart,
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        status: 500,
        message: "Error deleting Cart item",
        error: err,
      });
    });
};

const viewCartById = (req, res) => {
  Cart.findById({ _id: req.params.id })
    .populate('custId')
    .populate('furnitureId')
    .exec()
    .then(Cart => {
      res.json({
        status: 200,
        message: "Cart item retrieved successfully",
        data: Cart,
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        status: 500,
        message: "Error retrieving Cart item",
        error: err,
      });
    });
};

const viewCartBycustId = (req, res) => {
  Cart.find({ custId: req.params.id })
    .populate('custId')
    .populate('furnitureId')
    .exec()
    .then(Cart => {
      res.json({
        status: 200,
        message: "Cart retrieved successfully",
        data: Cart,
      });
    })
    .catch(err => {
      console.error(err);
      res.json({
        status: 500,
        message: "Error retrieving Cart",
        error: err,
      });
    });
};

module.exports = {
  addCart,
  viewAllCart,
  viewCartById,
  deleteCartById,
  viewCartBycustId,
};
