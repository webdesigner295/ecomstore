import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {Form, Row, Col,Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../componrnts/Rating'
import { useGetPruductDeatailsQuery } from '../slices/productApiSlice'
import Loader from '../componrnts/Loader'
import Message from '../componrnts/Message'
import { addToCart } from '../slices/cartSlice'
import { useDispatch } from 'react-redux'



// import products from '../product'
// import axios from 'axios'
const ProductScreen = () => {
  // const [product, setProduct] = useState({})
  const [ qty, setQty ] = useState(1)



  const { id: productId } = useParams()


  const dispatch = useDispatch()

  const navigate = useNavigate()
  
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get(`/api/products/${productId}`)
  //     setProduct(data)
  //   }
    
  //   fetchProducts()
  // },[productId])
  // const product = products.find((p) => p._id === productId)
  


  // console.log(product,"prodyctadsf")
  
  
  
  // Redux Start Time
  const { data: product, isLoading, error } = useGetPruductDeatailsQuery(productId)
  console.log("Add ",  addToCart({...product,qty}))

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }))
    navigate('/cart')

    
  }

  // console.log([...Array(product.countInStock).keys()])

  // console.log([...Array(product.countInStock).keys()])
  

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      
      {isLoading ? (<Loader/>) : error ? (
      <Message variant='danger'>
        {error?.data?.message || error.error}
        
      </Message>
      ) : (
      <Row>
      <Col md={6}>
        <Image src={product.image} alt={product.name} fluid />
      </Col>
      <Col md={3}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h3>{ product.name}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating value={product.rating} text={`${product.numReview} reviews`}/>

          </ListGroup.Item>
          <ListGroup.Item>
            Price :{product.price}
            
          </ListGroup.Item>
          <ListGroup.Item>Description :{ product.description}</ListGroup.Item>

        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>${ product.price}</strong></Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>
                  <strong>${product.countInStock > 0 ? 'in stock' : 'out of stock'}</strong></Col>
              </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          
                          >
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control></Col>
                      </Row>
                    </ListGroup.Item>
                  )}
            <ListGroup.Item>
              <Button className='btn-block'
                type='button'
                      disabled={product.countInStock === 0}
                    onClick={addToCartHandler}>
                Add To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
      )}
      
    </>
  )
}

export default ProductScreen
