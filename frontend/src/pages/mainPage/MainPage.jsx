import { useState, useEffect } from "react"
import axios from 'axios'
import ProductCard from '../../components/ProductsCard/ProductCard.jsx'
import './mainpage.css'

const MainPage = () =>{

    const [productList, setProductList] = useState([])
    const [error, setError] = useState('')
    const [success, setSuccess] =  useState('')
    const [search,setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const getProductsList = async ()=>{
        setIsLoading(true)
        try {

            const url = `${process.env.REACT_APP_API_URL}/api/products?search=${search}&category=${category}&page=1&limit=10`
            const response = await axios.get(url)
            setSuccess("Products fetched successfully")
            setProductList(response.data.products)
            setError('')
            
        } catch (error) {
            setError(error.response?.data?.message)
            setSuccess('')
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getProductsList()
    },[]) //runs single time only
    return(
        <div className="mainContainer">
            {productList.length === 0? (
               <p>No products found</p> 
            ):(
                <ul>
                    {
                        productList.map(eachProduct=>(
                            <ProductCard key={eachProduct.id} productDetails={eachProduct} />
                        ))
                    }    

                </ul>
            )}
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
        </div>
    )

}

export default MainPage