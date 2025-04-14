const express=require('express')
const { register, userlogin, getToken } = require('../controller/userController')
const { upload } = require('../middleware/upload')
const { authorization, authorizeRole } = require('../middleware/authToken')
const { placeOrder, cancelOrder } = require('../controller/orderController')
const { createProduct, getProduct, updateProduct, deletePro, listingProductwithDiscount, filterOutProduct, fetchOutOnlystockIn, fetchspecificitems } = require('../controller/productController')
const { getOrderItems } = require('../controller/orderitemsController')
const { placeOrder1 } = require('../controller/order2Controller')
const { createAddress, updateAddress, deleteAddress, getAddresses } = require('../controller/addressController')
const { addToCart } = require('../controller/cartController')

const router=express.Router()

// User
router.post('/register',upload.single("image"),register)
router.post('/login',userlogin)
router.get('/gettoken',authorization,getToken)

//Order
router.post('/placeorder',authorization,authorizeRole('user',"admin"),placeOrder)
router.delete('/cancelorder/:orderNumber',authorization,authorizeRole("user","admin"),cancelOrder)


// Poduct 
router.post('/createProduct',upload.single("image"),createProduct)
router.get('/getpro',getProduct)
router.put('/updateproduct/:id',upload.single("image"),updateProduct)
router.delete('/deletepro/:id',deletePro)
router.get('/list-discount',listingProductwithDiscount)
router.get('/filter-name',filterOutProduct)
router.get('/filter-stock',fetchOutOnlystockIn)
router.get('/fetchspecific',fetchspecificitems)



/// Order=Items 
router.get('/getorderitems/:orderId',getOrderItems)

router.post('/plcaorder',authorization,placeOrder1)



// addresses
router.post('/createAdd',authorization,createAddress)
router.put('/update/:id',authorization,updateAddress)
router.delete('/delete/:id',authorization,deleteAddress)
router.get('/getadd',authorization,getAddresses)

// Cart
router.post('/addcart',authorization,addToCart)






module.exports={router}