const State = require('../../models/state');
module.exports = {
    findAll: async (req, res)=>{
        try {
            let state = await  State.findAll();
            return res.status(200).json({message:"State List", state:state})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    create:async (req, res)=>{
        try {
            let {state_name} =req.body;
            if(state_name){
                let state = await  State.findOne({where:{state_name:state_name}});
                if(state){
                    return res.status(200).json({message:"State Already Exists"})
                }else{
                    let state = await  State.create({state_name});
                    return res.status(200).json({message:"State create Successful", state:state})
                }
            }else{
            return res.status(200).json({message:"state_name is require"})
            }
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    update:async (req, res)=>{
        try {
            id=req.params.id;
            const state = await State.update(req.body,{where:{id:id}});
            return res.status(200).json({message: "state update", state})

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    delete:async (req, res)=>{
        try {
            id=req.params.id;
            console.log(id)
            const state = await State.destroy({where:{id:id}});
            return res.status(200).json({message: "state deleted", state})

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    
};