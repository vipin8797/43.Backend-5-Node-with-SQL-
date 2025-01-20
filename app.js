// const express = require('express');
// const app = express();

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


  console.log(getData());
















// const port = 3000;
// app.listen(port,()=>{
//     console.log(`listening at port ${port}`);
// })