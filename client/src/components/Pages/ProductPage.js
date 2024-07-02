import React, { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';

function ProductPage() {
  const { product } = useContext(ProductContext);
  console.log("Product from context:", product);

  if (!product) {
    return <p>No product data available. Please go back and select a product.</p>;
  }

  const { item, restName } = product;

  return (
    <div
      className="d-flex justify-content-center"
      style={{ width: "100%", height: "100%", marginTop: "3%" }}
    >
      <div className="card prd mb-3" style={{ width: "100%", height: "100%" }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              className="card-img"
              src={item.imageURL}
              alt={item.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body text-start">
              <h5 className="card-title"><strong>{item.name}</strong></h5>
              <p style={{marginTop:'40px'}} className="card-text"><strong>Restaurant Name</strong>: {restName}</p>
              <p className="card-text"><strong>Price</strong>: {item.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
