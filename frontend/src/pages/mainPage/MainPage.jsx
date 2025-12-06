import { useState, useEffect,useNavigate } from "react"
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
    const navigate  = useNavigate()
    
    const handleViewDetails = (id)=>{
        navigate(`/products/:${id}`)
    }

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
    },[search,category]) 

    const renderProducts = () =>{
        return(
            <>
            {productList.length === 0? (
               <p>No products found</p> 
            ):(
                <>
                <div className="filter-container">
                    <label htmlFor="searchInput">Search</label>
                     <input value = {search} type='search' id='searchInput' onChange={e=>setSearch(e.target.value)} />
                     <select value={category} onChange={e=>setCategory(e.target.value)}>
                        <option value=''>All</option>
                        <option value='Electronics'>Electronics</option>
                        <option value='Fashion'>Fashion</option>
                        <option value='Computers'>Computers</option>
                        <option value='Furniture'>Furniture</option>
                        <option value='Accessories'>Accessories</option>
                        <option value='Fitness'>Fitness</option>
                        <option value='Books'>Books</option>
                     </select>

                </div>
               
                <ul>
                    {
                        productList.map(eachProduct=>(
                            <ProductCard key={eachProduct.id} productDetails={eachProduct} onViewDetails={handleViewDetails} />
                        ))
                    }    

                </ul>
                </>
            )}
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
            
            </>
        )
    }
    return(
        <div className="mainContainer">
            {isLoading? (
                <h3>Loading...</h3>
            ):(
                renderProducts()
            )}
        </div>
    )

}

export default MainPage