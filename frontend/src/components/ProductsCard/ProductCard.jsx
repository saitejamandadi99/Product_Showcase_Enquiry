import './productCard.css'
const ProductCard= (props) =>{
    const {productDetails, onViewDetails} = props 
    const {id,name, description , price , category, image} = productDetails

    return(
        <li className="product-card">
            <img src={image} alt={name} className="product-image" />
            <div className="product-content">
                <h4 className="product-title">{name}</h4>
                <h6 className="product-desc">{description.slice(0, 40)}...</h6>
                <h5 className="product-category">{category}</h5>
                <h5 className="product-price">{price}Rs/-</h5>
                <button type='button' className='details-btn' onClick={()=>onViewDetails(id)}>
                    View Details
                </button>
            </div>
        </li>
    )

}

export default ProductCard