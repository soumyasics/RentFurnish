const customerschema=require("./customerSchema")
const multer=require ("multer")
const jwt = require("jsonwebtoken");


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage }).single("image");

  const userregister = (req, res) => {
    const customer = new customerschema({
      name: req.body.name,
      gender:req.body.gender,  
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      address:req.body.address
    });
    customer
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
          let errMsg = "Data not Inserted";
          if (err.keyPattern.hasOwnProperty("phone")) {
            errMsg = "Contact already in Use";
          } else if (err.keyPattern.hasOwnProperty("email")) {
            errMsg = "Email Id already in Use";
          } else if (err.keyPattern.hasOwnProperty("regno")) {
            errMsg = "Reg no  already in Use";
          }
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
  };

  const logincustomer = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await customerschema.findOne({ email: email });

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


const forgotPwdcustomer = (req, res) => {
  customerschema
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

const viewcustbyid = (req, res) => {
  customerschema
      .findById(
          { _id: req.params.id }
        
      )
      .exec()
      .then((data) => {
          if (data != null)
              res.json({
                  status: 200,
                  msg: "found successfully",
                  data:data
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

const editcustbyid = (req, res) => {
  customerschema
      .findByIdAndUpdate(
          { _id: req.params.id },
          {
            name: req.body.name,
      gender:req.body.gender,  
      phone: req.body.phone,
      email: req.body.email,
      address:req.body.address
          }
        
      )
      .exec()
      .then((data) => {
          if (data != null)
              res.json({
                  status: 200,
                  msg: "Updated successfully",
                  data:data
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
const viewallcust = (req, res) => {
  customerschema
      .find(
          {isActive:true })
      .exec()
      .then((data) => {
          if (data != null)
              res.json({
                  status: 200,
                  msg: "found successfully",
                  data:data
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

const deActivateUserById = async (req, res) => {
  await customerschema.findByIdAndUpdate({ _id: req.params.id }, { isActive: false }).exec()
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

const activateUserById = async (req, res) => {
  await customerschema.findByIdAndUpdate({ _id: req.params.id }, { isActive: true }).exec()
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

const searchUserByName = async (req, res) => {
  try {
    const name = req.params.name;
    const user = await customerschema.find({ name: new RegExp(name, 'i') })

    if (!result) {
      return res.json({
        status: 404,
        data: null,
        msg: 'User not found'
      });
    }

    res.json({
      status: 200,
      data: result,
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

  module.exports={
    userregister,
    logincustomer  ,
    forgotPwdcustomer  ,
    viewcustbyid  ,
    viewallcust    ,
    activateUserById,
    deActivateUserById ,
    editcustbyid,
searchUserByName
  }