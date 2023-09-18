
const fs = require('fs');
const path = require('path');


const get=(req,res, next)=>{
   
    let id = req.params.id;

   

    let users= fs.readFileSync(path.resolve('files/users.json'),'utf-8')
   
   
     users= JSON.parse(users);
   
     if(!users[id]){
        return res.status('301').send({
            "error":true,
            "message":"user not found"

        })
     }

     let user=users[id];
   
   
      const name=user.name;
      const age=user.age;
      const email=user.email;
   
   
   let result = `hello ${name} ${age} ${email}`
   
    res.status('200').send(result)
   
   
   };
   
const post=(req,res, next)=>{
    //  const userData={};
      console.log(req.body)
            
  let result={};
        const data=  req.body;
      //  userData[data.email]=data;
  
        let usersDbData=fs.readFileSync(path.resolve('files/users.json'),'utf-8')
        console.log(usersDbData);
        usersDbData=JSON.parse(usersDbData);
        if(usersDbData[data.email]){
          result={"error":true,"message":"email already exists"}
        }else{
       
        usersDbData[data.email]=data;
  
  
  
        fs.writeFileSync(path.resolve('files/users.json'),JSON.stringify(usersDbData))
  
       result = {"status":"created","data":`hello ${data.name} ${data.age}`};
        }
  
       res.send(result)
      
      
      }

      const put=(req,res, next)=>{
     const id = req.params.id;
        let users= fs.readFileSync(path.resolve('files/users.json'),'utf-8')
   
   
        users= JSON.parse(users);

        if(!users[id]){
            return res.status('301').send({
                "error":true,
                "message":"user not found"
    
            })

        }
         
        users[id]=req.body;


        fs.writeFileSync(path.resolve('files/users.json'),JSON.stringify(users))




          const data=  req.body;
        
         res.send(data)
        
        
        }



        const user_delete=(req,res, next)=>{

            const id = req.params.id;
            let users= fs.readFileSync(path.resolve('files/users.json'),'utf-8')
       
       
            users= JSON.parse(users);
    
            if(!users[id]){
                return res.status('301').send({
                    "error":true,
                    "message":"user not found"
        
                })
    
            }
             
            delete users[id];
    
    
            fs.writeFileSync(path.resolve('files/users.json'),JSON.stringify(users))
    
    
            
            
             res.status(201).send({"status":"deleted","error":false})
            
            
            }

   module.exports={get,post,put,user_delete}