import React from "react";

function RestaurantCarousel({ item }) {
  return (
    <div id="carouselRest" className="carousel slide carousel-dark slide my-3 carousel-container">
      <div className="carousel-inner p-3">
        {item.data.map((items, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <ul className="list-group list-group-horizontal justify-content-center">
              {items.menuItems.map((img, imgIndex) => (
                <li className="list-group-item" key={imgIndex}>
                  <img
                    src={img.imageURL}
                    className="d-block"
                    alt={`Slide ${imgIndex + 1}`}
                    style={{ width: "300px", height: "300px", objectFit: "cover" }}
                  />
                </li>
              ))}
            </ul>
           
            <h1 style={{marginTop:"40px"}}>{items.restaurantName}</h1>
            <h4>{items.description}</h4>
            <h3>{items.cuisineType}</h3>
            <ul className="list-group list-group-horizontal justify-content-center forRest">
              {items.menuItems.map((menuItem, menuItemIndex) => (
                <li
                  className="list-group-item menu-background"
                  key={menuItemIndex}
                  style={{ margin: "10px 10px" }} // Add margin directly here
                >
                  {menuItem.name}
                </li>
              ))}
            </ul>
            </div>
         
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselRest"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselRest"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default RestaurantCarousel;
