const db = require('../database/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerAdmin = async (req , res)=>{
    try{
        const {name, email, phone_no, password} = req.body
        if (!name || !email || !phone_no || !password){
            return res.status(400).json({message:'All fields are requried'})
        }

        const existingUser = db.prepare(`select * from users where email =?`).get(email)
        if(existingUser){
            return res.status(400).json({message:'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const newAdminUser = db.prepare(`insert into users (name, email, phone_no,password) values (?,?,?,?)`).run(name, email, phone_no, hashedPassword)
        if (newAdminUser.changes === 0){
            return res.status(400).json({message:'Unable to create the admin'})
        }
        return res.status(201).json({message:'Admin created successfully'})

    }
    catch (error){
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}

const loginAdmin = async (req, res)=>{
    try {
        const {email, password } = req.body 
        if(!email || !password) return res.status(400).json({message:'All fields are requried'})
        const adminUser = db.prepare(`select * from users where email =?`).get(email)
        if (!adminUser) return res.status(400).json({message:'Admin does not exists.'})
        const isPasswordMatched = await bcrypt.compare(password, adminUser.password)
        if(!isPasswordMatched) return res.status(400).json({message:'Invalid credentials'})
        const token = jwt.sign({id:adminUser.id, email:adminUser.email}, process.env.JWT_SECRET, {expiresIn:'8h'})
        return res.status(200).json({message: 'Admin logged in successfully', token : token})
    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error' })
    }
}

module.exports = {registerAdmin, loginAdmin}