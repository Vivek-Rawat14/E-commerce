if (localStorage.length == 0) {
  localStorage.setItem("cart", "[]");
  localStorage.setItem("buyitem", "[]");
}

let cont = [];
let buy_container = [];

let likedItems = JSON.parse(localStorage.getItem("likedItem"));
let container = document.querySelector(".like_list");
async function getItems() {
  for (i = 0; i < likedItems.length; i++) {
    let res = await fetch(`https://dummyjson.com/products/${likedItems[i]}`);
    data = await res.json();

    Showdata(data);
  }
}

function Showdata(data) {
  let cards = document.createElement("div");
  cards.classList.add("likebox"); //class
  cards.innerHTML = `
  <img src="${data.images[0]}" id="imageslike">
  <div class ="itemdetails ">
  <p id="itemlike_name">${data.title}</p>
  <p id="pricelike">$ ${data.price}</p>
  <div class="descriptions">
  <p id="desc">${data.description}</p>
  </div>
  <button class="buyitems" onclick="buycart(${data.id})">Buy</button>
  <button class="additems" onclick="addcart(${data.id})">Add To Cart</button>
  </div>
  <button onclick="remove()" class="remove">X</button
      
          `;

  container.appendChild(cards);
}

function remove(id) {
  let likeitem = JSON.parse(localStorage["likedItem"]); // JSON.parse() converts string to array
  likeitem.splice(likeitem.indexOf(id), 1);
  localStorage["likedItem"] = JSON.stringify(likeitem);
  container.innerHTML = "";
  Showdata(data);
}

function buycart(id) {
  let buys = JSON.parse(localStorage["buyitem"]);
  buys.push(id);
  alert("Your Item is added to the cart");
  localStorage["buyitem"] = JSON.stringify(buys);
}

function addcart(id) {
  let cart = JSON.parse(localStorage["cart"]);
  cart.push(id);
  alert("Your Item is added to the cart");
  localStorage["cart"] = JSON.stringify(cart);
}
getItems();
