let like_list = [];
let cont = [];
let buy_container = [];
//if (localStorage.length == 0) [localStorage.setItem("likedItem", "[]")];
//if (localStorage.length == 0) [localStorage.setItem("cart", "[]")];
if (localStorage.length == 0) {
  localStorage.setItem("likedItem", "[]");
  localStorage.setItem("cart", "[]");
  localStorage.setItem("buyitem", "[]");
}

async function items() {
  let resp = await fetch("https://dummyjson.com/products");
  data = await resp.json();
  console.log(data);
  Showdata(data);
}

function Showdata(data) {
  main.innerHTML = "";
  let liked = JSON.parse(localStorage["likedItem"]);
  console.log(liked);
  for (i = 0; i < data.products.length; i++) {
    let cards = document.createElement("div");
    cards.classList.add("box"); //class
    cards.innerHTML = `
          <img src="${data.products[i].images[0]}" id="images" class="w-100">
          <p id="item_name">${data.products[i].title}</p>
          <p id="price">$ ${data.products[i].price}</p>
          <div class="btns">
          <button class="buy" onclick="buyss(${data.products[i].id})">Buy</button>
          <button class="cart"  onclick="cartitem(${data.products[i].id})" >Add to Cart</button>
          <div>   `;

    if (liked.includes(data.products[i].id)) {
      cards.innerHTML += `
      <div class="btnlike">
                  <i class="fa-solid fa-heart like" onclick="likeItems(event,${data.products[i].id})" style="color:red"></i>
              </div>
                `;
    } else {
      cards.innerHTML += `
        <div class="btnlike">
                <i class="fa-regular fa-heart like"onclick="likeItems(event,${data.products[i].id})"></i>

        </div>`;
    }

    main.appendChild(cards);
  }
}

function likeItems(event, id) {
  if (event.target.classList.contains("fa-regular")) {
    let likedItem = JSON.parse(localStorage["likedItem"]); // JSON.parse() converts string to array
    event.target.style.color = "red";
    event.target.classList.replace("fa-regular", "fa-solid");
    likedItem.push(id);
    console.log(likedItem);
    localStorage["likedItem"] = JSON.stringify(likedItem);
  } else {
    let likedItem = JSON.parse(localStorage["likedItem"]); // JSON.parse() converts string to array
    event.target.style.color = "black";
    event.target.classList.replace("fa-solid", "fa-regular");
    console.log(id);
    likedItem.splice(likedItem.indexOf(id), 1);
    console.log(likedItem);
    localStorage["likedItem"] = JSON.stringify(likedItem);
  }
}

function cartitem(id) {
  let cart = JSON.parse(localStorage["cart"]);
  cart.push(id);
  alert("Your Item is added to the cart");
  localStorage["cart"] = JSON.stringify(cart);
}

function buyss(id) {
  let buys = JSON.parse(localStorage["buyitem"]);
  buys.push(id);
  alert("Thank You For Buying");
  localStorage["buyitem"] = JSON.stringify(buys);
}

items();

async function search_btn() {
  let query = document.querySelector("#se").value;
  let res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  let data = await res.json();
  Showdata(data);
}

search_btn();
