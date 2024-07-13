const deliveryagents = require("./deliveryAgentSchema");
const customerSchema = require("../customer/customerSchema");
const shopOwnerSchema = require("../shopOwner/shopOwnerSchema");
const multer = require("multer");

const jwt = require("jsonwebtoken");
// const secret = process.env.JWT_SECRET || 'Secret-key';
const secret = "secret_key"

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage }).single("image");


const addDeliveryAgent =async (req, res) => {

    let existingAgentPhone1 = await deliveryagents.findOne({ phone:req.body.phone });
    let existingAgentPhone2 = await shopOwnerSchema.findOne({ phone:req.body.phone });
    let existingAgentPhone3 = await customerSchema.findOne({ phone:req.body.phone });

    let existingAgentmail1 = await deliveryagents.findOne({ email:req.body.email });
    let existingAgentmail2 = await shopOwnerSchema.findOne({ email:req.body.email });
    let existingAgentmail3 = await customerSchema.findOne({ email:req.body.email });


    let existingAgentLicence1 = await deliveryagents.findOne({ licenceNumber:req.body.licenceNumber });
    let existingAgentvehNum1 = await deliveryagents.findOne({ vehicleNumber:req.body.vehicleNumber });
    if (existingAgentLicence1) {
        return res.json({
            status: 409,
            msg: "Licence Number Already Registered With Us !!",
            data: null
        });
    }
        else if(existingAgentvehNum1) {
            return res.json({
                status: 409,
                msg: "Vehicle Number Already Registered With Us !!",
                data: null
            });
        }
        else if(existingAgentPhone1||existingAgentPhone2||existingAgentPhone3) {
            return res.json({
                status: 409,
                msg: "Phone Number Already Registered With Us !!",
                data: null
            });
        }
        else if(existingAgentmail1||existingAgentmail2||existingAgentmail3) {
            return res.json({
                status: 409,
                msg: "E-Mail Id Already Registered With Us !!",
                data: null
            });
        }else{

    const shops = new deliveryagents({
        name: req.body.name,
        shopId:req.body.shopId,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        vehicleType: req.body.vehicleType,
        vehicleNumber: req.body.vehicleNumber,
        deliveryArea: req.body.deliveryArea,
        deliveryDistrict: req.body.deliveryDistrict,
        licenceNumber: req.body.licenceNumber,
        image:req.file
        
    });
   await shops
        .save()
        .then((data) => {
            res.json({
                status: 200,
                msg: "Inserted Successfully",
                data: data,
            });
        })
        .catch((err) => {
            if (err.code === 11000) {

                errMsg = "Email Id already in Use"
                return res.status(409).json({
                    status: 409,
                    msg: errMsg,
                    Error: err,
                });
            }
            res.status(500).json({
                status: 500,
                msg: "Data not Inserted",
                Error: err,
            });
        });
    }
};

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    console.log("t1", token);
    console.log("secret", secret);
    if (!token) {
        return res.json({ status: 401, msg: 'Unauthorized' });
    }
    jwt.verify(token, secret, (err, decodedToken) => {
        console.log(decodedToken);
        if (err) {
            return res.json({ status: 401, messagge: 'Unauthorized', err: err });
        }

        req.user = decodedToken.userId;
        next();
        return res.json({ status: 200, msg: 'ok', user: decodedToken.userId });
    });
    console.log(req.user);
};


const loginDeliveryAgent = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await deliveryagents.findOne({ email: email });

        if (user) {
            if (user.isActive === false) {
                return res.json({
                    status: 403,
                    msg: "User is not active. Please contact administrator."
                });
            } else if (user.password === password) {
                const token = jwt.sign(
                    { email: user.email, password: user.password },
                    "secret_key",
                    { expiresIn: 86400 }
                );
                return res.json({
                    status: 200,
                    msg: "Login Successfully", token, id: user._id
                })
            }
            //   return res
            //     .status(200)
            //     .json({ message: "Login successful", token, id: user._id });
            // } 
            else {
                return res.status(401).json({ message: "Password is incorrect" });
            }
        } else {
            return res.status(404).json({ message: "User does not exist" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//loginshop using token finished

const viewDeliveryAgentbyid = (req, res) => {
    deliveryagents
        .findById({ _id: req.params.id })
        .exec()
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: "Shop not found" });
            }
            res.json({
                status: 200,
                data: data,
            });
        })
        .catch((err) => {
            console.error("Error finding shop by ID:", err);
            res.status(500).json({ error: "Internal server error" });
        });
};
//viewDeliveryAgentbyid completed

const viewallDeliveryAgents = (req, res) => {
    deliveryagents
        .find({isActive:true})
        .exec()
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: "Delivery Agent not found" });
            }
            res.json({
                status: 200,
                data: data,
            });
        })
        .catch((err) => {
            console.error("Error finding  by ID:", err);
            res.status(500).json({ error: "Internal server error" });
        });
};
//view all  completed

// view Delivery agents By Shop Id
const viewDeliveryAgentbyShopid = (req, res) => {
    deliveryagents
        .find({shopId: req.params.id})
        .exec()
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: "Shop not found" });
            }
            res.json({
                status: 200,
                data: data,
            });
        })
        .catch((err) => {
            console.error("Error finding shop by ID:", err);
            res.status(500).json({ error: "Internal server error" });
        });
};




// view Delivery agents By Shop Id
const viewActiveDeliveryAgentbyShopid = (req, res) => {
    deliveryagents
        .find({shopId: req.params.id,isActive:true})
        .exec()
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: "Shop not found" });
            }
            res.json({
                status: 200,
                data: data,
            });
        })
        .catch((err) => {
            console.error("Error finding shop by ID:", err);
            res.status(500).json({ error: "Internal server error" });
        });
};
//viewDeliveryAgentbyid completed


const viewallDeliveryAgentsByDistrict = (req, res) => {
    deliveryagents
        .find({deliveryDistrict:req.params.district})
        .exec()
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: "Delivery Agent not found" });
            }
            res.json({
                status: 200,
                data: data,
            });
        })
        .catch((err) => {
            console.error("Error finding  by ID:", err);
            res.status(500).json({ error: "Internal server error" });
        });
};

const forgotPwdDeliveryAgent = (req, res) => {
    deliveryagents
        .findOneAndUpdate(
            { email: req.body.email },
            { password: req.body.password }
        )
        .exec()
        .then((data) => {
            if (data != null)
                res.json({
                    status: 200,
                    msg: "Updated successfully",
                });
            else
                res.json({
                    status: 500,
                    msg: "User Not Found",
                });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: 500,
                msg: "Data not Updated",
                Error: err,
            });
        });
};
//forget pswd completed

const updateDeliveryAgentprofile = (req, res) => {
    deliveryagents.findByIdAndUpdate({ _id: req.params.id }, {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        vehicleType: req.body.vehicleType,
        vehicleNumber: req.body.vehicleNumber,
        deliveryArea: req.body.deliveryArea,
        deliveryDistrict: req.body.deliveryDistrict,
        licenceNumber: req.body.licenceNumber,
        image:req.file
    })
        .exec()
        .then((response) => {
            res.json({
                status: 200,
                msg: "updated successfully",
                data: response
            })
        })
        .catch((err) => {
            res.json({
                status: 500,
                msg: "error", err
            })
            console.log(err);
        })

}


const deleteDeliveryAgentById = async (req, res) => {
    await deliveryagents.findByIdAndUpdate({ _id: req.params.id }, { isActive: false }).exec()
        .then((result) => {
            res.json({
                status: 200,
                data: result,
                msg: 'data deleted'
            })
        })
        .catch(err => {
            res.json({
                status: 500,
                msg: 'Error in API',
                err: err
            })
        })

}

const activateDeliveryAgentById = async (req, res) => {
    await deliveryagents.findByIdAndUpdate({ _id: req.params.id }, { isActive: true }).exec()
        .then((result) => {
            res.json({
                status: 200,
                data: result,
                msg: 'data deleted'
            })
        })
        .catch(err => {
            res.json({
                status: 500,
                msg: 'Error in API',
                err: err
            })
        })

}


const searchDeliveryByName = async (req, res) => {
    try {
      const name = req.params.name;
      const user = await deliveryagents.find({ name: new RegExp(name, 'i') })
  
      if (!user) {
        return res.json({
          status: 404,
          data: null,
          msg: 'User not found'
        });
      }
  
      res.json({
        status: 200,
        data: user,
        msg: 'User found'
      });
    } catch (err) {
      res.json({
        status: 500,
        data: null,
        msg: 'An error occurred'
      });
    }
  }
module.exports = {
    addDeliveryAgent, 
    loginDeliveryAgent,
    verifyToken,
    viewDeliveryAgentbyid,
    forgotPwdDeliveryAgent,
    viewallDeliveryAgents,
    updateDeliveryAgentprofile,
    deleteDeliveryAgentById,
    viewallDeliveryAgentsByDistrict,
    viewDeliveryAgentbyShopid,
    activateDeliveryAgentById,
    upload,
    searchDeliveryByName,
    viewActiveDeliveryAgentbyShopid
};
