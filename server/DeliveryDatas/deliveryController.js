const DeliveryUpdate = require('./deliverInfo');
const orders = require('../Orders/orderSchema');
const customerSchema = require('../customer/customerSchema');
const deliveryAgentSchema = require('../deliveryAgents/deliveryAgentSchema');

// Add a delivery update
const addDeliveryUpdate = async (req, res) => {
  try {
    const { update, orderId } = req.body;

    const orderData = await orders.findById(orderId);

  

    const newDeliveryUpdate = new DeliveryUpdate({
      update,
      orderId,
      custId:orderData.customerId,
      delAgentId:orderData.deliveryId,
      date:new Date()
    });

    const savedDeliveryUpdate = await newDeliveryUpdate.save();

    res.status(201).json({
      status: 201,
      message: 'Delivery update added successfully',
      data: savedDeliveryUpdate
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Error adding delivery update',
      error: error.message
    });
  }
};

// View delivery update by ID
const viewDeliveryUpdateById = async (req, res) => {
  try {
    const deliveryUpdate = await DeliveryUpdate.findById(req.params.id).sort({createdAt:1})
      .populate('orderId')
      .populate('custId')
      .populate('delAgentId');

    if (!deliveryUpdate) {
      return res.status(404).json({
        status: 404,
        message: 'Delivery update not found'
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Delivery update retrieved successfully',
      data: deliveryUpdate
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Error retrieving delivery update',
      error: error.message
    });
  }
};

// View delivery update by ID
const viewDeliveryUpdateByOrderId = async (req, res) => {
    try {
      const deliveryUpdate = await DeliveryUpdate.find({orderId:req.params.id}).sort({createdAt:1})
        .populate('shopId')
        .populate('custId')
        .populate('delAgentId');
  
      if (!deliveryUpdate) {
        return res.status(404).json({
          status: 404,
          message: 'Delivery update not found'
        });
      }
  
      res.status(200).json({
        status: 200,
        message: 'Delivery update retrieved successfully',
        data: deliveryUpdate
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: 'Error retrieving delivery update',
        error: error.message
      });
    }
  };
// View all delivery updates
const viewAllDeliveryUpdates = async (req, res) => {
  try {
    const deliveryUpdates = await DeliveryUpdate.find().sort({createdAt:1})
      .populate('orderId')
      .populate('custId')
      .populate('delAgentId');

    res.status(200).json({
      status: 200,
      message: 'Delivery updates retrieved successfully',
      data: deliveryUpdates
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Error retrieving delivery updates',
      error: error.message
    });
  }
};

// Delete delivery update by ID
const deleteDeliveryUpdateById = async (req, res) => {
  try {
    const deletedDeliveryUpdate = await DeliveryUpdate.findByIdAndDelete(req.params.id);

    if (!deletedDeliveryUpdate) {
      return res.status(404).json({
        status: 404,
        message: 'Delivery update not found'
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Delivery update deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Error deleting delivery update',
      error: error.message
    });
  }
};

module.exports = {
  addDeliveryUpdate,
  viewDeliveryUpdateById,
  viewAllDeliveryUpdates,
  deleteDeliveryUpdateById,
  viewDeliveryUpdateByOrderId
};
