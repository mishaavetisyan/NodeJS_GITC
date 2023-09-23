
const fs = require('fs');
const path = require('path');




const get = (req, res, next) => {
    const id= req.params.id;
  const result = {forUser:[], 
                   forAll:[]}

    let users = fs.readFileSync(path.resolve('files/users.json'), 'utf-8')


        users = JSON.parse(users);

        result.forUser= users[id].tasks? users[id].tasks: []
  
        let tasks = fs.readFileSync(path.resolve('files/tasks.json'), 'utf-8')
   
        result.forAll=JSON.parse(tasks);

        return res.status(200).send(result)

}




const post = (req, res, next) => {
    //  const userData={};
    console.log(req.body)

    let result = {};
    const data = req.body;

    if (data.forUser) {

        let users = fs.readFileSync(path.resolve('files/users.json'), 'utf-8')


        users = JSON.parse(users);

        if (!users[data.forUser]) {
            return res.status('301').send({
                "error": true,
                "message": "user not found"

            })

        }


        if (users[data.forUser].tasks) {

            users[data.forUser].tasks.push(data)


        } else {

            users[data.forUser].tasks = [data]

        }

        fs.writeFileSync(path.resolve('files/users.json'), JSON.stringify(users))


    } else {

        let tasks = fs.readFileSync(path.resolve('files/tasks.json'), 'utf-8')

        tasks = JSON.parse(tasks);

        tasks.tasks.push(data);


        fs.writeFileSync(path.resolve('files/tasks.json'), JSON.stringify(tasks))





    }

    result = { "status": "created" };

  return  res.status(201).send(result)
}


const put =(req, res, next) => {

      const id = req.params.id;
      const body= req.body;

      const forAll = body.forAll;
      const forUser = body.forUser;


      let users = fs.readFileSync(path.resolve('files/users.json'), 'utf-8')

      users = JSON.parse(users);


      if(forAll >= 0){
        let tasks = fs.readFileSync(path.resolve('files/tasks.json'), 'utf-8')

         tasks = JSON.parse(tasks);
         tasks=tasks.tasks;
         if(!tasks[forAll]){

            return res.status('404').send({
                "error": true,
                "message": "task not found"

            })
         }
        
         if(users[id].doneTasks){

            users[id]['doneTasks'].push(tasks[forAll])


         }else{

            users[id]['doneTasks']=[tasks[forAll]]

         }

      }

      if(forUser >= 0){
     
        if( !users[id].tasks || !users[id].tasks[forUser]){

            return res.status('404').send({
                "error": true,
                "message": "task not found"

            })
         }
        let task = users[id].tasks[forUser]
        
        if(users[id].doneTasks){

            users[id].doneTasks.push(task)


         }else{

            users[id].doneTasks=[task]

         }
         
         
         users[id].tasks.splice(forUser,1);


      }

      fs.writeFileSync(path.resolve('files/users.json'), JSON.stringify(users))

  return res.status('200').send({"status":"success"})

}









module.exports = { post, get, put }