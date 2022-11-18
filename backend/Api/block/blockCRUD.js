const Block = require('../../models/block');
module.exports = {
    findAll: async (req, res)=>{
        let {dist_id} = req.headers;
        try {
            let block = await  Block.findAll({where:{dist_id:dist_id}});
            return res.status(200).json({message:"Block List", block:block})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    create:async (req, res)=>{
        try {
            let {block_name, dist_id} =req.body;
            if(block_name && dist_id){
                let block = await  Block.findOne({where:{block_name:block_name}});
                if(block){
                    return res.status(200).json({message:"block Already Exists"})
                }else{
                    let block = await  Block.create({block_name, dist_id});
                    return res.status(200).json({message:"block create Successful", block:block})
                }
            }else{
            return res.status(200).json({message:"block_name and dist_id is require"})
            }
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    update:async (req, res)=>{
        try {
            id=req.params.id;
            const block = await Block.update(req.body,{where:{id:id}});
            return res.status(200).json({message: "block update", block})

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    delete:async (req, res)=>{
        try {
            id=req.params.id;
            const block = await Block.destroy({where:{id:id}});
            return res.status(200).json({message: "block deleted", block})

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    
};