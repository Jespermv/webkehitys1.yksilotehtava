"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var apiUrl = 'https://media1.edu.metropolia.fi/restaurant';
// Fetch restaurant data from the API
function fetchRestaurants() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(apiUrl, "/restaurants"))];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Network response was not ok");
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error fetching restaurants:", error_1);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Fetch menu data for a restaurant (daily or weekly)
function fetchMenu(restaurantId, period) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(apiUrl, "/menu/").concat(restaurantId, "/").concat(period))];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Network response was not ok");
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error fetching ".concat(period, " menu:"), error_2);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Display the list of restaurants on the page
function displayRestaurants() {
    return __awaiter(this, void 0, void 0, function () {
        var restaurantList, restaurants;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    restaurantList = document.getElementById('restaurant-list');
                    if (!restaurantList)
                        return [2 /*return*/];
                    return [4 /*yield*/, fetchRestaurants()];
                case 1:
                    restaurants = _a.sent();
                    restaurantList.innerHTML = ''; // Clear any existing content
                    if (restaurants.length === 0) {
                        restaurantList.innerHTML = "<p>No restaurants available.</p>";
                        return [2 /*return*/];
                    }
                    // Loop through restaurants and create HTML for each
                    restaurants.forEach(function (restaurant) {
                        var restaurantItem = document.createElement('div');
                        restaurantItem.className = 'restaurant';
                        restaurantItem.innerHTML = "\n      <h2>".concat(restaurant.name, "</h2>\n      <p>").concat(restaurant.address, ", ").concat(restaurant.city, "</p>\n      <button class=\"menu-btn\" data-id=\"").concat(restaurant.id, "\">View Menus</button>\n    ");
                        restaurantList.appendChild(restaurantItem);
                    });
                    // Add event listeners to the buttons
                    document.querySelectorAll('.menu-btn').forEach(function (button) {
                        button.addEventListener('click', function (event) {
                            var target = event.target;
                            var restaurantId = target.dataset.id ? parseInt(target.dataset.id) : 0;
                            if (restaurantId) {
                                showMenuOptions(restaurantId);
                            }
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// Display menu options (daily or weekly) for a selected restaurant
function showMenuOptions(restaurantId) {
    var _this = this;
    var dailyBtn = document.getElementById('show-daily-menu');
    var weeklyBtn = document.getElementById('show-weekly-menu');
    var menuDisplay = document.getElementById('menu-display');
    if (!dailyBtn || !weeklyBtn || !menuDisplay)
        return;
    dailyBtn.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
        var dailyMenu;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchMenu(restaurantId, 'day')];
                case 1:
                    dailyMenu = _a.sent();
                    displayMenu(dailyMenu, menuDisplay);
                    return [2 /*return*/];
            }
        });
    }); };
    weeklyBtn.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
        var weeklyMenu;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchMenu(restaurantId, 'week')];
                case 1:
                    weeklyMenu = _a.sent();
                    displayMenu(weeklyMenu, menuDisplay);
                    return [2 /*return*/];
            }
        });
    }); };
}
// Display the fetched menu on the page
function displayMenu(menu, menuDisplay) {
    menuDisplay.innerHTML = ''; // Clear existing menu
    if (menu.length === 0) {
        menuDisplay.innerHTML = '<p>No menu available for the selected period.</p>';
        return;
    }
    menu.forEach(function (menuItem) {
        var menuDiv = document.createElement('div');
        menuDiv.className = 'menu-item';
        menuDiv.innerHTML = "\n      <h3>".concat(menuItem.day, "</h3>\n      <ul>\n        ").concat(menuItem.meals.map(function (meal) { return "<li>".concat(meal, "</li>"); }).join(''), "\n      </ul>\n    ");
        menuDisplay.appendChild(menuDiv);
    });
}
// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function (registration) {
            console.log('ServiceWorker registration successful:', registration.scope);
        })
            .catch(function (error) {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}
// Initialize the app by displaying restaurants
displayRestaurants();
