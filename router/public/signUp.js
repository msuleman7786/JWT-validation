const express = require('express')
const router = express.Router()
const usersDbConenct = require('../../mongodb')
const mongodb = require('mongodb')
const {Validator} = require("node-input-validator");

router.get('/',async (req,res)=>{
    let data=await usersDbConenct.usersDbConenct()
    data=await data.find().toArray();
    res.send(data)
    console.log(data)
  })

  router.post('/', async (req, res) => {
    let data = await usersDbConenct.usersDbConenct()
    let result = await data.insertOne(req.body)

    // Validating :- Email and Password
    const v = new Validator(req.body, {email: 'required|email', password: 'required'});
    
    const matched = await v.check();
      if(!matched) {
        return res.status(422).send({
          error : v.errors
        });
      }
      else {
        return res.status(200).send(result);
      }
  })

  router.put('/:name', async (req, res) => {
    let data = await usersDbConenct.usersDbConenct()
    let result = await data.updateOne(
      { name: req.params.name},
      { $set: req.body }
    )

    res.send({ result: "update" })
    console.log(result)
  })
  
  router.delete('/:id', async (req, res) => {
    console.log(req.params.id)
  
    let data=await usersDbConenct.usersDbConenct()
    const result=await data.deleteOne({_id:new mongodb.ObjectId(req.params.id)})

    res.send(result)  
  })

  module.exports = router;