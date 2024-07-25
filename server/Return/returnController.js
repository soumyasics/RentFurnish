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
            inspectionStatus: "Pending"
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


//Assign Delivery Agent
const assignDeliveryAgent = (req, res) => {
    Return.findByIdAndUpdate({ _id: req.params.id }, {
        returnStatus: "Confirmed",
        deliveryId: req.body.deliveryId,
        deliveryDate: req.body.deliveryDate,
        confirmedDate: new Date(),
        completionStatus: false,
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


//View Return By DeliveryAgent Id
const viewMyReturnsByDeliveryAgentId = async (req, res) => {
    try {
        const orders = await Return.find({ deliveryId: req.params.id, returnStatus: "Confirmed", completionStatus: false, inspectionStatus: "Pending" })
            .populate('furnitureId')
            .populate('customerId')
            .populate('shopId')
            .populate('deliveryId')
            .populate('orderId');

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

//Update Completion Status
const updateCompletionOfDelivery = async (req, res) => {
    try {
        const orders = await Return.findByIdAndUpdate({ _id: req.params.id }, { completionDate: new Date(), completionStatus: true })

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

//Update Inspecton Status
const updateInspectionStatus = async (req, res) => {
    try {
        const { fineAmount } = req.body;
        const orders = await Return.findByIdAndUpdate(req.params.id, {
            inspectionStatus: "Confirmed",
            inspectionDate: new Date(),
            fineAmount
        });

        res.status(200).json({
            status: 200,
            message: 'Added successfully',
            data: orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: 'Error updating inspection status',
            error: err
        });
    }
};


//Update Payment Status
const updatePaymentStatus = async (req, res) => {
    try {
        const { furnitureId } = req.params;
        const orders = await Return.findOneAndUpdate(
            { furnitureId },
            { paymentStatus: true, paymentDate: new Date(), completionDate: new Date() },
            { new: true }
        );

        if (!orders) {
            return res.status(404).json({
                status: 404,
                message: 'Return not found for the given furnitureId',
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Payment status updated successfully',
            data: orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: 'Error updating payment status',
            error: err
        });
    }
};


//UpdateInspection Status ByFurniture Id
const updateInspectionStatusByFurnitureId = async (req, res) => {
    try {
        const orders = await Return.findOneAndUpdate(
            { furnitureId: req.params.id },
            { inspectionStatus: "Submitted" },
            { new: true }
        );

        if (!orders) {
            return res.status(404).json({
                status: 404,
                message: 'Order not found',
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Added successfully',
            data: orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: 'Error updating inspection status',
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
    updateInspectionStatus,
    updatePaymentStatus,
    updateInspectionStatusByFurnitureId
};
