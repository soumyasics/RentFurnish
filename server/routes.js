const express=require('express')
const router=express.Router()

const Shops=require("./shopOwner/shopOwnerController")
const DeliveryAgent=require("./deliveryAgents/deliveryAgentController")
const Customer=require("./customer/customerController")
// const Customer=require("./customer/customerController")
const Furniture=require("./Furniture/furnitureController")
const complaint=require("./complaints/complaintController")

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

router.post("/addDeliveryAgent",DeliveryAgent.upload,DeliveryAgent.addDeliveryAgent)
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



router.post("/userregister",Customer.userregister)
router.post("/logincustomer",Customer.logincustomer)
router.post("/forgotPwdcustomer",Customer.forgotPwdcustomer)




router.post("/userregister",Customer.userregister)
router.post("/logincustomer",Customer.logincustomer)
router.post("/forgotPwdcustomer",Customer.forgotPwdcustomer)


//furniture Routes
router.post("/registerFurniture",Furniture.upload,Furniture.registerFurniture)
router.post("/editFurnitureById/:id",Furniture.upload,Furniture.editFurnitureById)
router.post("/deleteFurnitureById/:id",Furniture.deleteFurnitureById)
router.post("/viewFurnitureById/:id",Furniture.viewFurnitureById)
router.post("/viewallFurniture",Furniture.viewFurnitures)
router.post("/viewFurnitureswithQuantityGtZero/:id",Furniture.viewFurnitureswithQuantityGtZero)
router.post("/viewFurnituresByShopId/:id",Furniture.viewFurnituresByShopId)


//complaints
router.post('/createComplaint',complaint.addcomplaint)
router.post('/viewAllcomplaints',complaint.viewAllcomplaints)
router.post('/viewcomplaintByUserId/:id',complaint.viewcomplaintByUserId)
router.post('/deletecomplaintById/:id',complaint.deletecomplaintById)
router.post('/viewcomplaintByShopId/:id',complaint.viewcomplaintByShopId)

module.exports=router