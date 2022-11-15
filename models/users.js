require('../Database/dbConnection');
module.exports = ((sequelize, type)=>{
    const Users = sequelize.define('users',{
        id:{
            type: type.INTEGER(10),
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:type.STRING(50),
            require:true
        },
        username:{
            type:type.STRING(30),
            require:true
        },
        password:{
            type:type.STRING(30),
            require:true
        },
        photo:{
            type:type.STRING(30),
            type: type.BLOB
        },
        email:{
            type:type.STRING(40),
            require:true
        },
        role:{
            type: type.ENUM,
            defaultValue: '1',
            values: ["0", "1", "2"],
            comment: `0: Admin  1: user 2 : viewrs`,
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
        
    },{freezeTimeName: true, timestamps: false});
    return Users;
})(sequelize, Sequelize);