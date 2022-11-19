exports = Sequelize = require('sequelize');
let options={
    host:'localhost',
    dialect:"postgres",
    loggin: false,
    define: {
        underscored: false,
        schema:"public"
    },
    pool:{
        max:100,
        min:0,
        idle:20000,
        acquire:1000000
    },
};
Object.assign(options, {host:"localhost"});
sequelize = new Sequelize("postgres", "postgres","abhirock74", options);
sequelize.authenticate()
.then(()=>{
    console.log(`Database connected`)
}).catch(err=>{
    console.log(`Database Not Connected:`, err);
});

let syncConfig = {alter: {alert:true, drop:false}, force:false};
sequelize.sync(syncConfig).then(()=>{
    console.log("Successfully created table")
}).catch((err)=>{
    console.log("err", err)
});

exports = sequelize;