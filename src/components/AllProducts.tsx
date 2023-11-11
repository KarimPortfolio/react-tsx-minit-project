import React, { useContext } from 'react'
import { myProductContext } from '../context/ProductsContext';

interface Product {
    _id:string,
    product:string,
    price:number,
    image:{
        name:string,
        data:Buffer
    },
    user_id:string,
    user: {
      _id:string,
      name:string,
      email:string,
      createdAt:string,
      updatedAt:string
    }[],
    createdAt:string,
    updatedAt:string
};

export default function AllProducts() {

    const {products} = useContext(myProductContext);
    const {deleteProduct} = useContext(myProductContext);

  return (
    <div>
        <h1>All products:</h1>
        <div style={{ margin:'190px'}}>
            {
                products.map( (product: Product) => {
                    return(
                        <div key={product._id} style={{ margin:'40px' }}>
                            {/* Loading image from AWS cloud using Buffer */}
                            <img src={`data:image/jpeg;base64,${product.image.data}`} alt=""  width="300" height="300" />
                            <h5> {product.product} </h5>
                            <p> {product.price}$ </p>
                            <p>By: {product.user[0].name} </p>
                            <button onClick={() => deleteProduct(product._id)}>Delete</button>
                        </div>
                    )
                } )
            }
        </div>
    </div>
  )
}


