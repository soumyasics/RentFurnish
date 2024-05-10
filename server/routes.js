const express=require('express')
const router=express.Router()

const Shops=require("./models/shopOwner/shopOwnerController")

router.post("/registershop",Shops.upload,Shops.registershop)
router.post("/shoplogin",Shops.upload,Shops.shopLogin)
router.post("/viewshopbyid/:id",Shops.viewshopbyid)
router.post("/forgetpswdshop",Shops.forgotPwdshop)


module.exports=router