const shopschema = require("./shopOwnerSchema");
const multer = require("multer");
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
  const shops = new shopschema({
    shopname: req.body.shopname,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    regno: req.body.regno,
    buildingname: req.body.buildingname,
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

//Shop registration finished

function verifyToken(req, res, next) {
  let authHeader = req.headers.authorization;

  console.log("Auth Header:", authHeader);

  if (authHeader === undefined) {
    next();
  }

  let token = authHeader.split(" ")[1];

  console.log("Token:", token);

  jwt.verify(token, "secret_key", function (err, decoded) {
    if (err) {
      console.log("Token Verification Error:", err);
      return res.status(500).send({ error: "Authorization failed" });
    } else {
      next();
    }
  });
}
const shopLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await shopschema.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        const token = jwt.sign(
          { email: user.email, password: user.password },
          "secret_key",
          { expiresIn: 86400 }
        );
        return res
          .status(200)
          .json({ message: "Login successful", token, id: user._id });
      } else {
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

const viewshopbyid = (req, res) => {
  shopschema
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
//viewshopbyid completed

const forgotPwdshop = (req, res) => {
  shopschema
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

module.exports = { registershop, upload, 
                    shopLogin, verifyToken, 
                    viewshopbyid,
                    forgotPwdshop
                 };
