const { Products , Orders,OrderItems} = require('../models')
const { Op, where } = require('sequelize');

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

const getProduct = async (req, res) => {
   try {
      const getpro = await Products.findAll()
      res.status(200).json(getpro)

   } catch (error) {
      return res.status(400).json({ err: err.message })
   }
}

const updateProduct = async (req, res) => {
   try {
      const { id } = req.params
      const { name, image, discount } = req.body
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

      const upadtepro = await Products.findByPk(id)
      if (!upadtepro) {
         return res.status(400).json("Product is not upadte ")
      }
      await upadtepro.update({
         name: name || upadtepro.name,
         image: imagePath || upadtepro.image,
         discount: discount || upadtepro.discount
      })

      return res.status(200).json(upadtepro)

   } catch (error) {
      return res.status(400).json({ error: error.message })
   }
}

const deletePro = async (req, res) => {
   try {
      const { id } = req.params
      const deletepro = await Products.findOne({
         where: { id, discount: 55 }
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

const listingProductwithDiscount = async (req, res) => {
   try {
      const productDiscount = await Products.findAll({
         where: {
            discount: {
               [Op.ne]: null,
               [Op.between]: [51, 60],
            }
         }
      })

      return res.status(200).json(productDiscount)



   } catch (error) {
      return res.status(400).json({ error: error.message })

   }
}

const filterOutProduct = async (req, res) => {
   try {
      const prodt = await Products.findAll()
      const filterout = prodt.map(user => user.name)
      return res.status(200).json(filterout)
   } catch (error) {
      return res.status(400).json({ error: error.message })
   }
}

const fetchOutOnlystockIn = async (req, res) => {
   try {
      const prodt = await Products.findAll()
      const filterStockIn = prodt.filter(user => user.stock > 0)
      return res.status(200).json(filterStockIn)

   } catch (error) {
      return res.status(400).json({ error: error.message })
   }
}

const fetchspecificitems = async (req, res) => {
   try {
      const prodt = await Products.findAll({
         where: {
            name: {
               [Op.in]: ["Bata", "Table"]
            }
         }
      })
      return res.status(200).json(prodt)
   } catch (error) {
      return res.status(400).json({ error: error.message })

   }
}

const limitedData=async(req,res)=>{
   try {
      
        const prodt=await Products.findAll({
               limit:5
        })

        return res.status(200).json(prodt)

   } catch (error) {
      return res.status(400).json({ error: error.message })
      
   }
}



module.exports = {
   createProduct,
   getProduct, 
   updateProduct,
   deletePro, 
   listingProductwithDiscount,
    filterOutProduct,
   fetchOutOnlystockIn, 
   fetchspecificitems,
   limitedData


}