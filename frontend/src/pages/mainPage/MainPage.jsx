
import { useState, useEffect } from "react"
import {useNavigate} from 'react-router-dom'
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
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate  = useNavigate()
    
    const handleViewDetails = (id)=>{
        navigate(`/product/${id}`)
    }

    const getProductsList = async ()=>{
        setIsLoading(true)
        try {

            const url = `${process.env.REACT_APP_API_URL}/api/products?search=${search}&category=${category}&page=${page}&limit=10`
            const response = await axios.get(url)
            setSuccess("Products fetched successfully")
            setProductList(response.data.products)
            setTotalPages(response.data.pagination.totalPages);
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
    },[search,category,page]) 

    const renderProducts = () =>{
        return(
            <>
            {productList.length === 0? (
               <p>No products found</p> 
            ):(
                <>
                <ul >
                    {
                        productList.map(eachProduct=>(
                            <ProductCard key={eachProduct.id} productDetails={eachProduct} onViewDetails={handleViewDetails} />
                        ))
                    }    

                </ul>
                <div className="pagination-container">
                    <button 
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Prev
                    </button>

                    <span>Page {page} of {totalPages}</span>

                    <button 
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                    </div>

                </>
            )}

            {success && (
            <p style={{ backgroundColor: "green", color: "white", padding: "8px", textAlign:'center' }}>
                {success}
            </p>
            )}

            {error && (
            <p style={{ backgroundColor: "red", color: "white", padding: "8px" , textAlign:'center' }}>
            {error}
            </p>
            )}

            
            </>
        )
    }
    return(
        <div className="mainContainer">
            <div className="filter-container">
                    <div className="filter-group">
                        <label htmlFor="searchInput">Search</label>
                        <input value = {search} type='search' id='searchInput' onChange={(e) => {
                                                                    setSearch(e.target.value);
                                                                    setPage(1); 
                                                                    }}/>
                    </div>
                    <div className="filter-group">
                        <label>Category</label>
                    
                     <select value={category} onChange={(e) => {
                                            setCategory(e.target.value);
                                            setPage(1);
                                        }}>
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
                </div>

            {isLoading? (
                <h3>Loading...</h3>
            ):(
                renderProducts()
            )}
        </div>
    )

}

export default MainPage