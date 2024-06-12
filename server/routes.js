const express=require('express')
const router=express.Router()

const Shops=require("./shopOwner/shopOwnerController")
const DeliveryAgent=require("./deliveryAgents/deliveryAgentController")

router.post("/registershop",Shops.upload,Shops.registershop)
router.post("/shoplogin",Shops.shopLogin)
router.post("/verifytoken",Shops.verifyToken)

router.post("/viewshopbyid/:id",Shops.viewshopbyid)
router.post("/forgetpswdshop",Shops.forgotPwdshop)
router.post("/viewallshops",Shops.viewallshops)
router.post("/updateprofileshop/:id",Shops.upload,Shops.updateshopprofile)
router.post("/acceptshop/:id",Shops.acceptshopById)
router.post("/deleteshop/:id",Shops.deleteshopById)
router.post("/viewrequestsforadmin",Shops.viewallshopsforadmin)

router.post("/addDeliveryAgent",DeliveryAgent.addDeliveryAgent)
router.post("/loginDeliveryAgent",DeliveryAgent.loginDeliveryAgent)
router.post("/verifyToken",DeliveryAgent.verifyToken)
router.post("/viewDeliveryAgentbyid/:id",DeliveryAgent.viewDeliveryAgentbyid)// to be used in view del agent by id
router.post("/viewallDeliveryAgents",DeliveryAgent.viewallDeliveryAgents)
router.post("/updateDeliveryAgentprofile/:id",DeliveryAgent.updateDeliveryAgentprofile)
router.post("/deleteDeliveryAgentById/:id",DeliveryAgent.deleteDeliveryAgentById)
router.post("/forgotPwdDeliveryAgent",DeliveryAgent.forgotPwdDeliveryAgent)
router.post("/viewallDeliveryAgentsByDistrict/:district",DeliveryAgent.viewallDeliveryAgentsByDistrict)
router.post("/viewDeliveryAgentbyShopid/:id",DeliveryAgent.viewDeliveryAgentbyShopid)
router.post("/activateDeliveryAgentById/:id",DeliveryAgent.activateDeliveryAgentById)

module.exports=router