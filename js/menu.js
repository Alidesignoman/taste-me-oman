/* ===== Taste Me Oman — edit the menu and contact details here ===== */
const SITE = {
  businessName: "Taste Me Oman",
  whatsappNumber: "96897111808",          // country code + number, digits only
  whatsappDisplay: "+968 97111808",
  instagramHandle: "taste_me_oman",
  instagramUrl: "https://www.instagram.com/taste_me_oman/"
};

const CATEGORIES = [
  { key: "salads",   label: "Salads" },
  { key: "snacks",   label: "Snacks" },
  { key: "desserts", label: "Desserts" },
  { key: "drinks",   label: "Drinks" }
];

/* price = OMR price of ONE order (one set of `pieces`). Quantity in the cart = number of orders. */
const MENU = [
  { id: "pasta-salad", category: "salads", name: "Pasta Salad", price: 12, pieces: 24, image: "images/pasta-salad.jpg",
    description: "A creamy and flavorful pasta salad with fresh vegetables, herbs, and a delicious dressing." },
  { id: "greek-salad", category: "salads", name: "Greek Salad", price: 12, pieces: 24, image: "images/greek-salad.jpg",
    description: "A fresh and colorful Greek salad with crisp lettuce, fresh vegetables, olives, and feta cheese, dressed with a Mediterranean vinaigrette." },
  { id: "potato-salad", category: "salads", name: "Potato Salad", price: 12, pieces: 24, image: "images/potato-salad.jpg",
    description: "Creamy potato salad with fresh vegetables, herbs, and a rich, flavorful dressing." },

  { id: "stuffed-vine-leaves", category: "snacks", name: "Stuffed Vine Leaves", price: 10, pieces: 40, image: "images/stuffed-vine-leaves.jpg",
    description: "Tender grape leaves stuffed with a savoury rice filling, served with fresh lemon." },
  { id: "chicken-bbq-mash-potato", category: "snacks", name: "Chicken BBQ with Mash Potato", price: 14.4, pieces: 24, image: "images/chicken-bbq-mash-potato.jpg",
    description: "Tender grilled chicken BBQ served on creamy mashed potatoes, garnished with fresh herbs." },
  { id: "chicken-shawarma", category: "snacks", name: "Chicken Shawarma", price: 9.6, pieces: 24, image: "images/chicken-shawarma.jpg",
    description: "Mini chicken shawarma wraps filled with marinated chicken, garlic sauce, fresh vegetables, and pickles." },
  { id: "mini-pizza", category: "snacks", name: "Mini Pizza", price: 9.6, pieces: 24, image: "images/mini-pizza.jpg",
    description: "Delicious bite-sized mini pizzas topped with melted cheese, olives, pepperoni, and fresh vegetables." },
  { id: "chicken-musakhan", category: "snacks", name: "Chicken Musakhan", price: 9.6, pieces: 24, image: "images/chicken-musakhan.jpg",
    description: "Traditional Palestinian rolls filled with sumac-seasoned chicken, caramelized onions, and olive oil." },
  { id: "beef-sliders", category: "snacks", name: "Beef Sliders", price: 8, pieces: 20, image: "images/beef-sliders.jpg",
    description: "Juicy beef sliders with fresh lettuce, tomato, cheese and special sauce. Perfect as a snack or appetizer." },
  { id: "chicken-sliders", category: "snacks", name: "Chicken Sliders", price: 6.2, pieces: 20, image: "images/chicken-sliders.jpg",
    description: "Crispy chicken sliders with fresh lettuce, tomato, and a creamy herb sauce. Perfect as a snack or appetizer." },
  { id: "forest-sandwiches", category: "snacks", name: "Forest Sandwiches", price: 6.2, pieces: 20, image: "images/forest-sandwiches.jpg",
    description: "Assorted finger sandwiches with grilled chicken, or meat and mushroom in barbecue sauce." },
  { id: "meat-mashtinis", category: "snacks", name: "Meat Mashtinis", price: 8, pieces: 20, image: "images/meat-mashtinis.jpg",
    description: "Crispy fried meat bites served over a creamy herbed sauce, topped with fresh parsley. Perfect as a snack or appetizer." },
  { id: "french-fries-shooters", category: "snacks", name: "French Fries Shooters", price: 8, pieces: 20, image: "images/french-fries-shooters.jpg",
    description: "Crispy golden french fries served with ketchup, perfect as a snack or appetizer." },
  { id: "shrimp-bites", category: "snacks", name: "Shrimp Bites", price: 12, pieces: 20, image: "images/shrimp-bites.jpg",
    description: "Crispy golden shrimp served with creamy orange dipping sauce and fresh mint. Perfect as a bite-sized appetizer." },
  { id: "chicken-spring-rolls", category: "snacks", name: "Chicken Spring Rolls", price: 14, pieces: 20, image: "images/chicken-spring-rolls.jpg",
    description: "Crispy chicken spring rolls served with fresh vegetable sticks and a creamy herb sauce. Perfect as a snack or appetizer." },

  { id: "tres-leches", category: "desserts", name: "Tres Leches", price: 14.4, pieces: 24, image: "images/tres-leches.jpg",
    description: "Classic tres leches cake soaked in a rich blend of three milks, topped with whipped cream and fresh berries." },
  { id: "chocolate-mousse", category: "desserts", name: "Chocolate Mousse", price: 14.4, pieces: 24, image: "images/chocolate-mousse.jpg",
    description: "Rich and creamy chocolate mousse with a smooth, velvety texture." },
  { id: "strawberry-cheesecake", category: "desserts", name: "Strawberry Cheesecake", price: 14.4, pieces: 24, image: "images/strawberry-cheesecake.jpg",
    description: "Creamy cheesecake layered with strawberry, creamy cheese filling, and a buttery biscuit base." },
  { id: "mix-berries-cheesecake", category: "desserts", name: "Mix Berries Cheesecake", price: 14.4, pieces: 24, image: "images/mix-berries-cheesecake.jpg",
    description: "Creamy cheesecake layered with a mix of berries, a buttery biscuit base, and a fruity berry topping." },

  { id: "fruit-salad", category: "desserts", name: "Fruit Salad", price: 14.4, pieces: 12, image: "images/fruit-salad.jpg",
    description: "A fresh and colorful mix of seasonal fruits served in elegant cups." },

  { id: "matcha-latte", category: "drinks", name: "Matcha Latte", price: 4.2, pieces: 1, note: "Enough for 5 – 6 Glasses", image: "images/matcha-latte.jpg",
    description: "A smooth and creamy matcha latte with a rich, earthy flavor." },
  { id: "ice-spanish-latte", category: "drinks", name: "Ice Spanish Latte", price: 4.2, pieces: 1, note: "Enough for 5 – 6 Glasses", image: "images/ice-spanish-latte.jpg",
    description: "A smooth and creamy iced latte with a hint of sweet Spanish flavor." },
  { id: "strawberry-juice", category: "drinks", name: "Strawberry Juice", price: 3, pieces: 1, note: "Enough for 5 – 6 Glasses", image: "images/strawberry-juice.jpg",
    description: "A refreshing, naturally sweet strawberry juice made from fresh, juicy strawberries." },
  { id: "passion-mango-juice", category: "drinks", name: "Passion Mango Juice", price: 3, pieces: 1, note: "Enough for 5 – 6 Glasses", image: "images/passion-mango-juice.jpg",
    description: "A refreshing blend of tropical passion fruit and ripe mango, rich in flavor and natural goodness." }
];

if (typeof module !== "undefined") module.exports 
