const apiBaseUrl: string = 'https://api.example.com/restaurants'; // Replace with the correct API URL
const restaurantListElement: HTMLElement | null = document.getElementById('restaurant-list');

// Function to fetch restaurant data
async function fetchRestaurants() {
    try {
        const response = await fetch(apiBaseUrl, {
            headers: {
                'Authorization': 'Bearer your-auth-token', // Include token if necessary
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data: any[] = await response.json();
        console.log("API response data:", data);

        const restaurants: any[] = data; // The API response is an array

        // Check if restaurants exist and have data
        if (Array.isArray(restaurants) && restaurants.length > 0) {
            displayRestaurants(restaurants);
        } else {
            console.log("No restaurants found in response data");
            restaurantListElement!.innerHTML = "<p>No restaurants available at the moment.</p>";
        }
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        restaurantListElement!.innerHTML = "<p>Failed to load restaurant data.</p>";
    }
}

// Function to display restaurant data in the UI
function displayRestaurants(restaurants: any[]) {
    if (restaurantListElement) {
        restaurantListElement.innerHTML = ''; // Clear previous data

        restaurants.forEach(function(restaurant) {
            const restaurantItem = document.createElement('div');
            restaurantItem.className = 'restaurant-item';

            restaurantItem.innerHTML = `
                <h3>${restaurant.name}</h3>
                <p><strong>Address:</strong> ${restaurant.address}</p>
                <p><strong>City:</strong> ${restaurant.city}</p>
                <p><strong>Company:</strong> ${restaurant.company}</p>
                <p><strong>Phone:</strong> ${restaurant.phone}</p>
            `;

            restaurantListElement.appendChild(restaurantItem);
        });
    }
}

// Initialize the app by fetching restaurants
fetchRestaurants();
