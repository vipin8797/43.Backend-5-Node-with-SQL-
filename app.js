// const express = require('express');
// const app = express();
const mysql = require('mysql2');//requering mysql2

const connection = mysql.createConnection({ //establishing connection with MySQL Database
    host:'localhost',
    user:'root',
    database:'delta_app',
    password:"Xenon@56",
});

//queries
try{
    connection.query("SHOW TABLES",(err,result)=>{
        if(err) throw err;
        console.log(result);
    })
}catch(err){
    console.log(err);
}finally{
    connection.end();
}





//Requiring faker
const { faker } = require('@faker-js/faker');

const getData = ()=> {
    return {
      userId: faker.string.uuid(),
      username: faker.internet.username(), // before version 9.1.0, use userName()
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }


//   console.log(getData());
















// const port = 3000;
// app.listen(port,()=>{
//     console.log(`listening at port ${port}`);
// })