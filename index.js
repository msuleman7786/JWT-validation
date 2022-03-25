const express = require("express")
const faqrouter = require('./router/private/faqrouter')
const signUp = require('./router/public/signUp')
const signIN = require('./router/public/signIn')

const app = express();


app.use(express.json())
app.use('/faq', faqrouter)
app.use('/signup', signUp)
app.use('/signin', signIN)    

app.listen(3000, ()=> {
    console.log("Listening on port 3000")
})