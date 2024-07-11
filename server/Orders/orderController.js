const furnitureSchema = require('../Furniture/furnitureSchema');
const Order = require('./orderSchema');

const addOrder = async(req, res) => {

const shops=await furnitureSchema.findById(req.body.furnitureId)

    const order = new Order({
       
        furnitureId: req.body.furnitureId,
        customerId: req.body.customerId,
        count: req.body.count,      
        date:new Date(),
        shopId: shops._id,
    });

    order.save()
        .then(data => {
            res.json({
                status: 200,
                message: "Order added successfully",
                data: data,
            });
        })
        .catch(err => {
            console.error(err);
            res.json({
                status: 500,
                message: "Error adding order",
                error: err,
            });
        });
};


module.exports={
    addOrder
}