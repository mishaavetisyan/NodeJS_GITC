const express = require('express');
const fs = require('fs');


const router= express.Router();

router.get('/users/:id', (req,res, next)=>{

console.log(req.query)

  const firstName=req.query.first_name
  const lastName=req.query.last_name

let result = `hello ${firstName} ${lastName} ${req.params.id}`

 res.send(result)


})


router.post('/users', (req,res, next)=>{
  //  const userData={};
    console.log(req.body)
          
let result={};
      const data=  req.body;
    //  userData[data.email]=data;

      let usersDbData=fs.readFileSync('./files/users.json','utf-8')
      console.log(usersDbData);
      usersDbData=JSON.parse(usersDbData);
      if(usersDbData[data.email]){
        result={"error":true,"message":"email already exists"}
      }else{
     
      usersDbData[data.email]=data;



      fs.writeFileSync('./files/users.json',JSON.stringify(usersDbData))

     result = {"status":"created","data":`hello ${data.name} ${data.age}`};
      }

     res.send(result)
    
    
    })

    router.put('/users/:id', (req,res, next)=>{

      console.log(req.params,req.body)
      
        const data=  req.body;
      let result = `hello ${data.name} ${data.age}`
      
       res.send(result)
      
      
      })


      router.delete('/users/:id', (req,res, next)=>{

        console.log(req.params)
        
        //   const data=  req.body;
        // let result = `hello ${data.name} ${data.age}`
        
         res.send({"status":"deleted","error":false})
        
        
        })












module.exports=router