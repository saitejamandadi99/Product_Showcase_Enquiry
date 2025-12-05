const db = require('../database/db')

const getAllProducts= async (req , res)=>{
    try {
        const {search='',category='',page=1,limit=10} = req.query
        const pageNum = Math.max(1, parseInt(page || 1, 10));
        const perPage = Math.max(1, Math.min(100, parseInt(limit || 10, 10)));
        const offset = (pageNum - 1) * perPage;

        const where = []
        const params=[]

        if (search && search.trim() !== ''){
            where.push('(name LIKE ? OR description LIKE ?)')
            const pattern = `%${search.trim()}%`
            params.push(pattern,pattern)
        }

        if (category && category.trim() !== '') {
            where.push('category = ?');
            params.push(category.trim());
        }

        const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : ''

        const countSql = `SELECT COUNT(*) AS total FROM products ${whereClause}`;
        const countRow = db.prepare(countSql).get(...params);
        const total = countRow ? countRow.total : 0;
        const totalPages = Math.ceil(total / perPage);

        const dataSql = `
            SELECT id, name, description, price, category, image, created_at
            FROM products
            ${whereClause}
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
        `;
        const dataParams = params.slice();
        dataParams.push(perPage, offset);
        const products = db.prepare(dataSql).all(...dataParams);
        res.status(200).json({
        products,
        pagination: {
            page: pageNum,
            limit: perPage,
            total,
            totalPages
        }
        });
    } catch (error) {
        res.status(500).json({message:error.message || 'Internal server error'})
    }
}

const getProductById = async (req, res)=>{
    try {
        const id = parseInt(req.params.id,10)
        if(isNaN(id)){
            return res.status(400).json({message:'Invalid Product Id.'})
        }
        const product = db.prepare(`select * from products where id=?`).get(id)
        if (!product) return res.status(404).json({message:'Product not found'})
        return res.status(200).json({message:'Product details fetched successfully', product: product})
    } catch (error) {
        res.status(500).json({message:error.message || 'Internal server error'})
    }
}

module.exports ={getAllProducts,getProductById}

