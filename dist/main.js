"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

// Fetch all restaurants and display them with Daily and Weekly buttons
function fetchRestaurants() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield fetch(
        "https://media1.edu.metropolia.fi/restaurant/api/v1/restaurants"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = yield response.json();

      // Log response to check the structure
      console.log("API response data:", data);

      if (Array.isArray(data)) {
        // Check if data is an array directly
        displayRestaurants(data);
      } else {
        console.error("No restaurants found in response data");
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  });
}

// Display restaurants with Daily and Weekly buttons
function displayRestaurants(restaurants) {
  const restaurantList = document.getElementById("restaurant-list");
  if (restaurantList) {
    restaurantList.innerHTML = "";
    restaurants.forEach((restaurant) => {
      const restaurantItem = document.createElement("div");
      restaurantItem.classList.add("restaurant-item");
      restaurantItem.innerHTML = `
        <h3>${restaurant.name}</h3>
        <p>${restaurant.address}</p>
        <div id="menu-${restaurant._id}" class="menu-container"></div>
        <button onclick="fetchDailyMenu('${restaurant._id}')">Daily</button>
        <button onclick="fetchWeeklyMenu('${restaurant._id}')">Weekly</button>
      `;
      restaurantList.appendChild(restaurantItem);
    });
  }
}

// Fetch and display daily menu for a specific restaurant
function fetchDailyMenu(id) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield fetch(
        `https://media1.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${id}/en`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = yield response.json();

      console.log("Daily menu response data:", data);

      // Display the daily menu in the relevant restaurant section
      displayMenu(data.courses, `menu-${id}`, "Daily Menu");
    } catch (error) {
      console.error("Error fetching daily menu:", error);
    }
  });
}

// Fetch and display weekly menu for a specific restaurant
function fetchWeeklyMenu(id) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield fetch(
        `https://media1.edu.metropolia.fi/restaurant/api/v1/restaurants/weekly/${id}/en`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = yield response.json();

      console.log("Weekly menu response data:", data);

      // Display the weekly menu in the relevant restaurant section
      displayMenu(data.days, `menu-${id}`, "Weekly Menu");
    } catch (error) {
      console.error("Error fetching weekly menu:", error);
    }
  });
}

// Display menu under the specific restaurant's menu container
function displayMenu(menuItems, containerId, menuType) {
  const menuContainer = document.getElementById(containerId);
  if (menuContainer) {
    menuContainer.innerHTML = `<h4>${menuType}</h4>`;

    if (menuType === "Weekly Menu") {
      menuItems.forEach((day) => {
        const dayTitle = document.createElement("h5");
        dayTitle.innerText = day.date; // Display the date
        menuContainer.appendChild(dayTitle);

        if (day.courses && Array.isArray(day.courses)) {
          day.courses.forEach((item) => {
            const menuItem = document.createElement("div");
            menuItem.innerHTML = `<p>${item.name || "No Name"} - ${
              item.price || "No Price"
            } (${item.diets || "No Diet Info"})</p>`;
            menuContainer.appendChild(menuItem);
          });
        } else {
          menuContainer.innerHTML += `<p>No menu items available for this day</p>`;
        }
      });
    } else {
      if (menuItems && Array.isArray(menuItems)) {
        menuItems.forEach((item) => {
          const menuItem = document.createElement("div");
          menuItem.innerHTML = `<p>${item.name || "No Name"} - ${
            item.price || "No Price"
          } (${item.diets || "No Diet Info"})</p>`;
          menuContainer.appendChild(menuItem);
        });
      } else {
        menuContainer.innerHTML += `<p>No menu items available</p>`;
      }
    }
  }
}

// Assign functions to window for global access
window.fetchDailyMenu = fetchDailyMenu;
window.fetchWeeklyMenu = fetchWeeklyMenu;

// Initial fetch of restaurants when page loads
// Theme toggle function
// Theme toggle function
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}

// Assign the theme toggle function to the button
window.onload = () => {
  fetchRestaurants(); // Fetch restaurants on load

  const themeToggleButton = document.getElementById("theme-toggle");
  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", toggleTheme);
  } else {
    console.error("Theme toggle button not found");
  }
};

// Register the service worker for offline capabilities
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../public/service-worker.js")
      .then((registration) => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed: ", error);
      });
  });
}
