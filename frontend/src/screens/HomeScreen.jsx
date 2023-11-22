import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../componrnts/Product'
import { useGetProductsQuery } from '../slices/productApiSlice'
import Loader from '../componrnts/Loader'
import Message from '../componrnts/Message'

// import products from '../product'
// import axios from 'axios'

const HomeScreen = () => {

    
    // const [products, setProducts] = useState([])

    
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const { data } = await axios.get('/api/products')
    //         setProducts(data)

    //         console.log("Data", data)
    //     }
    //     // fetchProducts()
    //     console.log("Dsffedf", fetchProducts())
        
    // },[])

    // Redux Start here

    const { data: products, isLoading, error } = useGetProductsQuery()
    
    return (
      
        <>
            {isLoading ? (<Loader />) : error ? (<Message variant='danger'>
                
                {error?.data?.message || error.error}
                
            </Message>) :(<>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
            
            </>)}
      </>
  )
}

export default HomeScreen