const Inspection = require('./inspectionSchema')

const multer = require('multer');

// Setup multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        const uniquePrefix = 'prefix-';
        const originalname = file.originalname;
        const extension = originalname.split('.').pop();
        const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
        cb(null, filename);
    },
});
const upload = multer({ storage: storage }).fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 },
    { name: 'image6', maxCount: 1 },
]);

const regInspection = async (req, res) => {
    try {
        const { returnId, customerId, furnitureId, shopId, prodCondition } = req.body;
        const newInspection = new Inspection({
            returnId,
            customerId,
            furnitureId,
            shopId,
            prodCondition,
            image1: req.files['image1'] ? req.files['image1'][0] : null,
            image2: req.files['image2'] ? req.files['image2'][0] : null,
            image3: req.files['image3'] ? req.files['image3'][0] : null,
            image4: req.files['image4'] ? req.files['image4'][0] : null,
            image5: req.files['image5'] ? req.files['image5'][0] : null,
            image6: req.files['image6'] ? req.files['image6'][0] : null,
        })
        await newInspection.save()
            .then(data => {
                return res.json({
                    status: 200,
                    msg: "Inserted successfully",
                    data: data
                });
            })
            .catch(err => {
                return res.json({
                    status: 500,
                    msg: "Data not Inserted",
                    data: err
                });
            });
    }
    catch(error) {
        res.status(500).json({ message: error .message });
    }
}

//View Inspection By ShopId
const viewInspectionByShopId = async (req, res) => {
    try {
        const returnOrder = await Inspection.find({ shopId: req.params.id })
            .populate('furnitureId')
            .populate('customerId')
            .populate('shopId')

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

// View all Furnitures
const viewInspections = (req, res) => {
    Inspection.find({})
      .exec()
      .then(data => {
        if (data.length > 0) {
          res.json({
            status: 200,
            msg: "Data obtained successfully",
            data: data
          });
        } else {
          res.json({
            status: 200,
            msg: "No Data obtained"
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          msg: "Data not obtained",
          Error: err
        });
      });
  };

module.exports={
    regInspection,
    upload,
    viewInspectionByShopId,
    viewInspections
}