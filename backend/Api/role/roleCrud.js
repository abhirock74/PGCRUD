const Role = require('../../models/roleTable');
module.exports = {
    findAll: async (req, res)=>{
        try {
            let role = await  Role.findAll();
            return res.status(200).json({message:"role List", role:role})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    create:async (req, res)=>{
        try {
            let {name} =req.body;
            if(name){
                let role = await  Role.findOne({where:{name}});
                if(role){
                    return res.status(200).json({message:"role Already Exists"})
                }else{
                    let role = await  Role.create({name});
                    return res.status(200).json({message:"role create Successful", role:role})
                }
            }else{
            return res.status(200).json({message:"name is require"})
            }
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    update:async (req, res)=>{
        try {
            id=req.params.id;
            const role = await Role.update(req.body,{where:{id:id}});
            return res.status(200).json({message: "role update", role})

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    delete:async (req, res)=>{
        try {
            id=req.params.id;
            const role = await Role.destroy({where:{id:id}});
            return res.status(200).json({message: "role deleted", role})

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    
};