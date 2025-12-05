const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())
//run and initialize the db 
require('./database/init')
app.get('/', (req, res)=>{
    res.send('Application is running in the backend')
})

app.use('/api/products', require('./routes/productRoutes'));


app.use((err, req , res, next)=>{
    console.error(err.message)
    res.status(500).json({message: err.message || 'Internal server error'})
}) //global error middleware

const PORT = process.env.PORT || 5000 
app.listen(PORT,()=>{
    console.log(`application is running in http://localhost:${PORT}`)
})