if (localStorage.length == 0) {
  localStorage.setItem("buyitem", "[]");
}
let cart = JSON.parse(localStorage.getItem("cart"));
let container = document.querySelector(".cont");
let buy_container = [];

async function getItems() {
  for (i = 0; i < cart.length; i++) {
    let res = await fetch(`https://dummyjson.com/products/${cart[i]}`);
    data = await res.json();
    console.log(res);
    Showdata(data);
  }
}
let total = 0;
function Showdata(data) {
  total += data.price;
  let cards = document.createElement("div");
  cards.classList.add("cartbox"); //class
  cards.innerHTML = `
  <img src="${data.images[0]}" id="imageslike">
  <div class ="itemdetails ">
  <p id="itemlike_name">${data.title}</p>
  <p id="pricelike">$ ${data.price}</p>
  <div class="descriptions">
  <p id="desc">${data.description}</p>
  <button class="buyitems" onclick="buycart(${data.id})">Buy</button>
  </div>
  </div>
  <button onclick="remove()" class="remove">X</button>
  
          `;


        

  
  container.appendChild(cards);
  document.getElementById("total").innerHTML = "Total Price : " + total;
}

function remove(id) {
  let cartItem = JSON.parse(localStorage["cart"]); // JSON.parse() converts string to array
  cartItem.splice(cartItem.indexOf(id), 1);
  localStorage["cart"] = JSON.stringify(cartItem);
  container.innerHTML = "";
  Showdata(data);
  location.reload();
}
function buycart(id) {
  let buys = JSON.parse(localStorage["buyitem"]);
  buys.push(id);
  alert("Thank you for buying");
  localStorage["buyitem"] = JSON.stringify(buys);
}




getItems();
