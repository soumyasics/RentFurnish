const Furnitures = require('./furnitureSchema');
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
]);

// Register a new Furniture
const registerFurniture = async (req, res) => {
  

    try {
      const { name, shopId, category, description, rent,condition, roomType, dimension, quantity } = req.body;
      const newFurniture = new Furnitures({
        name,
        shopId,
        category,
        description,
        condition,
        roomType,
        dimension,
        rent,
        quantity,
        image1: req.files['image1'] ? req.files['image1'][0] : null,
        image2: req.files['image2'] ? req.files['image2'][0] : null,
        image3: req.files['image3'] ? req.files['image3'][0] : null,
        image4: req.files['image4'] ? req.files['image4'][0] : null
      });

      await newFurniture.save()
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
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  
};

// View all Furnitures
const viewFurnitures = (req, res) => {
  Furnitures.find({})
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


// View all Furnitures with quantity > 0
const viewFurnitureswithQuantityGtZero = (req, res) => {
    Furnitures.find({ quantity: { $gt: 0 } })
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
  


// View Furniture by ID
const viewFurnitureById = (req, res) => {
  Furnitures.findById(req.params.id)
    .exec()
    .then(data => {
      if (data) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data
        });
      } else {
        res.json({
          status: 404,
          msg: "Furniture not found"
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

// Update Furniture by ID
const editFurnitureById = (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ msg: err.message });
    } else if (err) {
      return res.status(500).json({ msg: err.message });
    }
    try {
      const { name, shopId,rent, category, description, condition, roomType, dimension, quantity } = req.body;
      const updateData = {
        name,
        shopId,
        category,
        rent,
        description,
        condition,
        roomType,
        dimension,
        quantity
      };

      if (req.files['image1']) updateData.image1 = req.files['image1'][0];
      if (req.files['image2']) updateData.image2 = req.files['image2'][0];
      if (req.files['image3']) updateData.image3 = req.files['image3'][0];
      if (req.files['image4']) updateData.image4 = req.files['image4'][0];

      Furnitures.findByIdAndUpdate(req.params.id, updateData, { new: true })
        .exec()
        .then(data => {
          if (data) {
            res.json({
              status: 200,
              msg: "Updated successfully",
              data: data
            });
          } else {
            res.json({
              status: 404,
              msg: "Furniture not found"
            });
          }
        })
        .catch(err => {
          res.status(500).json({
            status: 500,
            msg: "Data not updated",
            Error: err
          });
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

// Delete Furniture by ID
const deleteFurnitureById = (req, res) => {
  Furnitures.findByIdAndDelete(req.params.id)
    .exec()
    .then(data => {
      if (data) {
        res.json({
          status: 200,
          msg: "Deleted successfully",
          data: data
        });
      } else {
        res.json({
          status: 404,
          msg: "Furniture not found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: "Data not deleted",
        Error: err
      });
    });
};


// View all Furnitures with quantity > 0
const viewFurnituresByShopId = (req, res) => {
    Furnitures.find({shopId:req.params.id})
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
  
module.exports = {
  registerFurniture,
  viewFurnitures,
  viewFurnitureById,
  editFurnitureById,
  deleteFurnitureById,
  upload,
  viewFurnituresByShopId,
  viewFurnitureswithQuantityGtZero
};
