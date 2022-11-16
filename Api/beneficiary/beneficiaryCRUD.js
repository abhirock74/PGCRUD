const Beneficiary = require('../../models/beneficiary');
module.exports = {
    findAll: async (req, res)=>{
        try {
            let beneficiary = await  Beneficiary.findAll();
            return res.status(200).json({message:"beneficiary List", beneficiary:beneficiary})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    create:async (req, res)=>{
        // console.log("decoded",req.decoded)
        created_by = req.decoded.id;
        // console.log(created_by)
        try {
            let {state, district, block , village , first_name, email, mobile, gender, education, address} =req.body;
            if(state && district && block && village && first_name && email && mobile && gender &&education && address){
                let beneficiary = await  Beneficiary.findOne({where:{mobile}});
                if(beneficiary){
                    return res.status(200).json({message:"beneficiary Already Exists"})
                }else{
                    let beneficiary = await  Beneficiary.create({state, district, block, village, first_name,email, mobile, gender, education, address, created_by});
                    return res.status(200).json({message:"beneficiary create Successful", beneficiary:beneficiary})
                }
            }else{
            return res.status(200).json({message:"state && district && block && village && first_name && email && mobile && gender &&education && address is require"})
            }
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    update:async (req, res)=>{
        try {
            id=req.params.id;
            const beneficiary = await Beneficiary.update(req.body,{where:{id:id}});
            return res.status(200).json({message: "beneficiary update", beneficiary})

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    },
    delete:async (req, res)=>{
        try {
            id=req.params.id;
            const beneficiary = await Beneficiary.destroy({where:{id:id}});
            return res.status(200).json({message: "beneficiary deleted", beneficiary})

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    
};