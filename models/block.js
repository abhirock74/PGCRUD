require('../Database/dbConnection');
module.exports =((sequelize, type)=>{
    const Block = sequelize.define('block',{
        id:{
            type: type.INTEGER(10),
            primaryKey: true,
            autoIncrement:true
        },
        block_name:{
            type:type.STRING(30),
            require:true,
            unique:{
                args:true,
                msg:"State Already Exist!"
            }
        },
        dist_id:{
            type:type.INTEGER(10),
            require:true,
            references: {
                model: 'districts', 
                key: 'id'
             }
        },
        is_deleted: {
            type: type.ENUM,
            defaultValue: '1',
            values: ["0", "1", "2"],
            comment: `0: Inactive  1: Active 2 : Delete`,
        },
        created_at: {
            type: type.DATE,
            defaultValue: type.NOW
        },
        updated_at: {
            type: type.DATE,
            defaultValue: type.NOW
        },
        is_deleted_by: {
            type: type.INTEGER(11),
        },
        deleted_at: {
            type: type.DATE,
        },
        created_by: {
            type: type.INTEGER(11)
        },
        updated_by: {
            type: type.INTEGER(11)
        }

    },{freezTableName:true, timestamps:false});
    return Block;  
})(sequelize, Sequelize);