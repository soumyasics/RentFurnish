const shopschema = require("./shopOwnerSchema");
const multer = require("multer");
const jwt = require("jsonwebtoken");
// const secret = process.env.JWT_SECRET || 'Secret-key';
const secret = "secret_key";
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

// function verifyToken(req, res, next) {
//   let authHeader = req.headers.authorization;

//   console.log("Auth Header:", authHeader);

//   if (!authHeader) {
//     return next();
//   }
//   let token = authHeader.split(" ")[1];
//   console.log("Token:", token);
//   jwt.verify(token, "secret_key", function (err, decoded) {
//     if (err) {
//       console.log("Token Verification Error:", err);
//       return res.status(500).send({ error: "Authorization failed" });
//     } else {
//       next();
//     }
//   });
// }

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  console.log("t1", token);
  console.log("secret", secret);
  if (!token) {
    return res.json({ status: 401, msg: "Unauthorized" });
  }
  jwt.verify(token, secret, (err, decodedToken) => {
    console.log(decodedToken);
    if (err) {
      return res.json({ status: 401, messagge: "Unauthorized", err: err });
    }

    req.user = decodedToken.userId;
    next();
    return res.json({ status: 200, msg: "ok", user: decodedToken.userId });
  });
  console.log(req.user);
};

const shopLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await shopschema.findOne({ email: email });

    if (user) {
      if (user.isactive === false) {
        return res.json({
          status: 403,
          msg: "User is not active. Please contact administrator.",
        });
      } else if (user.adminApproved === false) {
        return res.json({
          status: 403,
          msg: "User is not Approved ByAdmin. Please contact administrator.",
        });
      } else if (user.password === password) {
        const token = jwt.sign(
          { email: user.email, password: user.password },
          "secret_key",
          { expiresIn: 86400 }
        );
        return res.json({
          status: 200,
          msg: "Login Successfully",
          token,
          id: user._id,
        });
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

const viewallshops = (req, res) => {
  shopschema
    .find({ isactive: true })
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
//view all shops completed

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
//forget pswd completed

const updateshopprofile = (req, res) => {
  shopschema
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        shopname: req.body.shopname,
        phone: req.body.phone,
        email: req.body.email,
        regno: req.body.regno,
        buildingname: req.body.buildingname,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        image: req.file,
      }
    )
    .exec()
    .then((response) => {
      res.json({
        status: 200,
        msg: "updated successfully",
        data: response,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "error",
        err,
      });
      console.log(err);
    });
};

//update profile completed
const viewallshopsforadmin = (req, res) => {
  shopschema
    .find({ adminApproved: true })
    .exec()
    .then((result) => {
      res.json({
        status: 200,
        msg: result,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: err,
      });
      console.log(err);
    });
};

const viewallshopReqsforadmin = (req, res) => {
  shopschema
    .find({adminApproved: false})
    .exec()
    .then((result) => {
      res.json({
        status: 200,
        msg: result,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: err,
      });
      console.log(err);
    });
};

//Admin view shop request completed
const acceptshopById = (req, res) => {
  shopschema
    .findByIdAndUpdate(
      { _id: req.params.id },
      { adminApproved: true, isactive: true }
    )
    .exec()
    .then((result) => {
      res.json({
        status: 200,
        data: result,
        msg: "data obtained",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error in API",
        err: err,
      });
    });
};
//shop accept completed

const deleteshopById = async (req, res) => {
  await shopschema
    .findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.json({
        status: 200,
        data: result,
        msg: "data deleted",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error in API",
        err: err,
      });
    });
};

const deActivateShopById = async (req, res) => {
  await shopschema
    .findByIdAndUpdate({ _id: req.params.id }, { isActive: false })
    .exec()
    .then((result) => {
      res.json({
        status: 200,
        data: result,
        msg: "data deleted",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error in API",
        err: err,
      });
    });
};

const activateShopById = async (req, res) => {
  await shopschema
    .findByIdAndUpdate({ _id: req.params.id }, { isActive: true })
    .exec()
    .then((result) => {
      res.json({
        status: 200,
        data: result,
        msg: "data deleted",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error in API",
        err: err,
      });
    });
};

const searchShopByName = async (req, res) => {
  try {
    const name = req.params.name;
    const user = await shopschema.find({ name: new RegExp(name, "i") });

    if (!user) {
      return res.json({
        status: 404,
        data: null,
        msg: "User not found",
      });
    }

    res.json({
      status: 200,
      data: user,
      msg: "User found",
    });
  } catch (err) {
    res.json({
      status: 500,
      data: null,
      msg: "An error occurred",
    });
  }
};

module.exports = {
  registershop,
  upload,
  shopLogin,
  verifyToken,
  viewshopbyid,
  forgotPwdshop,
  viewallshops,
  updateshopprofile,
  acceptshopById,
  deleteshopById,
  viewallshopsforadmin,
  viewallshopReqsforadmin,
  activateShopById,
  deActivateShopById,
  searchShopByName,
};
