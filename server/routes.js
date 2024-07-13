const express=require('express')
const router=express.Router()

const Shops=require("./shopOwner/shopOwnerController")
const DeliveryAgent=require("./deliveryAgents/deliveryAgentController")
const Customer=require("./customer/customerController")
// const Customer=require("./customer/customerController")
const Furniture=require("./Furniture/furnitureController")
const complaint=require("./complaints/complaintController")
const order=require("./Orders/orderController")
const cart=require("./cart/cartController")
const deliveryUpdate=require("./DeliveryDatas/deliveryController")

router.post("/registershop",Shops.upload,Shops.registershop)
router.post("/shoplogin",Shops.shopLogin)
router.post("/verifytoken",Shops.verifyToken)

router.post("/viewshopbyid/:id",Shops.viewshopbyid)
router.post("/forgetpswdshop",Shops.forgotPwdshop)
router.post("/viewallshops",Shops.viewallshops)
router.post("/updateprofileshop/:id",Shops.upload,Shops.updateshopprofile)
router.post("/acceptshop/:id",Shops.acceptshopById)
router.post("/deleteshop/:id",Shops.deleteshopById)
router.post("/viewallshopsforadmin",Shops.viewallshopsforadmin)
router.post("/viewallshopReqsforadmin",Shops.viewallshopReqsforadmin)
router.post("/activateShopById/:id",Shops.activateShopById)
router.post("/deActivateShopById/:id",Shops.deActivateShopById)
router.post("/searchShopByName/:name",Shops.searchShopByName)


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
router.post("/searchDeliveryByName/:name",DeliveryAgent.searchDeliveryByName)
router.post("/viewActiveDeliveryAgentbyShopid/:id",DeliveryAgent.viewActiveDeliveryAgentbyShopid) //new Api



router.post("/userregister",Customer.userregister)
router.post("/logincustomer",Customer.logincustomer)
router.post("/forgotPwdcustomer",Customer.forgotPwdcustomer)
router.post("/viewcustbyid/:id",Customer.viewcustbyid)
router.post("/viewallcust",Customer.viewallcust)
router.post("/activateUserById/:id",Customer.activateUserById)
router.post("/deActivateUserById/:id",Customer.deActivateUserById)
router.post("/editcustbyid/:id",Customer.editcustbyid)
router.post("/searchUserByName/:name",Customer.searchUserByName)






//furniture Routes
router.post("/registerFurniture",Furniture.upload,Furniture.registerFurniture)
router.post("/editFurnitureById/:id",Furniture.upload,Furniture.editFurnitureById)
router.post("/deleteFurnitureById/:id",Furniture.deleteFurnitureById)
router.post("/viewFurnitureById/:id",Furniture.viewFurnitureById)
router.post("/viewallFurniture",Furniture.viewFurnitures)
router.post("/viewFurnitureswithQuantityGtZero",Furniture.viewFurnitureswithQuantityGtZero)
router.post("/viewFurnituresByShopId/:id",Furniture.viewFurnituresByShopId)


//complaints
router.post('/createComplaint',complaint.addcomplaint)
router.post('/viewAllcomplaints',complaint.viewAllcomplaints)
router.post('/viewcomplaintByUserId/:id',complaint.viewcomplaintByUserId)
router.post('/deletecomplaintById/:id',complaint.deletecomplaintById)
router.post('/viewcomplaintByShopId/:id',complaint.viewcomplaintByShopId)



//orders
router.post('/addOrder',order.addOrder)
router.post('/addAddressByOrderId/:id',order.addAddressByOrderId)
router.post('/viewOrderById/:id',order.viewOrderById)
router.post('/viewOrdersByCustId/:id',order.viewOrdersByCustId)
router.post('/viewOrdersByShopId/:id',order.viewOrdersByShopId)
router.post('/viewPendingOrdersForDelivery/:id',order.viewPendingOrdersForDelivery)
router.post('/updateOrderPayment/:id',order.updateOrderPayment)
router.post('/assignDeliveryAgent/:id',order.assignDeliveryAgent)
router.post('/viewassignedOrdersForDelivery/:id',order.viewassignedOrdersForDelivery)
router.post('/viewMyOrdersByDeliveryAgentId/:id',order.viewMyOrdersByDeliveryAgentId)  //new Api
router.post('/updateCompletionOfDelivery/:id',order.updateCompletionOfDelivery)  //new Api


//cart

router.post('/addCart',cart.addCart)
router.post('/viewAllCart',cart.viewAllCart)
router.post('/viewCartById/:id',cart.viewCartById)
router.post('/deleteCartById/:id',cart.deleteCartById)
router.post('/viewCartBycustId/:id',cart.viewCartBycustId)



//delivery Updates
router.post('/addDeliveryUpdate',deliveryUpdate.addDeliveryUpdate)
router.post('/viewDeliveryUpdateById/:id',deliveryUpdate.viewDeliveryUpdateById)
router.post('/viewDeliveryUpdateByOrderId/:id',deliveryUpdate.viewDeliveryUpdateByOrderId)
router.post('/viewAllDeliveryUpdates',deliveryUpdate.viewAllDeliveryUpdates)
router.post('/deleteDeliveryUpdateById/:id',deliveryUpdate.deleteDeliveryUpdateById)


module.exports=router