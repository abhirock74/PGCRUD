const District = require('../../models/district');
module.exports = {
    findAll: async (req, res)=>{
        let {state_id} = req.headers;
        // console.log(state_id)
        try {
            let district = await  District.findAll({where:{state_id:state_id}});
            return res.status(200).json({message:"District List", District:district})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    create:async (req, res)=>{
        try {
            let {district_name, state_id} =req.body;
            if(district_name && state_id){
                let district = await  District.findOne({where:{district_name:district_name}});
                if(district){
                    return res.status(200).json({message:"district Already Exists"})
                }else{
                    let district = await  District.create({district_name, state_id});
                    return res.status(200).json({message:"district create Successful", District:district})
                }
            }else{
            return res.status(200).json({message:"district_name and state_id is require"})
            }
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    update:async (req, res)=>{
        try {
            id=req.params.id;
            const district = await District.update(req.body,{where:{id:id}});
            return res.status(200).json({message: "District update", district})

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    delete:async (req, res)=>{
        try {
            id=req.params.id;
            const district = await District.destroy({where:{id:id}});
            return res.status(200).json({message: "District deleted", district})

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    
};