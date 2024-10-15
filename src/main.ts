// Define types for the API response
interface Restaurant {
  id: number;
  name: string;
  address: string;
  city: string;
}

interface Menu {
  day: string;
  meals: string[];
}

const apiUrl = 'https://media1.edu.metropolia.fi/restaurant';

// Fetch restaurant data from the API
async function fetchRestaurants(): Promise<Restaurant[]> {
  try {
    const response = await fetch(`${apiUrl}/restaurants`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data: Restaurant[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
}

// Fetch menu data for a restaurant (daily or weekly)
async function fetchMenu(restaurantId: number, period: 'day' | 'week'): Promise<Menu[]> {
  try {
    const response = await fetch(`${apiUrl}/menu/${restaurantId}/${period}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data: Menu[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${period} menu:`, error);
    return [];
  }
}

// Display the list of restaurants on the page
async function displayRestaurants() {
  const restaurantList = document.getElementById('restaurant-list');
  if (!restaurantList) return;

  const restaurants = await fetchRestaurants();
  restaurantList.innerHTML = ''; // Clear any existing content

  if (restaurants.length === 0) {
    restaurantList.innerHTML = `<p>No restaurants available.</p>`;
    return;
  }

  // Loop through restaurants and create HTML for each
  restaurants.forEach((restaurant) => {
    const restaurantItem = document.createElement('div');
    restaurantItem.className = 'restaurant';
    restaurantItem.innerHTML = `
      <h2>${restaurant.name}</h2>
      <p>${restaurant.address}, ${restaurant.city}</p>
      <button class="menu-btn" data-id="${restaurant.id}">View Menus</button>
    `;
    restaurantList.appendChild(restaurantItem);
  });

  // Add event listeners to the buttons
  document.querySelectorAll('.menu-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;
      const restaurantId = target.dataset.id ? parseInt(target.dataset.id) : 0;
      if (restaurantId) {
        showMenuOptions(restaurantId);
      }
    });
  });
}

// Display menu options (daily or weekly) for a selected restaurant
function showMenuOptions(restaurantId: number) {
  const dailyBtn = document.getElementById('show-daily-menu');
  const weeklyBtn = document.getElementById('show-weekly-menu');
  const menuDisplay = document.getElementById('menu-display');

  if (!dailyBtn || !weeklyBtn || !menuDisplay) return;

  dailyBtn.onclick = async () => {
    const dailyMenu = await fetchMenu(restaurantId, 'day');
    displayMenu(dailyMenu, menuDisplay);
  };

  weeklyBtn.onclick = async () => {
    const weeklyMenu = await fetchMenu(restaurantId, 'week');
    displayMenu(weeklyMenu, menuDisplay);
  };
}

// Display the fetched menu on the page
function displayMenu(menu: Menu[], menuDisplay: HTMLElement) {
  menuDisplay.innerHTML = ''; // Clear existing menu

  if (menu.length === 0) {
    menuDisplay.innerHTML = '<p>No menu available for the selected period.</p>';
    return;
  }

  menu.forEach((menuItem) => {
    const menuDiv = document.createElement('div');
    menuDiv.className = 'menu-item';
    menuDiv.innerHTML = `
      <h3>${menuItem.day}</h3>
      <ul>
        ${menuItem.meals.map((meal) => `<li>${meal}</li>`).join('')}
      </ul>
    `;
    menuDisplay.appendChild(menuDiv);
  });
}

// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful:', registration.scope);
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}

// Initialize the app by displaying restaurants
displayRestaurants();