const users = require('../../models/users');
const JWT = require('jsonwebtoken');
const JWT_SECRET = 'jchvkjdsjxhjxjsjcshgfweifjyugjiuieew';

const Login = async(req, res)=>{
    try {
        let {username , password} = req.body;
        if(!username && !password){
            return res.status(400).json({message:"username and password are required"})
        }else{
            let user = await users.findOne({where:{username,password}});
            if(user){
                let token = JWT.sign({
                    id: user.id,
                    name: user.name,
                    username:user.username,
                    email:user.email,
                    role:user.role
                }, JWT_SECRET);
                return res.json({
                    message:"Login Successful",
                    token:token
                })
            }else{
                return res.status(400).json({message:'email and password are incorrect'})
            }
        }
       
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = Login;