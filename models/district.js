require('../Database/dbConnection');
module.exports =((sequelize, type)=>{
    const District = sequelize.define('district',{
        id:{
            type: type.INTEGER(10),
            primaryKey: true,
            autoIncrement:true
        },
        district_name:{
            type:type.STRING(30),
            allowNull: false,
            unique:{
                args:true,
                msg:"State Already Exist!"
            }
        },
        state_id:{
            type:type.INTEGER(10),
            require:true,
            // foregin key of state stateID
            references: {
                model: 'states', // 'fathers' refers to table name
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
    return District;  
})(sequelize, Sequelize);