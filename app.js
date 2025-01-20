// const express = require('express');
// const app = express();
const mysql = require('mysql2');//requering mysql2

const connection = mysql.createConnection({ //establishing connection with MySQL Database
    host:'localhost',
    user:'root',
    database:'delta_app',
    password:"Xenon@56",
});

//queries to add single user data
// const q = "INSERT INTO users (id ,username,email ,password) VALUES (?,?,?,?)";
// let userData = ["123","123@qwe","email@123","abs"];

//queries to add multiple user data.
const q = "INSERT INTO users (id ,username,email ,password) VALUES ?";
let userData = [
    ["1234", "user1", "email1@example.com", "password1"],
    ["5678", "user2", "email2@example.com", "password2"]
  ];
try{
    connection.query(q, [userData],(err,result)=>{
        if(err) throw err;
        console.log(result);
        console.log(result.length)
        console.log(result[0]);
        console.log(result[1]);
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