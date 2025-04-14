const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users } = require('../models')
const nodemailer = require('nodemailer');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { name, email, password, phone, role, status, lastLogin, image } = req.body

        if(!req.body){
            return res.status(400).json(" Request Body is not fetching")
        }


        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
        const hash = await bcrypt.hash(password, 10)
        const creatuser = await Users.create({
            name,
            email,
            password: hash,
            image: imagePath,
            phone,
            role,
            status,
            lastLogin,

        })

        if (!creatuser) {
            return res.status(400).json("Body is not fetching")
        }

        return res.status(200).json(creatuser)

    } catch (error) {
        return res.status(400).json({ error: error.message })

    }
}
const userlogin=async(req,res)=>{
    try {
        const {email,password}=req.body
        const login=await Users.findOne({where:{email}})
        const isValid=await bcrypt.compare(password,login.password)

        if(!isValid){
            return res.json("Password is not matching ")
        }
        const token = jwt.sign(
            { id: login.id, username: login.email ,role: login.role}, 
            process.env.JWT_SECRET, // Use a real secret key from .env ideally
            { expiresIn: '1h' }
          )
          return res.json({token})
        
    } catch (error) {

          return res.status(400).json({ error: error.message })
    }
}
const getToken = async (req, res) => {
    try {
      const id = req.user.id; // Correctly extract ID from token
  
      const user1 = await Users.findByPk(id, {
        attributes: ["id", "email"] // You can also add other fields if needed
      });
  
      if (!user1) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ user: user1 });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

 

// Create transporter
const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body; // Get email details from the request body
  
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:process.env.EMAIL, // Your Gmail address
      pass: process.env.password, // App Password or use OAuth2
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!', info: info });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { register ,userlogin,getToken,sendEmail}