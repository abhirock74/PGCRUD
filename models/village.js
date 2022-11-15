require('../Database/dbConnection');
module.exports =((sequelize, type)=>{
    const Village = sequelize.define('village',{
        id:{
            type: type.INTEGER(10),
            primaryKey: true,
            autoIncrement:true
        },
        vill_name:{
            type:type.STRING(30),
            allowNull: false,
            unique:{
                args:true,
                msg:"State Already Exist!"
            }
        },
        block_id:{
            type:type.INTEGER(10),
            require:true,
            // foregin key of state stateID
            references: {
                model: 'blocks', // 'fathers' refers to table name
                key: 'id', // 'id' refers to column name in state table
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
    return Village;  
})(sequelize, Sequelize);