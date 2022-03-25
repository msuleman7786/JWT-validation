const express = require('express')
const autentication = require("../../middleware/autentication")
const router = express.Router()
const dbconnect = require('../../mongodb')
const mongodb = require('mongodb')

router.get('/', [autentication.verifyUser],async (req,res)=>{
    let data=await dbconnect.dbconnect()
    data=await data.find().toArray();
    res.send(data)
    console.log(data)
  })
  router.post('/', [autentication.verifyUser], async (req, res) => {
    let data = await  dbconnect.dbconnect()
    let result = await data.insertOne(req.body)

    // Validating :- minimum 6. it should be string
   if(req.body.title) {
    if((req.body.title).length >= 6) {
      return res.send(result);
     }
    else{
      return res.status(400).send(String("Minimum length 6 with no number"))
    }
   }
   else {
     return res.send("Title is mandatory")
   }
  })

  router.put('/:title',[autentication.verifyUser], async (req, res) => {
    let data = await dbconnect.dbconnect()
    let result = await data.updateOne(
      { name: req.params.name},
      { $set: req.body }  
    )

    // Validating :- minimum 6. it should be string
    if((req.body.title).length >= 6) {
      return res.send({ result: "update" });
     }
    else{
      return res.status(400).send("Minimum length 6")
    }
   })
  
  router.delete('/:id',[autentication.verifyUser], async (req, res) => {
    console.log(req.params.id)
  
    let data=await dbconnect.dbconnect()
    const result=await data.deleteOne({_id:new mongodb.ObjectId(req.params.id)})

    res.send(result)
  
  })

  module.exports = router;