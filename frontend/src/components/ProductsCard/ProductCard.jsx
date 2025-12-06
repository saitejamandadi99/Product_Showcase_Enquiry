
const ProductCard= (props) =>{
    const {productDetails} = props 
    const {name, description , price , category, image} = productDetails

    return(
        <li>
            <h4>{name}</h4>
            <h6>{description.slice(0, 40)}...</h6>
            <h5>{price}</h5>
            <h5>{category}</h5>
            <img src={image} alt={name} />
        </li>
    )

}

export default ProductCard