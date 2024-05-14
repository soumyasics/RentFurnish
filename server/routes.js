const express=require('express')
const router=express.Router()

const Shops=require("./models/shopOwner/shopOwnerController")

router.post("/registershop",Shops.upload,Shops.registershop)
router.post("/shoplogin",Shops.upload,Shops.shopLogin)
router.post("/viewshopbyid/:id",Shops.viewshopbyid)
router.post("/forgetpswdshop",Shops.forgotPwdshop)
router.post("/viewallshops",Shops.viewallshops)
router.post("/updateprofileshop/:id",Shops.upload,Shops.updateshopprofile)
router.post("/acceptshop/:id",Shops.acceptshopById)
router.post("/deleteshop/:id",Shops.deleteshopById)
router.post("/viewrequestsforadmin",Shops.viewallshopsforadmin)


module.exports=router