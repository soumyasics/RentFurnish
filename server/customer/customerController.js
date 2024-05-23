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

  const registershop = (req, res) => {
    const shops = new customerschema({
      firstname: req.body.firstname,
      lastname:req.body.lastname,
      gender:req.body.gender,  
      age:req.body.age, 
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      housename: req.body.housename,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      image: req.file,
    });
    shops
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
  