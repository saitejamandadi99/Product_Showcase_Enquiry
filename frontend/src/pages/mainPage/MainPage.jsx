import { useState, useEffect } from "react"
import axios from 'axios'
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
            setSuccess(response.data.message)
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
                <p>getting the details of the product</p>
            )}
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
        </div>
    )

}

export default MainPage