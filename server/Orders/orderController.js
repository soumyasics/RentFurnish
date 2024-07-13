const furnitureSchema = require('../Furniture/furnitureSchema');
const customerSchema = require('../customer/customerSchema');

const Order = require('./orderSchema');

const addOrder = async(req, res) => {

const shops=await furnitureSchema.findById(req.body.furnitureId)
const cust=await customerSchema.findById(req.body.customerId)
let furn= await furnitureSchema.findById({_id:req.body.furnitureId})
        let newQuantity=furn.quantity-req.body.count
        if(newQuantity<0){
            return res.json({
                status: 405,
                message: `Only ${furn.quantity} item  found in the shop! Please Change your count.`
            });
        }
        let totalRent=req.body.count*furn.rent*req.body.noOfDays
        console.log("amt",req.body.count,"",furn.rent,"",req.body.noOfDays);

console.log("amt",req.body.count*furn.rent*req.body.noOfDays);
    const order = new Order({
       
        furnitureId: req.body.furnitureId,
        customerId: req.body.customerId,
        count: req.body.count,      
        amount:totalRent,
        date:new Date(),
        noOfDays:req.body.noOfDays,
        shopId: shops.shopId,
        name: cust.name,
        email: cust.email,
        contact: cust.contact,
        address: cust.address,
        orderDate:new Date()

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
        
        
       let upd= await furnitureSchema.findByIdAndUpdate({_id:req.body.furnitureId},{quantity:newQuantity})
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
        const orders = await Order.find({ shopId: req.params.id })
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

const assignDeliveryAgent=(req,res)=>{
    Order.findByIdAndUpdate({_id:req.params.id},{
        deliveryStatus:true,
        deliveryId: req.body.deliveryId,
        deliveryDate:req.body.deliveryDate,
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

// View Orders By Shop ID
const updateOrderPayment = async (req, res) => {
    try {
        const orders = await Order.findByIdAndUpdate({_id: req.params.id },{paymentStatus:true})
             
        res.status(200).json({
            status: 200,
            message: 'Payment Added successfully',
            data: orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Payment',
            error: err
        });
    }
};

// View Orders By Customer ID
const viewOrdersByCustId = async (req, res) => {
    try {
        const orders = await Order.find({ customerId: req.params.id })
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
        const orders = await Order.find({shopId:req.params.id, deliveryStatus: false})
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


const viewassignedOrdersForDelivery = async (req, res) => {
    try {
        const orders = await Order.find({shopId:req.params.id,deliveryStatus: true})
            .populate('furnitureId')
            .populate('customerId')
            .populate('shopId')
            .populate('deliveryId');
        
        res.status(200).json({
            status: 200,
            message: ' orders retrieved successfully',
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


const viewMyOrdersByDeliveryAgentId = async (req, res) => {
    try {
        const orders = await Order.find({deliveryId:req.params.id,deliveryStatus: true,deliveryCompletion:false})
            .populate('furnitureId')
            .populate('customerId')
            .populate('shopId')
            .populate('deliveryId');
        
        res.status(200).json({
            status: 200,
            message: ' orders retrieved successfully',
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




// View Orders By Shop ID
const updateCompletionOfDelivery = async (req, res) => {
    try {
        const orders = await Order.findByIdAndUpdate({_id: req.params.id },{deliveryCompletion:true})
             
        res.status(200).json({
            status: 200,
            message: ' Added successfully',
            data: orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: 'Error retrieving Payment',
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
    addAddressByOrderId,
    updateOrderPayment,
    assignDeliveryAgent,
    viewassignedOrdersForDelivery,
    viewMyOrdersByDeliveryAgentId,
    updateCompletionOfDelivery
}