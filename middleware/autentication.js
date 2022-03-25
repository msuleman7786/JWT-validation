const jwt = require('jsonwebtoken')

const verifyUser =  (req, res, next) => {
    try {
        const token = req.header("token");                                      // JWT header
        const decode = jwt.verify(token, 'mykey');                              // jwt.verify(payload, signature)

        if(decode) {
            console.log('decode data', decode)}
        else {
            console.log('Login failed')
        }

        next()
    }
    
    catch (error) {
        console.log('Login error'+ error);
    }
}

module.exports = { verifyUser }