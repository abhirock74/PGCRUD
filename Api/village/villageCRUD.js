const Village = require('../../models/village');
module.exports = {
    findAll: async (req, res)=>{
        try {
            let village = await  Village.findAll();
            return res.status(200).json({message:"village List", Village:village})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    create:async (req, res)=>{
        try {
            let {vill_name, block_id} =req.body;
            if(vill_name && block_id){
                let village = await  Village.findOne({where:{vill_name:vill_name}});
                if(village){
                    return res.status(200).json({message:"village Already Exists"})
                }else{
                    let village = await  Village.create({vill_name, block_id});
                    return res.status(200).json({message:"village create Successful", Village:village})
                }
            }else{
            return res.status(200).json({message:"vill_name and block_id is require"})
            }
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    update:async (req, res)=>{
        try {
            id=req.params.id;
            const village = await Village.update(req.body,{where:{id:id}});
            return res.status(200).json({message: "Village update", village})

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    delete:async (req, res)=>{
        try {
            id=req.params.id;
            const village = await Village.destroy({where:{id:id}});
            return res.status(200).json({message: "Village deleted", village})

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    
};