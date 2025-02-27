import jwt from "jsonwebtoken";

  const checkAuth =async  (req,res,next) => {
    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            message: "No auth token",
          });
    }
    try {
        const user = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = user
        next()
    } catch (error) {
        return res.status(400).json({ message: "Internal server error", error });
    }
  }

export default checkAuth;
