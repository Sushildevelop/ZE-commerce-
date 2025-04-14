const { Products } = require('../models')

const createProduct = async (req, res) => {
   try {
      // const userId=req.user.id;
      const { name, 
         description,
         price, 
         image, 
         discount,
         stock, 
         isAvailable,
         brand, 
         thumbnail } = req.body
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
      const createProd = await Products.create({
         name, description, image: imagePath, price, discount,
         stock, isAvailable, brand, thumbnail
      })
      return res.status(200).json(createProd)
   } catch (err) {
      return res.status(400).json({ err: err.message })

   }
}

const getProduct=async(req,res)=>{
   try {
      const getpro=await Products.findAll()
      res.status(200).json(getpro)
     
   } catch (error) {
      return res.status(400).json({ err: err.message })
   }
}

const updateProduct=async(req,res)=>{
   try {
      const {id}=req.params
      const {name,image,discount}=req.body
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

      const upadtepro=await Products.findByPk(id)
       if(!upadtepro){
         return res.status(400).json("Product is not upadte ")
       }
       await upadtepro.update({
         name: name || upadtepro.name,
         image : imagePath || upadtepro.image,
         discount : discount || upadtepro.discount
       })

       return res.status(200).json(upadtepro)
      
   } catch (error) {
      return res.status(400).json({ error: error.message })
   }
}

const deletePro=async(req,res)=>{
   try {
      const {id}=req.params
      const deletepro=await Products.findOne({
         where :{id,discount:55}
      })
      
if (deletepro) {
   await deletepro.destroy();
   console.log('Product deleted successfully');
 } else {
   console.log('Product not found');
 }

      
   } catch (error) {
      return res.status(400).json({ error: error.message })
   }
}

module.exports = { createProduct ,getProduct,updateProduct,deletePro}