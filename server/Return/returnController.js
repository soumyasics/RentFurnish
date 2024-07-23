const Return = require('./returnSchema');
const furnitureSchema = require('../Furniture/furnitureSchema');
const orderSchema = require('../Orders/orderSchema')
const customerSchema = require('../customer/customerSchema');


// Add Return
const addReturn = async (req, res) => {
    try {
        const order = await orderSchema.findById(req.body.orderId);
        const customer = await customerSchema.findById(req.body.customerId);
        const furniture = await furnitureSchema.findById(req.body.furnitureId);
        // let newQuantity = furniture.quantity + order.count;

        const returnOrder = new Return({
            orderId: req.body.orderId,
            customerId: req.body.customerId,
            furnitureId: req.body.furnitureId,
            shopId: req.body.shopId,
            returnDate: new Date(),
            returnAmount: req.body.returnAmount,
        });

        await returnOrder.save()
            .then(data => {
                console.log(data)
                res.json({
                    status: 200,
                    message: 'Return added successfully',
                    data: data,
                });
            })
            .catch(err => {
                console.error(err);
                res.json({
                    status: 500,
                    message: 'Error adding return',
                    error: err,
                });
            });
    } catch (err) {
        console.error(err);
        res.json({
            status: 500,
            message: 'Server error',
            error: err,
        });
    }
    // await furnitureSchema.findByIdAndUpdate(req.body.furnitureId, { quantity: newQuantity });

};

//View By Id
const viewReturnById = async (req, res) => {
    try {
        const returnOrder = await Return.findById(req.params.id)
            .populate('orderId')
            .populate('customerId')
            .populate('furnitureId')
            .populate('shopId');

        if (!returnOrder) {
            return res.status(404).json({
                status: 404,
                message: 'Return not found'
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Return retrieved successfully',
            data: returnOrder
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: 'Error retrieving return',
            error: err
        });
    }
};

//View Return By ShopId
const viewReturnByShopId = async (req, res) => {
    try {
        const returnOrder = await Return.find({ shopId: req.params.id })
            .populate('furnitureId')
            .populate('customerId')
            .populate('shopId')
            .populate('orderId')
            .populate('deliveryId');

        res.status(200).json({
            status: 200,
            message: 'Return retrieved successfully',
            data: returnOrder
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

//View Return By FurnitureId
const viewReturnByFurnitureId = async (req, res) => {
    try {
        const returnOrder = await Return.find({ furnitureId: req.params.id })
            .populate('customerId')
            .populate('shopId')
            .populate('furnitureId')
            .populate('orderId')
            .populate('deliveryId');

        res.status(200).json({
            status: 200,
            message: 'Return retrieved successfully',
            data: returnOrder
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

// View Return By Customer ID
const viewReturnByCustId = async (req, res) => {
    try {
        const returnOrder = await Return.find({ customerId: req.params.id })
            .populate('furnitureId')
            .populate('customerId')
            .populate('shopId')
            .populate('orderId')

        res.status(200).json({
            status: 200,
            message: 'Orders retrieved successfully',
            data: returnOrder
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


//View Pending Return by Id
const viewPendingReturnByShopId = async (req, res) => {
    try {
        const returnOrder = await Return.find({ shopId: req.params.id, returnStatus: "Pending" })
            .populate('orderId')
            .populate('customerId')
            .populate('furnitureId')
            .populate('shopId');

        if (!returnOrder) {
            return res.status(404).json({
                status: 404,
                message: 'Return not found'
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Return retrieved successfully',
            data: returnOrder
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: 'Error retrieving return',
            error: err
        });
    }
};



const assignDeliveryAgent=(req,res)=>{
    Return.findByIdAndUpdate({_id:req.params.id},{
        returnStatus:"Confirmed",
        deliveryId: req.body.deliveryId,
        deliveryDate:req.body.deliveryDate,
        confirmedDate:new Date(),
        completionStatus:false
    }).exec()
    .then(data => {
        res.json({
            status: 200,
            message: "Order assigned successfully",
            data: data,
        });
    })
    .catch(err => {
        console.error(err);
        res.json({
            status: 500,
            message: "Error assign delivery",
            error: err,
        });
    });
}

const viewMyReturnsByDeliveryAgentId = async (req, res) => {
    try {
        const orders = await Return.find({deliveryId:req.params.id,returnStatus: "Confirmed",completionStatus:false})
            .populate('furnitureId')
            .populate('customerId')
            .populate('shopId')
            .populate('deliveryId');
        
        res.status(200).json({
            status: 200,
            message: ' Return retrieved successfully',
            data: orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: 'Error retrieving pending Return',
            error: err
        });
    }
};

const updateCompletionOfDelivery = async (req, res) => {
    try {
        const orders = await Return.findByIdAndUpdate({_id: req.params.id },{completionDate:new Date(),completionStatus:true})
             
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


const updateInspection = async (req, res) => {
    try {
        const orders = await Return.findByIdAndUpdate({_id: req.params.id },{inspectionStatus:true})
             
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


module.exports = {
    addReturn,
    viewReturnById,
    viewReturnByShopId,
    viewReturnByCustId,
    viewPendingReturnByShopId,
    viewReturnByFurnitureId,
    assignDeliveryAgent,
    viewMyReturnsByDeliveryAgentId,
    updateCompletionOfDelivery,
    updateInspection
};
