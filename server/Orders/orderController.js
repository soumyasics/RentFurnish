const furnitureSchema = require('../Furniture/furnitureSchema');
const customerSchema = require('../customer/customerSchema');

const Order = require('./orderSchema');

const addOrder = async(req, res) => {

const shops=await furnitureSchema.findById(req.body.furnitureId)
const cust=await customerSchema.findById(req.body.customerId)

    const order = new Order({
       
        furnitureId: req.body.furnitureId,
        customerId: req.body.customerId,
        count: req.body.count,      
        amount:req.body.amount,
        date:new Date(),
        shopId: shops._id,
        name: cust.name,
        email: cust.email,
        contact: cust.contact,
        address: cust.address,


    });

   await order.save()
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

const addAddressByOrderId=(req,res)=>{
    Order.findByIdAndUpdate({_id:req.params.id},{
        name:req.body.name,
        email: req.body.email,
        address:req.body.address,
        contact: req.body.contact,
    }).exec()
    .then(data => {
        res.json({
            status: 200,
            message: "address added successfully",
            data: data,
        });
    })
    .catch(err => {
        console.error(err);
        res.json({
            status: 500,
            message: "Error adding address",
            error: err,
        });
    });
}

// View Order By ID
const viewOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('furnitureId')
            .populate('customerId')
            .populate('shopId')
            .populate('deliveryId');
        
        if (!order) {
            return res.status(404).json({
                status: 404,
                message: 'Order not found'
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Order retrieved successfully',
            data: order
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: 'Error retrieving order',
            error: err
        });
    }
};

// View Orders By Shop ID
const viewOrdersByShopId = async (req, res) => {
    try {
        const orders = await Order.find({ shopId: req.params.shopId })
            .populate('furnitureId')
            .populate('customerId')
            .populate('shopId')
            .populate('deliveryId');
        
        res.status(200).json({
            status: 200,
            message: 'Orders retrieved successfully',
            data: orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: 'Error retrieving orders',
            error: err
        });
    }
};

// View Orders By Customer ID
const viewOrdersByCustId = async (req, res) => {
    try {
        const orders = await Order.find({ customerId: req.params.customerId })
            .populate('furnitureId')
            .populate('customerId')
            .populate('shopId')
            .populate('deliveryId');
        
        res.status(200).json({
            status: 200,
            message: 'Orders retrieved successfully',
            data: orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: 'Error retrieving orders',
            error: err
        });
    }
};

// View Pending Orders for Delivery
const viewPendingOrdersForDelivery = async (req, res) => {
    try {
        const orders = await Order.find({ deliveryStatus: false })
            .populate('furnitureId')
            .populate('customerId')
            .populate('shopId')
            .populate('deliveryId');
        
        res.status(200).json({
            status: 200,
            message: 'Pending orders retrieved successfully',
            data: orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: 'Error retrieving pending orders',
            error: err
        });
    }
};





module.exports={
    addOrder,
    viewOrderById,
    viewOrdersByShopId,
    viewOrdersByCustId,
    viewPendingOrdersForDelivery,
    addAddressByOrderId
}