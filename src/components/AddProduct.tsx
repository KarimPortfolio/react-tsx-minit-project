import React, { ReactEventHandler, useContext } from "react";
import { myProductContext } from "../context/ProductsContext";

export default function AddProduct() {
  const { product, setProduct } = useContext(myProductContext);
  const { price, setPrice } = useContext(myProductContext);
  const { image, setImage } = useContext(myProductContext);
  const { addProduct } = useContext(myProductContext);
  const {message} = useContext(myProductContext);

  const getProductValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(e.target.value);
  };
  const getPriceValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  const getImageValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
        setImage(files.length > 0 ? files : null);
    } else {
        setImage(null);
    }
  };

  return (
    <div>
      <h1>Add new product</h1>
      <form
        style={{ margin: "100px" }}
        onSubmit={(e) => e.preventDefault()}
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="product"
          value={product}
          onChange={getProductValue}
          autoComplete="on"
        />
        <br />
        <br />
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={getPriceValue}
        />
        <br />
        <br />
        <input type="file" onChange={getImageValue} />
        <br />
        <br />
        <button onClick={addProduct}>Add Product</button>
      </form>
      <div style={{ marginTop:"20px" }}>
          {
              message !== '' ? (<p> {message} </p>) : ''
          }
      </div>
    </div>
  );
}
