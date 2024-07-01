import React, { useState } from "react";
import useOwnerData from "../../hooks/useOwnerData";
import CardsGroup from "../util/CardsGroup";
import RestaurantCarousel from "../util/RestaurantCarousel";


function Home() {
  const { ownerData, loading, error, setCart } = useOwnerData();
  const [sortingOption, setSortingOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  
  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setSortingOption(""); 
  }

  const allMenuItems = ownerData.data.flatMap((restaurant) =>
    restaurant.menuItems.map((menuItem) => ({
      restaurantId: restaurant._id,
      restaurantName: restaurant.restaurantName,
      ...menuItem,
    }))
  );

  const filteredData = allMenuItems.filter((menuItem) => {
    const searchTermLower = searchTerm.toLowerCase();
    const menuItemMatched = menuItem.name.toLowerCase().includes(searchTermLower);
    const restaurantDetailsMatched =
      menuItem.restaurantName.toLowerCase().includes(searchTermLower) ||
      ownerData.data.some((restaurant) =>
        restaurant.restaurantName.toLowerCase().includes(searchTermLower) ||
        restaurant.cuisineType.toLowerCase().includes(searchTermLower) ||
        restaurant.address.toLowerCase().includes(searchTermLower) && restaurant._id
      );

    return menuItemMatched || restaurantDetailsMatched;
  });

  let sortedFilteredData = [...filteredData];

  if (sortingOption === "lowToHigh") {
    sortedFilteredData.sort((a, b) => a.price - b.price);
  } else if (sortingOption === "highToLow") {
    sortedFilteredData.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <div className="banner-container">
        <img src="/banner.png" alt="Banner" className="banner-img" />
        <div className="banner-text">
          <h1>Are you hungry?</h1>
          <p>Don't wait!!!</p>
          <h2>Let's start to order food now!</h2>
          <a href="#menu-section" className="btn btn-maroon">Check out Menu</a>
        </div>

      </div>
      <div className="content">
        <div className="heading-container">
          <h2 className="text-center fw-bold heading-bar">Our Restaurants</h2>
        </div>
        <div className="container my-3">
          <RestaurantCarousel item={ownerData}></RestaurantCarousel>
          <div className="filter">
  
          <form className="d-flex" onSubmit={handleSearchSubmit}>
          <input
            className="form-control"
            type="search"
            placeholder="Search Dish"
            aria-label="Search Dish"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <button className="btn" type="submit">
            Search
          </button>
        </form>

      </div>


          <div id="menu-section" className="d-flex flex-wrap justify-content-center">
            {sortedFilteredData.map((menuItem, index) => (
              <div key={index} className="justify-content-center">
                <CardsGroup
                  key={index}
                  item={menuItem}
                  restId={menuItem.restaurantId}
                  restName={menuItem.restaurantName}
                  setCart={setCart}
                />
              </div>
            ))}
          </div>

          <hr />
        </div>
      </div>
    </div>
  );
}

export default Home;
