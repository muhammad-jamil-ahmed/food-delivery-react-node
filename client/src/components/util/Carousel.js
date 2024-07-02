import React from "react";
import { Link } from "react-router-dom";

function Carasoul({ item }) {
  return (
    <div id="carouselExample" className="carousel slide carousel-dark slide">
      <div className="carousel-inner">
        {item.data.map((items, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <ul className="list-group list-group-horizontal justify-content-center">
              {items.menuItems.map((img, imgIndex) => (
                <li className="list-group-item" key={imgIndex}>
                  <Link
                    to={`/restaurant/${items._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={img.imageURL}
                      className="d-block"
                      alt={`Slide ${imgIndex + 1}`}
                      style={{
                        width: "180px",
                        height: "180px",
                        objectFit: "cover",
                      }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carasoul;
