const db = require('../database/db')

const createEnquiry = async (req , res)=>{
    try {

        const {name, email, message, product_id} = req.body
        if (!name || !email || !message || isNaN(product_id)) {
            return res.status(400).json({message: 'All fields are required.'})
        }
        const newEnquiry = db.prepare(`insert into enquiries (name, email, message, product_id) values(?,?,?,?)`).run(name, email, message, product_id)
        if (newEnquiry.changes === 0) return res.status(400).json({message:'Unable to create an enquiry'})
        return res.status(200).json({message:'Enquiry created successfully'})
        
    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}


const getAllEnquiries = async (req, res)=>{
    try {

        const allEnquiries = db.prepare(`select * from enquiries`).all()
        if(allEnquiries.length === 0) return res.status(200).json({message:'No enquiries are created at'})
        return res.status(200).json({message:'enquiries fetched successfully', enquiries: allEnquiries})
    } catch (error) {
        return res.status(500).json({message:error.message || 'Internal server error'})
    }
}

module.exports = {createEnquiry, getAllEnquiries}