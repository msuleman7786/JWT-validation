const express = require('express')
const router = express.Router()
const usersDbConenct = require('../../mongodb')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
    let data = await usersDbConenct.usersDbConenct()
    let emailCheck = await data.findOne({email : req.body.email})
    let passwordCheck = await data.findOne({password : req.body.password})
    
    if(!emailCheck || !passwordCheck){
        res.status(400).send('Invalid Credentials')
    }
    
    else{
        const token = jwt.sign({email:req.body.email}, 'mykey');
        console.log("successfully logged in", token)
        res.status(200).send({
            message : 'successfully logged in',
            status : token || []
        })
    }
  })
  

  module.exports=router;