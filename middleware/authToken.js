const jwt=require('jsonwebtoken')

const authorization=async(req,res,next)=>{

    let authHeader=req.headers.authorization

    if(!authHeader ){
        
        return res.status(401).json({message:"No token,authorizatio denied"})
    }
    
    const token = req.headers.authorization.replace(/^Bearer\s+/, "");
 
    console.log(token);

  
        try {
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            console.log(decoded);
            
            req.user=decoded
    
                 
            // req.user
            next()
            
        } catch (err) {
            res.status(401).json({message:"Token is not valid"})
            
        }
   
}

const authorizeRole = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access Denied' });
      }
      next();
    };
  };
module.exports={authorization,authorizeRole}