const express = require('express');
const app = express();

//Requiring Path for EJS files
const path = require('path');
app.set('views engine','ejs');
//Default Path for views folder
app.set("views",path.join(__dirname,"views"));

//Data Parsing for POST Request
app.use(express.urlencoded({extended:true}));


//Requiring Method Override
const methodOverride = require('method-override')
app.use(methodOverride('_method'));



//Requiring faker
const { faker } = require('@faker-js/faker');

const getData = ()=> {
    return [
      faker.string.uuid(),
       faker.internet.username(), // before version 9.1.0, use userName()
       faker.internet.email(),
       faker.internet.password(),
];
  }



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
// try{
//     connection.query(q, userData,(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//         console.log(result.length)
//         console.log(result[0]);
//         console.log(result[1]);
//     })
// }catch(err){
//     console.log(err);
// }finally{
//     connection.end();
// }





//queries to add multiple user data.
// const q = "INSERT INTO users (id ,username,email ,password) VALUES ?";
// let userData = [
//     ["1234", "user1", "email1@example.com", "password1"],
//     ["5678", "user2", "email2@example.com", "password2"]
//   ];
// try{
//     connection.query(q, [userData],(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//         console.log(result.length)
//         console.log(result[0]);
//         console.log(result[1]);
//     })
// }catch(err){
//     console.log(err);
// }finally{
//     connection.end();
// }



// //insertin Bulk data using Faker
// const userData = []
// for(let i=0; i<=100; i++){
//     userData.push(getData());
// };

// const q = 'INSERT INTO users (id,username,email,password) VALUES ?';
// try{
//     connection.query(q,[userData],(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//     })
// }catch(err){
//     console.log(err)

// }finally{
//     connection.end();
// }






//****************** */ Routes Starts Frome Here.
app.get('/',(req,res)=>{
    let q = "SELECT count(*) FROM users";
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let count = result[0]["count(*)"];
            res.render("home.ejs",{count});
           
        })
    }catch(err){
        console.log(err);
        res.send("Something error in DB");
    }


})



app.get('/show',(req,res)=>{
    let q = "SELECT * FROM users";
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            res.render("show.ejs",{result});
            
           
        })
    }catch(err){
        console.log(err);
        res.send("Something error in DB");
    }

})


//Get Req for Edit Form
app.get('/user/:id/edit',(req,res)=>{
    const {id} = req.params;
    let q = `SELECT * FROM users WHERE id='${id}'`
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            const data = result[0];
            console.log(data);
            res.render("edit.ejs",{data});
       
        })
    }catch(err){
        console.log(err);
        res.send("Something error in DB");
    }
});

//Patch req to Update db
app.patch('/user/:id',(req,res)=>{
    const {id} = req.params;
    const {password,username} = req.body;
    // console.log(password);
    // console.log(id);

const q1 = `SELECT * FROM users WHERE id = "${id}"`;
try{
    connection.query(q1,(err,result)=>{
        if(err) throw err;
        const data = result[0];
        
        
   
   //second query
   const q2 = `UPDATE users SET username = "${username}" WHERE id = "${id}"`;
   
    connection.query(q2,(err,result)=>{
        if(err) throw err;

        if(password == data.password){ //matching passord
        res.redirect('/show');
        }else{
            res.send("wrong passord");
        }
   
    }) ;  
   
    });
}catch(err){
    console.log(err);
}

});














const port = 3000;
app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})