import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCartContext } from "../../context/CartContext";
import { ProductContext } from "../../context/ProductContext";

function CardsGroup({ item, restId, restName }) {
  const [quantity, setQuantity] = useState(1);
  const { cart, updateCart } = useCartContext();
  const { setProduct } = useContext(ProductContext);

  function handlePlus() {
    setQuantity((prev) => prev + 1);
  }

  function handleMinus() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }

  const handleAddToCart = () => {
    const existingCartItemIndex = cart.findIndex(
      (cartItem) => cartItem.item._id === item._id && cartItem.restId === restId
    );

    if (existingCartItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingCartItemIndex].quantity += quantity;
      updateCart(updatedCart);
      toast("Product quantity updated");
    } else {
      const isSameRestaurant = cart.length > 0 && cart[0].restId === restId;

      if (isSameRestaurant) {
        const newItem = {
          restId,
          restName,
          quantity,
          item,
        };
        const newCart = [...cart, newItem];
        updateCart(newCart);
        toast("Product added to cart");
      } else {
        const newCart = [
          {
            restId,
            restName,
            quantity,
            item,
          },
        ];
        updateCart(newCart);
        toast("Cart cleared and new product added");
      }
    }
  };

  const handleProductClick = () => {
    setProduct({ item, restName });
  };

  return (
    <div className="card-group mb-3 h-5">
      <div className="card mx-3">
        <span style={{ borderRadius: "25px" }}>
          <Link
            to={{
              pathname: `/product/${item._id}`,
              state: { item, restName },
            }}
            onClick={handleProductClick}
            style={{ textDecoration: "none" }}
          >
            <img
              src={item.imageURL}
              className="card-img-top"
              alt={item.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "15px",
              }}
            />
          </Link>
        </span>
        <div className="card-body">
          <h6>
            <i className="fa fa-cutlery" aria-hidden="true"></i> &nbsp;{restName}
          </h6>
          <h5 className="card-title">{item.name}</h5>
          <h5 className="card-text fw-bold">&#8377;{item.price}</h5>
          <div className="d-flex justify-content-center me-auto">
            <div
              className="plus"
              onClick={handlePlus}
              style={{
                width: "25px",
                height: "25px",
                backgroundColor: "lightgrey", 
                borderRadius: "7px",
                boxShadow: "2px 3px 3px gray",
                cursor: "pointer",
              }}
            >
              +
            </div>
            &nbsp; {quantity} &nbsp;
            <div
              className="minus"
              onClick={handleMinus}
              style={{
                width: "25px",
                height: "25px",
                backgroundColor: "lightgrey", 
                borderRadius: "7px",
                boxShadow: "2px 3px 3px gray",
                cursor: "pointer",
              }}
            >
              -
            </div>
          </div>
        </div>
        <div className="card-footer">
  <small className="text-muted">
    <button
      className="w-100 btn btn-block btn-maroon"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  </small>
</div>


      </div>
    </div>
  );
}

export default CardsGroup;
